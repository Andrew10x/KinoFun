import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './styles.scss';

export default function ActorPage() {
    const [actorObj, setActor] = React.useState(null);

    React.useEffect(() => {
        axios
          .get(`http://localhost:4000/actor/${Number(window.location.hash.split('#')[1])}`)
          .then(({data}) => setActor(data))
    }, [])
    return (
        <div>
            {actorObj && actorObj.map(actor => (<section id="actor-page">
            <img src={process.env.PUBLIC_URL + '/Actors/' + actor.photourl} alt="img" />
                <div className="text">
                <h2 className="title">{actor.actorname}</h2>
                <div className="description">
                    <p>{actor.actordescription}</p>
                </div>
                <br />
                <div>
                    <b className='title2'>Фільми</b>
                    <div>
                        {actor.film.map(ac => <Link to={`/film#${ac[0]}`}>{ac[1]}</Link>)}
                    </div>
                </div>
                </div>
                </section>))}
        </div>
    )
}
