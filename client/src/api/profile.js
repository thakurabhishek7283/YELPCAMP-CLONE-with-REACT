import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).data.token
    }`;
  }

  return req;
});

export const createCampground = (newCampground) =>
  API.post(`/campground/new`, newCampground);
export const updateCampground = (campId, campground) =>
  API.patch(`/campground/${campId}`, campground);
