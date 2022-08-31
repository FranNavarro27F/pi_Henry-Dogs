import React from 'react';
import "./css/Loader.css";
import img from "./img/loading.gif";

export default function Loader() {
  return (
    <div className={"loader"}>
        <img src={img} alt="imagen" />
    </div>
  )
}
