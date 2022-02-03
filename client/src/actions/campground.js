import * as api from "../api/index";
import {
  START_LOADING,
  END_LOADING,
  CREATE_CAMP,
  FETCH_CAMP,
  FETCH_CAMPS,
  UPDATE_CAMP,
  DELETE_CAMP,
} from "../constants/constants";

export const createCampground = (formData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createCampground(formData);
    const { campId } = data;
    dispatch({ type: CREATE_CAMP, payload: data });
    dispatch({ type: END_LOADING });
    navigate(`/campground/${campId}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateCampground = (formData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.updateCampground(formData);
    const { campId } = data;
    dispatch({ type: UPDATE_CAMP, payload: data });
    dispatch({ type: END_LOADING });
    navigate(`/campground/${campId}`);
  } catch (error) {
    console.log(error);
  }
};

export const deleteCampground = (campId, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    await api.deleteCampground(campId);
    dispatch({ type: DELETE_CAMP, campId });
    dispatch({ type: END_LOADING });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const fetchCampgrounds = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchCampgrounds(page);
    dispatch({ type: FETCH_CAMPS, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const fetchCampground = (campId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchCampground(campId);
    dispatch({ type: FETCH_CAMP, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
