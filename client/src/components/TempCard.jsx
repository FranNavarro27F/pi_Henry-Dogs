import React from 'react';
import "./css/TempCard.css";

export default function TempCard({temp, setEstado, id, estado, inspector}) {
    
    let idTemp=id;

   function handle_delete_temp(e){
        setEstado({
            ...estado,
            temperament:estado.temperament.filter(cur=> cur !== id)
        })
        inspector({
          ...estado,
          temperament:estado.temperament.filter(cur=> cur !== id)
        })
   }

  return (
    <div id={"tempCard"}>
       <div id={"but"}><button onClick={(e)=> handle_delete_temp(e)}>❌</button></div> 
        <div id={"text"}><span>{temp}</span></div>
    </div>
  )
}
