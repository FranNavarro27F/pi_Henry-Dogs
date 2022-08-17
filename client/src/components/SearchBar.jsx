import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { findName, setCurPage } from '../redux/actions';

export default function SearchBar() {
  let dispatch=useDispatch();
  let [input, setInput]=useState("");

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
        <form >
          <label>Search a breed: </label>
          <input type={"text"} placeholder={"Ej: akita..."} 
            onChange={(e)=>{handleCange(e)}}
          />
          <input type={"submit"} value={" 🔎 "}
            onClick={(e)=>{handleSubmit(e)}}
          />
        </form>
      </div>
    </div>
  )
}
