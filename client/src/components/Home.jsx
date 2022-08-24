import "./css/Home.css";
import React, { useState } from 'react';
import NavBar from "./NavBar.jsx";
import SearchBar from "./SearchBar.jsx";
import Orders from './Orders.jsx';
import Filters from "./Filters.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDogs, setCurPage } from '../redux/actions.js';
import { Link } from 'react-router-dom';
import Card from "./Card.jsx";
import Paginado from "./Paginado.jsx";
import Loader from "./Loader";



export default function Home() {
  let dispatch= useDispatch();
  let dogs=useSelector(state=> state.dogs);
  let curPage=useSelector(state=> state.curPage);
  let [refresh, setRefresh]=useState("");

  let loader=useSelector(state=> state.loader);

  const dogsPerPage= 8;
  const indexOfLastDog= curPage * dogsPerPage;
  const indexOfFirstDog= indexOfLastDog - dogsPerPage;
  const currentDogs= dogs.slice(indexOfFirstDog, indexOfLastDog);
  const paginado=(numPage)=>{
    dispatch(setCurPage(numPage))
  };
  useEffect(()=>{
    if(!dogs.length){
      dispatch(getDogs());
    }
  },[dispatch, dogs]);

  
  return loader? <Loader/>:(
    <div id={"Home"}>
      <div><NavBar/></div>
      <div id={"optiondBar"}>
        <div id={"Orders"}><Orders setRefresh={setRefresh}/></div>
        <div id={"HsearchBar"}><SearchBar/></div>
        <div id={"Filters"}><Filters/></div>
      </div>
      <div id="greed">
        { 
          currentDogs?.map(cur=> {
            
            return(
              <div key={cur.id+Math.random()*2000}>
                <Link to={`/detail/${cur.id}`}>
                  <Card 
                    key={cur.id}
                    img={cur.img}
                    id={cur.id}
                    name={cur.name}
                    weight_min={cur.weight_min}
                    weight_max={cur.weight_max}
                    temperament={cur.temperament}
                  />
                </Link>
              </div>
            )
          })
          
        }
      </div>
      <div id={"Paginado"}>
        <Paginado 
        dogsPerPage={dogsPerPage}
        allDogs={dogs.length}
        paginado={paginado}
        />
      </div>
    </div>
  )
}
