import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import NavBar from './NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { createDog, getTemperaments } from '../redux/actions';

export default function Create() {

  let dispatch= useDispatch();
  let temperaments=useSelector((state)=> state.temperaments)

  useEffect(()=>{
    dispatch(getTemperaments());
  },[dispatch])

  let [estado, setEstado]=useState({
    name:"",
    weight_min:"",
    weight_max:"",
    height_min:"",
    height_max:"",
    life_span:"",
    img:"",
    temperament:[]
  });

  function handleChange(e){
    setEstado({
        ...estado,
        [e.target.name]: e.target.value
    })
  };

  function handleSelect(e){
    setEstado({
        ...estado,
        temperament: [...estado.temperament, e.target.value]
    })
  };

  function handleSubmit(e){
    e.preventDefault();
    dispatch(createDog(estado));
    setEstado({
      name:"",
    weight_min:"",
    weight_max:"",
    height_min:"",
    height_max:"",
    life_span:"",
    img:"",
    temperament:[]
    });
  }



  return (
    <div>
      <div><NavBar /></div>
    <br/>
    <br/>

    <form  onSubmit={(e)=>{handleSubmit(e)}}>

      <div>
        <label>name: </label>
        <input type="text" name={"name"} value={estado.name} 
        onChange={(e)=>{handleChange(e)}}
        />
      </div>
      <div>
        <label>weight_min: </label>
        <input type={"number"} name={"weight_min"} value={estado.weight_min} 
        onChange={(e)=>{handleChange(e)}}
        />
      </div>
      <div>
        <label>weight_max: </label>
        <input type={"number"} name={"weight_max"} value={estado.weight_max} 
        onChange={(e)=>{handleChange(e)}}
        />
      </div>
      <div>
        <label>height_min: </label>
        <input type={"number"} name={"height_min"} value={estado.height_min} 
        onChange={(e)=>{handleChange(e)}}
        />
      </div>
      <div>
        <label>height_max: </label>
        <input type={"number"} name={"height_max"} value={estado.height_max} 
        onChange={(e)=>{handleChange(e)}}
        />
      </div>
      <div>
        <label>life_span: </label>
        <input type="text" name={"life_span"} value={estado.life_span} 
        onChange={(e)=>{handleChange(e)}}
        />
      </div>
      <div>
        <label>img: </label>
        <input type="text" name={"img"} value={estado.img} 
        onChange={(e)=>{handleChange(e)}}
        />
      </div>
        <label>Temperament: </label>
      <select onChange={(e)=>{handleSelect(e)}} >
        {
          temperaments?.map(cur=>{
            return (
              <option key={cur.id} value={cur.id}>{cur.name}</option>
            )
          })
        }
      
      </select>
      <div>
      <br/>
        <input type={"submit"} value={"Create!"}/>
      </div>
    </form>

    </div>
  )
}
