import * as api from "../api/index";
import {
  START_LOADING,
  END_LOADING,
  POST_REVIEW,
  UPDATE_REVIEW,
  DELETE_REVIEW,
} from "../constants/constants";

export const postReview = (campId, review, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createReview(campId, review);
    dispatch({ type: POST_REVIEW, payload: data });
    dispatch({ type: END_LOADING });
    navigate(`/campground/${campId}/`);
  } catch (error) {
    console.log(error);
  }
};

export const updateReview =
  (campId, reviewId, review, navigate) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.updateReview(campId, reviewId, review);
      dispatch({ type: UPDATE_REVIEW, payload: data });
      dispatch({ type: END_LOADING });
      navigate(`/campground/${campId}/`);
    } catch (error) {
      console.log(error);
    }
  };

export const deleteReview =
  (campId, reviewId, navigate) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.deleteReview(campId, reviewId);
      dispatch({ type: DELETE_REVIEW, payload: reviewId });
      navigate(`/campground/${campId}`);
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
  };
