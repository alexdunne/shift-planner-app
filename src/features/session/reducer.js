import { createReducer } from "utils/reducerUtils";
import { SIGNING_IN, SIGNED_IN_ANONYMOUSLY, SIGNED_OUT } from "./constants";

const initialState = {
  isSigningIn: false,
  signingInError: null,
  user: null
};

const signingIn = (state, { payload, error }) => {
  if (error) {
    return {
      ...state,
      isSigningIn: false,
      signingInError: payload.message,
      user: null
    };
  }

  return {
    ...state,
    isSigningIn: payload,
    signingInError: null,
    user: null
  };
};

const signInAnonymously = state => ({
  ...state,
  isSigningIn: false,
  user: {
    isAnonymous: true
  }
});

const signedOut = state => ({
  ...state,
  isSigningIn: false,
  user: null
});

export default createReducer(initialState, {
  [SIGNING_IN]: signingIn,
  [SIGNED_IN_ANONYMOUSLY]: signInAnonymously,
  [SIGNED_OUT]: signedOut
});
