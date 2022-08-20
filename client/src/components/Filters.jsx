import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { filtCreated, filtTemp, getTemperaments, setCurPage } from '../redux/actions';

export default function Filters() {
  let dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getTemperaments())
  },[dispatch])

  let Temp=useSelector((state)=> state.temperaments)

  function handleChange(e){
    dispatch(filtTemp(e.target.value))
    dispatch(setCurPage(1))
  };
  function handleChangeF(e){
    dispatch(filtCreated(e.target.value))
    dispatch(setCurPage(1))

  };


  return (
    <div>
      <div>
        <label>Filt Created or not:</label>
        <select onChange={(e)=>{handleChangeF(e)}}>
          <option value="default">Default</option>
          <option value="db">Created</option>
          <option value="api">Not</option>
        </select>
      </div>
      <br/>
      <div>
        <label >Filt by Temperament:</label>
        <select onChange={(e)=>{handleChange(e)}}>
          <option value="default">Default</option>
         {
            Temp?.map(cur=>{
              return(
                <option key={cur.id} value={cur.name}>{cur.name}</option>
              )
            })
          } 
        </select>
      </div>
    </div>
  )
}
