import React from 'react';
import axios from 'axios';
import './styles.scss';
import FilmCatalog from '../../components/FilmCatalog';

export default function Genres() {

    const [genres, setGenres] = React.useState(null);
    const [selGen, setSelGen] = React.useState([]);
    
    function findFilmByGenres(form) {
        const sl = [];
        for(let i=0; i<genres.length; i++) {
            if(document.getElementById(`genre${genres[i].genreid}`).checked) {
             
                sl.push(genres[i].genreid)
            }
        }
        setSelGen(sl);
    }

    React.useEffect(() => {
        axios.get(`http://localhost:4000/genres`)
        .then(({data}) => setGenres(data))
    }, [])
    

    return (
        <div className="genres">
            <form id="genre-form" onSubmit={(e)=> e.preventDefault()}>
            <p className="title"><b>Оберіть жанр:</b></p>
            <div>
                {genres && genres.map(genre => 
                <>
                    <input type="checkbox" name={genre.genreid} id={`genre${genre.genreid}`} />
                    <label htmlFor={`genre${genre.genreid}`}>{genre.genrename}</label> 
                </>
                )}
                <br />
                <button onClick={() => findFilmByGenres(document.getElementById('genre-form'))}>Знайти</button>
            </div>
            </form>
            <FilmCatalog selGen={selGen}/>
        </div>
    )
}
