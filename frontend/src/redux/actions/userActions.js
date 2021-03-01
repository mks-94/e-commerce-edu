import { GET_USER } from "../types";
import API from "../../util/API";
import { setAlert } from "./alertActions";

const options = { headers: { "Content-Type": "application/json" } };

export const signupAction = (email, password) => async (dispatch) => {
  const body = { email, password };
  const url = "/auth/signup";

  try {
    const res = await API.post(url, body, options);
    dispatch({ type: GET_USER, payload: res.data.user });
    console.log(res);
  } catch (err) {
    dispatch(setAlert(err.response.data.message));
  }
};

export const loginAction = (email, password) => async (dispatch) => {
  const body = { email, password };
  const url = "/auth/login";

  try {
    const res = await API.post(url, body, options);
    dispatch({ type: GET_USER, payload: res.data.user });
    console.log(res);
  } catch (err) {
    dispatch(setAlert(err.response.data.message));
  }
};
