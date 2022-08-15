import React from 'react';
import { Link } from 'react-router-dom';
import "./css/Landing.css";


export default function Landing() {
  return (
    <div className="landing">
        <div>
        
            <Link to={"/home"}>
                <button>Start!</button>
            </Link>
        </div>
    </div>
  )
}
