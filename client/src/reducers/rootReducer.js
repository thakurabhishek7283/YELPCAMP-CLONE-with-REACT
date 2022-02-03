import { combineReducers } from "redux";
import campground from "./campground";
import review from "./review";
import user from "./user";

export const rootReducer = combineReducers({ campground, review, user });
