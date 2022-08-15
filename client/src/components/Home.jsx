import "./css/Home.css";
import React from 'react';
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


export default function Home() {
  let dispatch= useDispatch();
  let dogs=useSelector(state=> state.dogs);
  let curPage=useSelector(state=> state.curPage)

  const dogsPerPage= 8;
  const indexOfLastDog= curPage * dogsPerPage;
  const indexOfFirstDog= indexOfLastDog - dogsPerPage;
  const currentDogs= dogs.slice(indexOfFirstDog, indexOfLastDog);
  const paginado=(numPage)=>{
    dispatch(setCurPage(numPage))
  };

  useEffect(()=>{
    dispatch(getDogs())
  },[dispatch]);



  return (
    <div>
      <div>
        <NavBar/>
      </div>
      <div>
        <SearchBar/>
      </div>
      <div>
        <Orders/>
      </div>
      <div>
        <Filters/>
      </div>
    <br/>
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
      <div>
        <Paginado 
        dogsPerPage={dogsPerPage}
        allDogs={dogs.length}
        paginado={paginado}
        />
      </div>


    </div>
  )
}
