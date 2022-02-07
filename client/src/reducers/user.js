import { AUTH, LOGOUT } from "../constants/constants";

export default (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify(action.payload)); // action.payload : object { token : token}
      return { ...state, authData: action.payload };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return { ...state };
  }
};
