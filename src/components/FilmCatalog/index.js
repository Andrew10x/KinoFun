import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './styles.scss';

export default function FilmCatalog({hitFilms, name, selGen}) {
    const [films, setFilms] = React.useState(null);
    
    console.log(name)
    /*React.useEffect(() => {
        axios
          .get('http://localhost:4000/hitFilms')
          .then(({data}) => setFilms(data))
    }, [])*/
    React.useEffect(() => {
        console.log(hitFilms)
        if(hitFilms) {
            axios.get('http://localhost:4000/hitFilms')
        .then(({data}) => setFilms(data))
        }
        else if(name)
            axios.get(`http://localhost:4000/filmsByName?name=${name}`)
            .then(({data}) => setFilms(data))
        else if(selGen)
        axios.post(`http://localhost:4000/filmsByGenres`, selGen)
        .then(({data}) => setFilms(data))
    }, [name, hitFilms, selGen])

    console.log(selGen)
    return (
        <div className='container'>
            {
              films &&  films.map(film => {
                  return(
                    <div className="film">
                    <Link to={`film#${film.filmid}`}>
                        <img src={process.env.PUBLIC_URL + '/Posters/' + film.posterurl} alt="imag"/>
                        <p>{film.filmname}</p>
                    </Link>
                    </div>
                  )
              }
            )}
        </div>
    )
}
