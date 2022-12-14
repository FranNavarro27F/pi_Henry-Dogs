import React from 'react';
import "./css/Card.css";


export default function Card({img, id, name, weight_min, weight_max, temperament}) {
  let temp= temperament?.slice(0,9)
  
  return (
    <div id={"total_card"}>
      <div id={"the_card"}>

        <div id={"card_div_name"}>{name}</div>
        <div id={"im_temp"}>
          <div><img src={img} alt="image_breed" /></div>
          <div id={"temp"}>{temp?.map(cur=>{
           return <p key={cur}>{cur}</p>
          })}</div>
        </div>
       <div id={"div_weight"}>Wheight: {weight_min}-{weight_max} kg</div>
        
      </div> 
    </div>
  )
}