import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        {/* <Route path="/" element={}/>
      <Route path="/" element={}/>
      <Route path="/" element={}/>
      <Route path="/" element={}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
