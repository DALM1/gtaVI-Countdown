import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import backgroundImage from "./assets/Jason_and_Lucia_Robbery_landscape.09c8a~do21h4p.avif";
import "./App.css";

function App() {
  return (
    <div
      className="App"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
