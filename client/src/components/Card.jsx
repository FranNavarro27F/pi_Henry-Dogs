import React from 'react';
import "./css/Card.css";


export default function Card({img, id, name, weight_min, weight_max, temperament}) {
  let temp= temperament?.slice(0,3)
  
//   return (
//     <div className={"card"}>
//       <div >
//         <div><img src={img} alt="imagen de carta" /></div>
//         <div id={"datos"}>
//           <ul>
//             <li>name: {name}</li>
//             <li>minimum weight: {weight_min} kg</li>
//             <li>maximum weight: {weight_max} kg</li>
//             <li>temperament: </li>
//           </ul>  
//           <ol>
//             {
//               temp?.map((cur, index)=> {
//                return(
//                  <li key={id+index}>{cur}</li>
//                )
//              })
//             }
//           </ol>
//         </div>
//       </div>
//     </div>
//   )
// }
 let temp1= temperament?.map((cur,index)=> {
  if(index < 8){
    return cur;
  }
 })

 
  return (
    <div id={"total_card"}>
      <div id={"the_card"}>

        <div>{name}</div>
        <div id={"im_temp"}>
          <div><img src={img} alt="image_breed" /></div>
          <div id={"temp"}>{temp1?.map(cur=>{
           return <p key={cur}>{cur}</p>
          })}</div>
        </div>
       <div id={"div_weight"}>Wheight: {weight_min}-{weight_max} kg</div>
        
      </div>
    </div>
  )
}