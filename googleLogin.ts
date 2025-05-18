import * as Google from "expo-auth-session/providers/google";
import { useEffect } from "react";
import { auth } from "./firebaseConfig";
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { config, databases } from "./lib/appwrite";


// Sync the Firebase user to Appwrite database
const createUserInAppwrite = async (user: any) => {
  try {
    await databases.createDocument(
      config.databaseId!,
      "users", // Ensure this collection exists in Appwrite
      user.uid, // Use Firebase UID as the document ID
      {
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
      }
    );
    console.log("User synced to Appwrite");
  } catch (error) {
    console.error("Appwrite sync failed", error);
  }
};

export function useGoogleAuth() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "YOUR_WEB_CLIENT_ID_HERE",
  });

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.idToken) {
      const idToken = response.authentication.idToken;
      const credential = GoogleAuthProvider.credential(idToken);

      signInWithCredential(auth, credential)
        .then((userCred) => {
          const user = userCred.user;
          console.log("Firebase User", user);
          createUserInAppwrite(user); // Sync user to Appwrite
        })
        .catch(console.error);
    }
  }, [response]);

  return { promptAsync };
}
