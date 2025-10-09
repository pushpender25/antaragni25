import {auth} from './config';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  deleteUser,
  signOut,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  linkWithPhoneNumber,
  User,
} from 'firebase/auth';
import { getSingleDoc } from './firestore';
import toast from "react-hot-toast"

declare global {
  interface Window {
    recaptchaVerifier?: import("firebase/auth").RecaptchaVerifier;
    confirmationResult?: import("firebase/auth").ConfirmationResult;
  }
}


auth.languageCode = 'en';

export const firebaseSignup = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    return userCredentials.user;
  } catch (error) {
    console.error('Error in signup:', error);
    return null;
  }
};

export const firebaseLogin = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password);
    return userCredentials.user;
  } catch (error) {
    console.error('Error in login:', error);
    return null;
  }
};

export const firebaseLogout = async (setUser: (user: { user: User; details: any } | null) => void): Promise<void> => {
  try {
    await signOut(auth);
    toast.success("Logged out successfully")
    setUser(null)
  } catch (error) {
    toast.error(`Error in logging out: ${error}`);
  }
};

export const firebaseGetUser = async (
  document: string,
  setUser: (user: { user: User; details: any } | null) => void,
  setLoading: (loading: boolean) => void
): Promise<void> => {
  try {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const details = await getSingleDoc(document, user.uid);
        setUser({ user, details: details ?? null });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  } catch (error) {
    console.error('Error in fetching user:', error);
    setLoading(false);
  }
};

export const firebaseDeleteUser = async (user: User): Promise<void> => {
  try {
    await deleteUser(user);
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

export const updateUser = async (displayName: string): Promise<boolean> => {
  try {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating user:', error);
    return false;
  }
};

export const firebaseGoogleSignIn = async (): Promise<User | null> => {
  try {
    const provider = new GoogleAuthProvider();
    const response = await signInWithPopup(auth, provider);
    toast.success("Logged in successfully!")
    return response.user;
  } catch (error) {
    toast.error(`Error in Google sign-in: ${error}`);
    return null;
  }
};

export const sendVerificationEmail = async (): Promise<void> => {
  try {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
    }
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
};

export const generateRecaptcha = (btnId: string): void => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, btnId, {
      size: 'invisible',
      callback: (response: any) => {},
    });
  }
};

export const firebaseSendOTP = async (
  btnId: string,
  phoneNumber: string
): Promise<void> => {
  try {
    generateRecaptcha(btnId);
    const appVerifier = window.recaptchaVerifier;
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    window.confirmationResult = confirmationResult;
  } catch (error) {
    console.error('Error sending OTP:', error);
  }
};

export const firebaseVerifyOTP = async (otp: string): Promise<User | null> => {
  try {
    const confirmationResult = window.confirmationResult;
    if (!confirmationResult) {
      throw new Error("OTP confirmation result not available. Did you send the OTP?");
    }
    const result = await confirmationResult.confirm(otp);
    return result.user;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return null;
  }
};

export const firebaseLinkPhone = async (
  phoneNumber: string,
  btnId: string
): Promise<boolean> => {
  try {
    generateRecaptcha(btnId);
    const appVerifier = window.recaptchaVerifier;
    const confirmationResult = await linkWithPhoneNumber(auth.currentUser!, phoneNumber, appVerifier);
    window.confirmationResult = confirmationResult;
    return true;
  } catch (error) {
    console.error('Error linking phone number:', error);
    return false;
  }
};
