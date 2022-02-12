import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layouts/auth.layout";
import CampgroundLayout from "./layouts/campground.layout";
import CreateLayout from "./layouts/create.layout";
import HomeLayout from "./layouts/home.layout";

const user = JSON.parse(localStorage.getItem("profile"));
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route
          path="/auth"
          element={!user ? <AuthLayout /> : <Navigate replace to="/" />}
        />
        <Route path="/campground/new" element={<CreateLayout />} />
        <Route path="/campground/:campId" element={<CampgroundLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
