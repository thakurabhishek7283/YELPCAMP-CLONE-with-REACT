import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/auth.layout";
import CampgroundLayout from "./layouts/campground.layout";
import CreateLayout from "./layouts/create.layout";
import HomeLayout from "./layouts/home.layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/auth" element={<AuthLayout />} />
        <Route path="/campground/:id" element={<CampgroundLayout />} />
        <Route path="/campground/new" element={<CreateLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
