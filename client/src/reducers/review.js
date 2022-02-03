import {
  START_LOADING,
  END_LOADING,
  POST_REVIEW,
  UPDATE_REVIEW,
  DELETE_REVIEW,
} from "../constants/constants";

export default (state = { reviews: [], isLoading: true }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case POST_REVIEW:
      return { ...state, reviews: [...state.reviews, action.payload] };
    case UPDATE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.map((review) =>
          review._id === action.payload._id ? action.payload : review
        ),
      };
    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter(
          (review) => review._id !== action.payload
        ),
      };
  }
};
