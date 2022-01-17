import React from 'react';
import {Link} from "react-router-dom";
import './styles.scss';

export default function Header() {
    return (
      <header>
            <div className="title"><Link to="/">KinoFun</Link></div>
            <div className="menu">
            <div><Link to="/genres">Жанри</Link></div>
                <div><Link to="/findActor">Актори</Link></div>
                <div><Link to="/findFilm">Знайти фільм</Link></div>
                {
                  localStorage.token &&
                  <div><Link to="/admin">Адміністрування</Link></div>  
                }
            </div>
        </header>
          );
        }
      