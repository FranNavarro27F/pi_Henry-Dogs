import "./css/Home.css";
import React, { useState } from 'react';
import NavBar from "./NavBar.jsx";
import Orders from './Orders.jsx';
import Filters from "./Filters.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDogs, refreshDogs, setCurPage } from '../redux/actions.js';
import { Link } from 'react-router-dom';
import Card from "./Card.jsx";
import Paginado from "./Paginado.jsx";
import Loader from "./Loader";
import Footer from "./Footer";
import refresh_img from "./img/refresh4.png";



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

  function handleRefresh(e){
    dispatch(refreshDogs())
  }

  return loader? <Loader/>:(
    <div id={"Home"}>
      <div><NavBar/></div>
      <div id={"optiondBar"}>
        <div id={"Orders"}><Orders setRefresh={setRefresh}/></div>
        <div id={"home_option_bar_refresh"}><button onClick={(e)=> handleRefresh(e)}> <img src={refresh_img}alt={"refresh_img"} /></button></div>
        <div id={"Filters"}><Filters/></div>
      </div>
      <div id="greed">
        { 
          currentDogs?.map(cur=> {
            
            return(
              <div  key={cur.id+Math.random()*2000}>

                <Link id="div_home_style_link" to={`/detail/${cur.id}`}>
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
      <div  id={"home_div_externo_paginado"}>
       <div id={"Paginado"}>
         <Paginado 
         dogsPerPage={dogsPerPage}
         allDogs={dogs.length}
         paginado={paginado}
         />
       </div>
      </div>
      <div id={"home_div_footer"}>
       <Footer />
      </div>
    </div>
  )
}
