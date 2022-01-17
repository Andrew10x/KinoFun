import React from 'react';
import './styles.scss';

import Search from '../../assets/search.png';

export default function QueryForm({setName, pl}) {
    
    if(!pl) {
        pl = "Шукати тут..."
    }
    function sendQuery(form) {
        setName(form.query.value);
        document.getElementById("query").value= '';
    }

    return (
        <div className="search-form-container">
            <form id="search-form" onSubmit={(e)=> e.preventDefault()}>
                <input  id="query" name="query" type="text" placeholder={pl}  autoComplete="off"/>
                <button type="submit" onClick={() => sendQuery(document.getElementById('search-form'))}><img className="search" alt="search" src={Search}></img></button>
            </form>
        </div>
    )
}
