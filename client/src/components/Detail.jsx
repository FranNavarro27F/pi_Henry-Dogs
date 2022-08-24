import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { cleanDetail, deleteCard, getDetail, getDogs } from "../redux/actions";
import Loader from './Loader';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';
import "./css/Detail.css";

export default function Detail() {
  const navigate = useNavigate();
  let dispatch=useDispatch();
  let {id}=useParams();
  useEffect(()=>{
    dispatch(getDetail(id));
    return function(){
      dispatch(cleanDetail())
    }
  },[dispatch, id]);
  let detail= useSelector((state)=> state.detail);

  function handleDelete(e){
    dispatch(deleteCard(id));
    dispatch(getDogs());
    navigate("/home");
  }

  return !detail.img?<Loader/>:(
    <div id={"detail"}>
      <NavBar/>
      <div id={"div_ext_name"}><div id={"div_int_name"}><h1>{detail.name}</h1></div></div>
      <div id={"detail_sin_navBar"}>
        <div id={"img_y_datos"}>
          
          <div id={"img_div"}>
            <img src={detail.img} alt={"imagen"} />
          </div>
          <div id={"datos_y_temperament"}>
            <div id={"detail_datos"}>
              <div><p><b>Weight_min:</b> {detail.weight_min} kg</p></div>
              <div><p><b>Weight_max:</b> {detail.weight_max} kg</p></div>
              <div><p><b>Height_min:</b> {detail.height_min} cm</p></div>
              <div><p><b>Height_max:</b> {detail.height_max} cm</p></div>
              <div><p><b>Life_span:</b> {detail.life_span}</p></div>
            </div>
           
           <div id={"detail_temperament"}>
            <p><b>Temperament:</b></p>
              {
                detail.temperament?.map(cur=>{
                  return <p key={cur}>{cur}</p> 
                })
              }
            </div>
           <Link to={"/home"}> <button>Back to Home</button></Link>
          </div>
          {
            isNaN(id) &&
            <div id={"div_delete_detail"}>
              <button id={"delete_detail"} onClick={(e)=>{handleDelete(e)}}>Delete 🗑</button>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
