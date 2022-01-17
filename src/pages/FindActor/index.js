import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import QueryForm from '../../components/QueryForm';

import './styles.scss';

export default function FindActor() {
    const [name, setName] = React.useState(null);
    const [actors, setActors] = React.useState(null);

    React.useEffect(() => {
            axios.get(`http://localhost:4000/actorsByName?name=${name}`)
            .then(({data}) => setActors(data))
    }, [name])
 
    
    return (
        <div className="find-actor">
            <QueryForm setName={setName} />
            <ul>
                {actors && actors.map(actor => 
                   <li><Link to={`/actor#${actor.actorid}`}>{actor.actorname}</Link></li> 
                    )}
            </ul>
        </div>
    )
}
