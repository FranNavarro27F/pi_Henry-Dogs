import React from 'react'
import { useDispatch } from 'react-redux'
import {  orderByName, orderByWeight, setCurPage } from '../redux/actions';
import "./css/Orders.css";


export default function Orders({setRefresh}) {
  let dispatch= useDispatch();
  
  function handleChange(e){
    dispatch(orderByName(e.target.value));
    dispatch(setCurPage(1));
    setRefresh(e.target.value);
  };
  function handleChangeW(e){
    dispatch(orderByWeight(e.target.value));
    dispatch(setCurPage(1));
    setRefresh(e.target.value);
  };
 
  return (
    <div id={"orders2"}>
      <div>
        <label>{"Order by weight:"}</label>
        <select onChange={(e)=>{handleChangeW(e)}}>
          <option value={"default"}>Default</option>
          <option value={"min_weight"}>Minimum Weight</option>
          <option value={"max_weight"}>maximum weight</option>
        </select>
      </div>
      <br/>
      <div>
        <label>Order by Name:</label>
        <select onChange={(e)=>{handleChange(e)}}>
          <option value={"default"}>Default</option>
          <option value={"a-z"}>Ascendent</option>
          <option value={"z-a"}>Descendent</option>
        </select> 
      </div>
    </div>
  )
}
