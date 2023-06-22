import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Teams from "./pages/Teams.page";
import Toss from "./pages/Toss.page";
import Play from "./pages/Play.page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Teams />} />
        <Route path="/toss" element={<Toss />} />
        <Route path="/play/:uuid" element={<Play />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
