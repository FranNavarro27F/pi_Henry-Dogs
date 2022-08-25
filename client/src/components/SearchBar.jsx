import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findName, setCurPage, visivility_searchBar } from '../redux/actions';
import "./css/SearchBar.css";

export default function SearchBar() {
  let dispatch=useDispatch();
  let [input, setInput]=useState("");
  let searchBar_visivility=useSelector(state=> state.searchBar_visivility);

  function handleCange(e){
    setInput(e.target.value)
  };
  function handleSubmit(e){
    e.preventDefault()
    dispatch(findName(input));
    dispatch(setCurPage(1));
  };

  return (
    <div>
      <div>
        <form  id={searchBar_visivility && "searchBar_visivility_style"}>
          
          <input type={"text"} placeholder={"Ej: akita..."} 
            onChange={(e)=>{handleCange(e)}}
          />
          <input className={"button_oscuro"} type={"submit"} value={" 🔎 "}
            onClick={(e)=>{handleSubmit(e)}}
          />
        </form>
      </div>
    </div>
  )
}
