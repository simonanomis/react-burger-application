import * as actionTypes from "./actionTypes";
import { error } from "autoprefixer/lib/utils";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const auth = (email, password, isSignUp) => {
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  };

  return (dispatch) => {
    dispatch(authStart());
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCGjYq1tN3AMg3ng47xz-bFzkbtOQymbqQ";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCGjYq1tN3AMg3ng47xz-bFzkbtOQymbqQ";
    }
    axios
      .post(url, authData)
      .then((response) => {
        console.log(response);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
      })
      .catch((error) => {
        console.log(error);
        dispatch(authFail(error.response.data.error));
      });
  };
};
