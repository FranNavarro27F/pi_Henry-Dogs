import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { cleanDetail, getDetail } from "../redux/actions";
import Loader from './Loader';
import NavBar from './NavBar'

export default function Detail() {
  let dispatch=useDispatch();
  let {id}=useParams();
  useEffect(()=>{
    dispatch(getDetail(id));
    return function(){
      dispatch(cleanDetail())
    }
  },[dispatch, id]);
  let detail= useSelector((state)=> state.detail);

  return !detail.img?<Loader/>:(
    <div>
      <NavBar/>
      <div>
        <div><img src={detail.img} alt={"imagen"} /></div>
        <div><h3>Name: {detail.name}</h3></div>
        <div><h3>Weight_min: {detail.weight_min} kg</h3></div>
        <div><h3>Weight_max: {detail.weight_max} kg</h3></div>
        <div><h3>Height_min: {detail.height_min} cm</h3></div>
        <div><h3>Height_max: {detail.height_max} cm</h3></div>
        <div><h3>Life_span: {detail.life_span}</h3></div>
        {/* <div><h2>Temperament: {detail.temperament}</h2></div> */}
        <div>
          <h2>Temperament: </h2>
          <ul>
            {
              detail.temperament?.map(cur=>{
                return <li>{cur}</li>
              })
            }
          </ul>
        </div>
      </div>
    </div>
  )
}
