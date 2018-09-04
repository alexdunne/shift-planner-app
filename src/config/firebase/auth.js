import firebase from "./firebase";

export const ERRORS = {
  NETWORK_REQUEST_FAILED: "auth/network-request-failed"
};

export const signInWithGoogleAccountRedirect = () => {
  firebase.auth().useDeviceLanguage();
  firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
};
