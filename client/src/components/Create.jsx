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
  
  let [error, setError]=useState({});
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
    });
    inspector({
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

  function inspector(input){
    let error={};
    // name
    if(input.name?.length=== 0){
      error.name="the name cannot be empty";
    }else if(input.name?.length >= 25 || input.name.length <= 1){
      error.name="must contain more than 1 character and less than 25";
    }else if(!/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(input.name)){
      error.name="only lowercase letters, uppercase letters, includes accents but with spaces included";
    }//-------
    // weight_min
    if(input.weight_min < 0 || input.weight_min >= 60 ){
      error.weight_min="only positive numbers less than 60";
    }//-------
    if(input.weight_max <= 1 || input.weight_max >= 96){
      error.weight_max="only positive numbers greater than 1 and less than 96";
    }
    
    setError(error)
  }

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
        <input placeholder={"ej: Dogo"} type="text" name={"name"} value={estado.name} 
        onChange={(e)=>{handleChange(e)}}
        />
        {/* <label>❌ ✅</label> */}
        <p>{error.name && error.name}</p>
        
       
      </div>
      <br/>
      <div>
        <label>weight_min: </label>
        <input placeholder={"ej: 5"} type={"number"} name={"weight_min"} value={estado.weight_min} 
        onChange={(e)=>{handleChange(e)}}
        />
        <i> kg</i>
        <p>{error.weight_min && error.weight_min}</p>
      </div>
      <br/>
      <div>
        <label>weight_max: </label>
        <input placeholder={"ej: 20"} type={"number"} name={"weight_max"} value={estado.weight_max} 
        onChange={(e)=>{handleChange(e)}}
        />
        <i> kg</i>
        <p>{error.weight_max}</p>
      </div>
      <br/>
      <div>
        <label>height_min: </label>
        <input placeholder={"ej: 38"} type={"number"} name={"height_min"} value={estado.height_min} 
        onChange={(e)=>{handleChange(e)}}
        />
        <i> cm</i>
      </div>
      <br/>
      <div>
        <label>height_max: </label>
        <input placeholder={"ej: 56"} type={"number"} name={"height_max"} value={estado.height_max} 
        onChange={(e)=>{handleChange(e)}}
        />
        <i> cm</i>
      </div>
      <br/>
      <div>
        <label>life_span: </label>
        <input placeholder={"ej: 10 - 12 years"} type="text" name={"life_span"} value={estado.life_span} 
        onChange={(e)=>{handleChange(e)}}
        />
        <i> years</i>
      </div>
      <br/>
      <div>
        <label>img: </label>
        <input placeholder={"ej: http://mi_imagen.jpg"} type="text" name={"img"} value={estado.img} 
        onChange={(e)=>{handleChange(e)}}
        />
        <i> url</i>
      </div>
      <br/>
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
