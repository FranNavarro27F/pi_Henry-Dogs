import React from 'react';
import { Link } from 'react-router-dom';
import "./css/Landing.css";


export default function Landing() {
  return (
    <div id={"landing_div_externo"}>
        <div id={"landing_div_interno"}>
         
          <div id={"landing_div_text"}>
            <div id={"landing_div_title"}>
              <h1><i>The dogs app</i></h1>
            </div>
            <div id={"landing_div_externo_parrafo"}>
              <div id={"landing_div_parrafo"}>
                <span>
                  Check out some dog breeds, learn about fun facts, and even create your own dog!
                </span>
              </div>
            </div>
          </div>
          <div id={"landing_div_button"}>
            <Link to={"/home"}>
                <button className={"button_oscuro"}>🦴 START !🦴</button>
            </Link>
          </div>
        </div>
    </div>
  )
}
