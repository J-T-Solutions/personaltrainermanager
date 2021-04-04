import app from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

class Firebase {
  public auth: app.auth.Auth;

  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
  }

  // *** Auth ***
  public doCreateUserWithEmailAndPassword = (
    email: string,
    password: string
  ): Promise<app.auth.UserCredential> =>
    this.auth.createUserWithEmailAndPassword(email, password);

  public doSignInWithEmailAndPassword = (
    email: string,
    password: string
  ): Promise<app.auth.UserCredential> =>
    this.auth.signInWithEmailAndPassword(email, password);

  public doSignOut = (): Promise<void> => this.auth.signOut();

  public doPasswordReset = (email: string): Promise<void> =>
    this.auth.sendPasswordResetEmail(email);

  public doPasswordUpdate = (password: string): Promise<void> | undefined => {
    if (this.auth.currentUser) {
      return this.auth.currentUser.updatePassword(password);
    }
  };
}

export default Firebase;
