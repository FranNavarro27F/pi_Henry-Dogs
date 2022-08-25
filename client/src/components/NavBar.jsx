import React from 'react'
import { Link } from 'react-router-dom';
import "./css/NavBar.css";
import SearchBar from './SearchBar';


export default function NavBar() {
  return (
    <div id={"nav"}>
      <div id={"NavBar_content_int"}>
        <div><Link to={"/home"}>🏠 Home</Link></div>
        <div><SearchBar/></div>
        <div><Link to={"/create"}>🐕‍🦺 Create</Link></div>
        {/* <Link to={"/about"}><li>📜 About</li></Link> */}
      </div>
      
        
      
    </div>
  )
}
