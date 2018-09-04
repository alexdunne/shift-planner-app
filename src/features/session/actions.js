import { auth, firebase } from "config/firebase";
import { SIGNING_IN, SIGNED_IN_ANONYMOUSLY, SIGNED_OUT } from "./constants";

export const signingIn = isSigningIn => ({
  type: SIGNING_IN,
  payload: isSigningIn
});

export const signingInError = error => ({
  type: SIGNING_IN,
  payload: error,
  error: true
});

export const signedInAnonymously = () => ({
  type: SIGNED_IN_ANONYMOUSLY
});

export const signedOut = () => ({
  type: SIGNED_OUT
});

export const signInAnonymously = () => dispatch => {
  dispatch(signingIn(true));

  firebase
    .auth()
    .signInAnonymously()
    .catch(err => {
      if (err.code === auth.ERRORS.NETWORK_REQUEST_FAILED) {
        dispatch(signingInError(new Error("Network error")));
      }
    });

  firebase.auth().onAuthStateChanged(user => {
    if (!user) {
      dispatch(signedOut());
      return;
    }

    if (user.isAnonymous) {
      dispatch(signedInAnonymously());
      return;
    }
  });
};
