import { combineReducers } from "redux";
import campground from "./campground";

import user from "./user";

export const rootReducer = combineReducers({ campground, user });
