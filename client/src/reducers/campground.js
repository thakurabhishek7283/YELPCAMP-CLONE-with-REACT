import {
  CREATE_CAMP,
  FETCH_CAMP,
  FETCH_CAMPS,
  UPDATE_CAMP,
  DELETE_CAMP,
  START_LOADING,
  END_LOADING,
} from "../constants/constants";

export default (state = { isLoading: true, campgrounds: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };

    case END_LOADING:
      return { ...state, isLoading: false };

    case CREATE_CAMP:
      return { ...state, campgrounds: [...state.campgrounds, action.payload] };

    case UPDATE_CAMP:
      return {
        ...state,
        campgrounds: state.campgrounds.map((camp) =>
          camp._id === action.payload._id ? action.payload : camp
        ),
      };

    case DELETE_CAMP:
      return {
        ...state,
        campgrounds: state.campgrounds.filter(
          (camp) => camp._id !== action.payload
        ),
      };

    case FETCH_CAMPS:
      return { ...state, campgrounds: action.payload };

    case FETCH_CAMP:
      return { ...state, campgrounds: [...state.campgrounds, action.payload] };
  }
};
