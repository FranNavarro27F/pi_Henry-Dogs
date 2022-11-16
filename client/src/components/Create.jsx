import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import NavBar from './NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { createDog, getDogs, getTemperaments, setCurPage, visivility_searchBar } from '../redux/actions';
import TempCard from './TempCard';
import "./css/Create.css";
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';


export default function Create() {
  const navigate = useNavigate();
  let dispatch= useDispatch();
  let temperaments=useSelector((state)=> state.temperaments)

  useEffect(()=>{
    dispatch(getTemperaments());
    dispatch(visivility_searchBar(true))
    return function (){
      dispatch(visivility_searchBar(false))
      dispatch(getDogs())
    }
  },[dispatch]);

  let [activ, setActiv]=useState(true);
  let [error, setError]=useState(null);
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
    if(!estado.temperament.includes(e.target.value)){
      setEstado({
          ...estado,
          temperament: [...estado.temperament, e.target.value]
      })
      inspector({
        ...estado,
        temperament: [...estado.temperament, e.target.value]
      })
    }else{
       alert("That temperament was already selected")
    }
  };

  function handleLife_span(e){
    setEstado({
      ...estado,
      life_span: e.target.value
    })
    inspector({
      ...estado,
      life_span: e.target.value
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
    if(input.weight_min <= 0 || input.weight_min >= 60){
      error.weight_min="only positive numbers less than 60";
    }//-------
    // weight_max
    if(input.weight_max <= 1 || input.weight_max >= 96){
      error.weight_max="only positive numbers greater than 1 and less than 96";
    }//-------
    // height_min
    if(input.height_min <= 0 || input.height_min > 65){
      error.height_min="only positive numbers greater than 0 and less than 65";
    }//-------
    //height_max
    if(input.height_max < 20 || input.height_max > 80){
      error.height_max="only positive numbers greater than 19 and less than 80";
    }//--------
    //life_span
    if(input.life_span?.length=== 0){
      error.life_span="life_span cannot be empty"; 
    }//--------
    //temperament
    if(input.temperament?.length=== 0){
      error.temperament="select at least one temperament";
    }
    if(input.temperament?.length >= 10){
      error.temperament="less than 10 temperaments";
    }
    setError(error)
    handleDisable(error)
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
      alert("breed of dog created!!!")
      dispatch(getDogs())
      navigate("/home");
      dispatch(setCurPage(1))
  };

 function handleDisable(err){
  if(
    err?.name===undefined &&
    err?.weight_min===undefined &&
    err?.weight_max===undefined &&
    err?.height_min===undefined &&
    err?.height_max===undefined &&
    err?.life_span===undefined &&
    err?.temperament===undefined
  ){
    setActiv(false);
  }else{
    setActiv(true);
  }
 };
//------------------------------------recordar, modificar estetica de formulario Create-------------------
  return (
    <div id={"all_create"}>
      <div ><NavBar /></div>
     <div id={"cont_form"}>
      <br/>
      <br/>
      <form onSubmit={(e)=>{handleSubmit(e)}}>
        <div>
          <label> <b> Name: </b> </label>
          <input placeholder={"ej: Dogo"} type="text" name={"name"} value={estado.name} 
          onChange={(e)=>{handleChange(e)}}
          />
          <p className="error_message">{error && error.name}</p>
        </div>
        <br/>
        <div>
          <label> <b> Weight_min: </b> </label>
          <input placeholder={"ej: 5"} type={"number"} name={"weight_min"} value={estado.weight_min} 
          onChange={(e)=>{handleChange(e)}}
          />
          <i> kg</i>
          <p className="error_message">{error && error.weight_min}</p>
        </div>
        <br/>
        <div>
          <label> <b> Weight_max: </b> </label>
          <input placeholder={"ej: 20"} type={"number"} name={"weight_max"} value={estado.weight_max} 
          onChange={(e)=>{handleChange(e)}}
          />
          <i> kg</i>
          <p className="error_message">{error && error.weight_max}</p>
        </div>
        <br/>
        <div>
          <label> <b> Height_min: </b> </label>
          <input placeholder={"ej: 38"} type={"number"} name={"height_min"} value={estado.height_min} 
          onChange={(e)=>{handleChange(e)}}
          />
          <i> cm</i>
          <p className="error_message">{error && error.height_min}</p>
        </div>
        <br/>
        <div>
          <label> <b> Height_max: </b> </label>
          <input placeholder={"ej: 56"} type={"number"} name={"height_max"} value={estado.height_max} 
          onChange={(e)=>{handleChange(e)}}
          />
          <i> cm</i>
          <p className="error_message">{error && error.height_max}</p>
        </div>
        <br/>
        <div>
          <label> <b> Life_span: </b> </label>
          <select onChange={(e)=>handleLife_span(e)}>
            <option disabled selected >select a Life span</option>
            <option value={"6 - 8"}>6 - 8</option>
            <option value={"8 - 10"}>8 - 10</option>
            <option value={"10 - 14"}>10 - 14</option>
            <option value={"14 - 18"}>14 - 18</option>
          </select>
          <i> years</i>
          <p className="error_message">{error && error.life_span}</p>
        </div> 
        <br/>
        <div>
          <label> <b> Img: </b> </label>
          <input 
            type="text"
            placeholder={"ej: http://mi_imagen.jpg"}  
            name={"img"} 
            value={estado.img} 
            onChange={(e)=>{handleChange(e)}}
          />
          <i> url </i>
        </div>
        <br/>
        <div>
            <label> <b> Temperament: </b> </label>
          <select onChange={(e)=>{handleSelect(e)}} >
            <option disabled selected>select some temperaments</option>
            {
              temperaments?.map(cur=>{
                return (
                  <option key={cur.id} value={cur.id}>{cur.name}</option>
                )
              })
            }
          </select>
          <div id={"container_temps_card"}>
          {
            estado.temperament?.map(curID=>{
              return <TempCard
                       key={curID}
                       temp={temperaments[curID-1].name}
                       idTemp={curID}
                       estado={estado}
                       setEstado={setEstado}
                       inspector={inspector}
                       />
            })
          }
            <p className="error_message">{error && error.temperament}</p>
          </div>
        </div>
        <div>
          <br/>
          <input id={"create_input_submite_form"} className={"button_oscuro"} disabled={activ && "disabled"} type={"submit"} value={"Create!"}/>
        </div>
      </form>
     </div>
     <div id={"create_div_footer_externo"}>
      <div id={"create_div_footer_interno"}>
      <Footer/>
      </div>
     </div>
    </div>
  )
}
