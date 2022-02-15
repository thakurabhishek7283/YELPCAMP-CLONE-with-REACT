import { AUTH, LOGOUT } from "../constants/constants";
import jwt_decode from "jwt-decode";

export default (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify(action.payload)); // action.payload : object { token : token}

      const token = action.payload?.token;
      const decodedToken = jwt_decode(token);
      return { ...state, authData: decodedToken };

    case "USER_REFRESH":
      const user = JSON.parse(localStorage.getItem("profile"));
      const decoded = jwt_decode(user.token);
      return { ...state, authData: decoded };

    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };

    default:
      return { ...state };
  }
};
