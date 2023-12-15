import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Landing, Home, Form, Detail } from "./Views/index";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
