import React from 'react';
import "./css/Card.css";


export default function Card({img, id, name, weight_min, weight_max, temperament}) {
  return (
    <div className={"card"}>
      <div >
        <div><img src={img} alt="imagen de carta" /></div>
        <div id={"datos"}>
          <ul>
            <li>name: {name}</li>
            <li>minimum weight: {weight_min}</li>
            <li>maximum weight: {weight_max}</li>
            <li>temperament: </li>
          </ul>  
          <ol>
            {
              temperament?.map((cur, index)=> {
               return(
                 <li key={id+index}>{cur}</li>
               )
             })
            }
          </ol>
        </div>
      </div>
    </div>
  )
}
 