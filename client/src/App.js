import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/auth.layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />} />
        {/* <Route path="/" element={}/>
      <Route path="/" element={}/>
      <Route path="/" element={}/>
      <Route path="/" element={}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
