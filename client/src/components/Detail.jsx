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
import Footer from './Footer';

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
    <div id={"detail_div_total"}>
      <div id={"detail_div_interno1_navBar"}>
        <NavBar/>
      </div>
      <div id={"detail_div_interno2_total_card"}>
        <div id={"detail_div_interno2_card"}>
          <div id={"detail_div_interno2_card_name"}>
            <h1>{detail.name}</h1>
          </div>
          <div id={"detail_div_interno2_card_datosYbutton"}>
            <div id={"detail_div_interno2_card_datosYbutton_img"}>
              <div><img src={detail.img} alt={"imagen"} /></div>    
            </div>
            <div id={"detail_div_interno2_card_datosYbutton_content_temperamentsEinfo"}>
              <div id={"detail_div_interno2_card_datosYbutton_info"}>
                <div><p><b>Weight_min:</b> {detail.weight_min} kg</p></div>
                <div><p><b>Weight_max:</b> {detail.weight_max} kg</p></div>
                <div><p><b>Height_min:</b> {detail.height_min} cm</p></div>
                <div><p><b>Height_max:</b> {detail.height_max} cm</p></div>
                <div><p><b>Life_span:</b> {detail.life_span}</p></div>  
              </div>
              <div id={"detail_div_internao2_card_datosYbutton_temperaments"}>
                <p><b>Temperament:</b></p>
                <br />
                        {
                          detail.temperament?.map(cur=>{
                            return <p key={cur}>{cur}</p> 
                          })
                        }
              </div>
            </div>
            <div id={"detail_div_interno2_card_datosYbutton_button"}>
              <div id={"detail_div_interno2_card_datosYbutton_button_delete"}>
                  {
                    isNaN(id) &&
                      <button id={"delete_detail"} className={"button_oscuro"} onClick={(e)=>{handleDelete(e)}}>Delete 🗑</button>
                  }
              </div>
              <div id={"detail_div_interno2_card_datosYbutton_button_backHome"}>
                <Link to={"/home"}> <button className={"button_oscuro"}>Back to Home</button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id={"detail_div_interno_3_footer"}>
       <Footer/>
      </div>
    </div>
  )
}
