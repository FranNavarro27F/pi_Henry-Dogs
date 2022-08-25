import React from 'react';
import { useSelector } from 'react-redux';
import "./css/Paginado.css";


export default function Paginado({dogsPerPage, allDogs, paginado}) {
  const curPage=useSelector(state=> state.curPage);
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
                  <button  className={curPage === cur ?"paginado_selected" : "paginado_no_selected"} onClick={(e)=>{paginado(cur)}}>{cur}</button>
                </li>
             )
            })
          }
        </ul>
      </nav>

    </div>
  )
}
