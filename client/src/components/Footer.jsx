import React from 'react';
import "./css/Footer.css";

export default function Footer() {
  return (
    <div id={"footer_div_externo"}>
        <div id={"footer_div_interno"}>
            <div><span>Application created by : </span></div>
            <div><span><b><i>Francisco Navarro</i></b> <i>full stack web developer</i></span></div>
            <div><span>Contact me : </span></div>
            <div><a href="https://www.linkedin.com/in/fran-navarro-/">Linkedin</a></div>
            <div><a href="https://github.com/FranNavarro27F">GitHub</a></div>
        </div>
    </div>
  )
}
