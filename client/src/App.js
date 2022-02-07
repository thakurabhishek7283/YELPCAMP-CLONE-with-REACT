import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layouts/auth.layout";
import CampgroundLayout from "./layouts/campground.layout";
import CreateLayout from "./layouts/create.layout";
import HomeLayout from "./layouts/home.layout";

function App() {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route
          path="/auth"
          element={!user ? <AuthLayout /> : <Navigate replace to="/" />}
        />
        <Route
          path="/campground/new"
          element={user ? <CreateLayout /> : <AuthLayout />}
        />
        <Route path="/campground/:campId" element={<CampgroundLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
