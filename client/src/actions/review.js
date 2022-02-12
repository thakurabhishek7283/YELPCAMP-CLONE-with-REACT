import * as api from "../api/index";
import { START_LOADING, END_LOADING, FETCH_CAMP } from "../constants/constants";

export const postReview = (campId, review, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const reviewdata = await api.createReview(campId, review);
    console.log("created review");
    const { data } = await api.fetchCampground(campId);
    console.log("fetch success", data);
    dispatch({ type: FETCH_CAMP, payload: data });
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
      const updatereviewdata = await api.updateReview(campId, reviewId, review);
      const { data } = await api.fetchCampground(campId);
      dispatch({ type: FETCH_CAMP, payload: data });
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
      await api.deleteReview(campId, reviewId);
      const { data } = await api.fetchCampground(campId);
      dispatch({ type: FETCH_CAMP, payload: data });
      navigate(`/campground/${campId}`);
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
  };
