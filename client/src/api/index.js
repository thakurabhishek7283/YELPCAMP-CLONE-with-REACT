import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchCampground = (campId) => API.get(`/campground/${campId}`);

export const fetchCampgrounds = (page) => API.get(`/campground?page=${page}`);

export const deleteCampground = (campId) => API.delete(`/campground/${campId}`);

export const createReview = (campId, review) => {
  console.log("creating review");
  return API.post(`/campground/${campId}/review`, review);
};

export const deleteReview = (campId, reviewId) =>
  API.delete(`/campground/${campId}/review/${reviewId}`);

export const updateReview = (campId, reviewId, review) =>
  API.patch(`/campground/${campId}/review/${reviewId}`, review);

export const signIn = (formData) => API.post("/auth/signin", formData);
export const signUp = (formData) => API.post("/auth/signup", formData);
