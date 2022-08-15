import './components/css/App.css';
import React from 'react';
import {Routes, Route} from "react-router-dom";
import Landing from "./components/Landing.jsx";
import Home from "./components/Home.jsx";
import Detail from "./components/Detail.jsx";
import Create from "./components/Create.jsx";
import About from "./components/About.jsx";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path={"/"} element={<Landing/> }/>
        <Route path={"/home"} element={<Home/> } />
        <Route path={"/detail/:id"} element={<Detail/> } />
        <Route path={"/create"} element={<Create/> } />
        <Route path={"/about"} element={<About/> } />
      </Routes>
    </div>
  );
}

export default App;
