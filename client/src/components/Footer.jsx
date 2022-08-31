import React from 'react';
import "./css/Footer.css";
import img_git from"./img/icone-github.png";
import img_linkedin from "./img/logo-linkedin.png";

export default function Footer() {
  return (
    <div id={"footer_div_externo"}>
        <div id={"footer_div_interno"}>
            <div><span>Application created by : </span></div>
            <div><span><b><i>Francisco Navarro</i></b> <i>full stack web developer</i></span></div>
            <div id={"footer_div_contacts"}>
              <div>
                <span>Contact me : </span>
              </div>
              <div>
                  <a href="https://www.linkedin.com/in/fran-navarro-/">
                   <img id={"footer_img_linkedin"} src={img_linkedin} alt="img_linkedin" />
                  </a> 
              </div>
              <div>
                  <a href={"https://github.com/FranNavarro27F"}>
                    <img id={"footer_img_git"} src={img_git} alt="imagen_git" />
                  </a>
              </div>
            </div>
        </div>
    </div>
  )
}
