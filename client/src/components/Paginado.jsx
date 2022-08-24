import React from 'react';
import "./css/Paginado.css";


export default function Paginado({dogsPerPage, allDogs, paginado}) {
  const pageNumbers=[];
  for(let i=1; i <= Math.ceil(allDogs/dogsPerPage); i++){
    pageNumbers.push(i)
  }

  return (
    <div id={"paginado"}>
      <nav>
        <ul>
          {
            pageNumbers?.map(cur=>{
             return ( 
                <li key={cur}>
                  <button onClick={(e)=>{paginado(cur)}}>{cur}</button>
                </li>
             )
            })
          }
        </ul>
      </nav>

    </div>
  )
}
