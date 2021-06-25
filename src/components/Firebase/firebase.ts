/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}

class Firebase {
  public auth: app.auth.Auth
  public db: app.database.Database
  public googleProvider: app.auth.GoogleAuthProvider
  public facebookProvider: app.auth.FacebookAuthProvider
  public emailAuthProvider: any
  public actionCodeSettings: any

  constructor() {
    app.initializeApp(firebaseConfig)

    this.emailAuthProvider = app.auth.EmailAuthProvider
    this.auth = app.auth()
    this.db = app.database()
    this.actionCodeSettings = {
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    }

    this.googleProvider = new app.auth.GoogleAuthProvider()
    this.facebookProvider = new app.auth.FacebookAuthProvider()
  }

  // *** Auth ***
  public doCreateUserWithEmailAndPassword = (
    email: string,
    password: string,
  ): Promise<app.auth.UserCredential> =>
    this.auth.createUserWithEmailAndPassword(email, password)

  public doSignInWithEmailAndPassword = (
    email: string,
    password: string,
  ): Promise<app.auth.UserCredential> =>
    this.auth.signInWithEmailAndPassword(email, password)

  public doSignInWithGoogle = (): Promise<app.auth.UserCredential> =>
    this.auth.signInWithPopup(this.googleProvider)

  public doSignInWithFacebook = (): Promise<app.auth.UserCredential> =>
    this.auth.signInWithPopup(this.facebookProvider)

  public doSignOut = (): Promise<void> => this.auth.signOut()

  public doSendEmailVerification = () =>
    this.auth.currentUser!.sendEmailVerification(this.actionCodeSettings)

  public doPasswordReset = (email: string): Promise<void> =>
    this.auth.sendPasswordResetEmail(email)

  public doPasswordUpdate = (password: string): Promise<void> | undefined => {
    if (this.auth.currentUser) {
      return this.auth.currentUser.updatePassword(password)
    }
  }

  // *** Merge Auth and DB User API *** //
  public onAuthUserListener = (
    next: (authUser: app.User) => void,
    fallback?: () => void,
  ) =>
    this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // this.user(authUser.uid)
        //   .once('value')
        //   .then((snapshot) => {
        //     const dbUser = snapshot.val()
        //     // default empty roles
        //     if (!dbUser.roles) {
        //       dbUser.roles = {}
        //     }
        //     // merge auth and db user
        //     authUser = {
        //       uid: authUser?.uid,
        //       email: authUser?.email,
        //       emailVerified: authUser?.emailVerified,
        //       providerData: authUser?.providerData,
        //       ...dbUser,
        //     }
        //     next(authUser)
        //   })

        next(authUser)
      } else {
        fallback && fallback()
      }
    })

  // *** User API ***
  user = (uid: string | number) => this.db.ref(`users/${uid}`)
  users = () => this.db.ref('users')
  userUid = () => this.auth.currentUser
}

export const firebaseInstance = new Firebase()
export default Firebase
