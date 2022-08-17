import React from 'react'
import { Link } from 'react-router-dom';
import "./css/NavBar.css";


export default function NavBar() {
  return (
    <div id={"nav"}>
      <ul>
        <Link to={"/home"}><li>🏠 Home</li></Link>
        <Link to={"/create"}><li>🐕‍🦺 Create</li></Link>
        <Link to={"/about"}><li>📜 About</li></Link>
      </ul>
    </div>
  )
}
