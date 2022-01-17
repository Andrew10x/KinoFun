import {useEffect, useState} from 'react';
import axios from 'axios';
import QueryForm from '../../components/QueryForm';
import AddActorForm from '../../admin/AddActorForm';
import './styles.scss';


export default function AddFilm() {

    const [countries, setCountries] = useState(null);
    const [actors, setActors] = useState(null);
    const [genres, setGenres] = useState(null);
    const [isVisAddActor, setVisAddActor] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:4000/countries')
        .then(({data}) => setCountries(data))

        axios.get('http://localhost:4000/genres')
        .then(({data}) => setGenres(data))
    }, [])

    function findActor(actorName) {
        axios.get(`http://localhost:4000/actorsByName?name=${actorName}`)
            .then(({data}) => setActors(data))
    }

    function sendForm(form){
        const obj = {
            filmname: form.filmname.value,
            duration: form.duration.value,
            year: form.year.value,
            countryname: form.select.value,
            genresid: [],
            ishit: form.isHit.value,
            videourl: form.videourl.value,
            posterurl: form.posterurl.value,
            actorsid: [],
            description: form.description.value
        }
        for(let i=0; i<genres.length; i++) {
            if(document.getElementById(`genre${genres[i].genreid}`).checked) {
             
                obj.genresid.push(genres[i].genreid)
            }
        }
        if(form.actor1.value !== '')
            obj.actorsid.push(form.actor1.value);
        if(form.actor2.value !== '')
            obj.actorsid.push(form.actor2.value)
        if(form.actor3.value !== '')
            obj.actorsid.push(form.actor3.value)
        if(form.actor4.value !== '')
            obj.actorsid.push(form.actor4.value)
        console.log(obj)
        console.log(form.actor1.value === '')

        axios.post(`http://localhost:4000/addFilm`, obj);
    }

    return (
        <div className='act-cont'>
        <form id="film-form" className="film-form" onSubmit={(e)=> e.preventDefault()}>
            <div className="item">
                <label>Назва фільму</label>
                <input type="text" className='film-input' name="filmname"></input>
            </div>
            <div className="item">
                <label>Тривалість</label>
                <input type="text" name="duration"></input>
            </div>
            <div className="item">
                <label>Рік</label>
                <input type="number" min="1950" max="2022" name="year"></input>
            </div>
                <div className="item">
                    <label>Країна</label>
                    <select id="s" name="select" >
                    { countries && countries.map(country =>
                        <option index= {5} value={country.id}>{country.countryname}</option>
                    )}
                    </select>
                </div>
            <div className='item'>
                <div>Жанр:</div>
                {genres && genres.map(genre => 
                  <>
                    <input  className="check-input" type="checkbox" name={genre.genreid} id={`genre${genre.genreid}`} />
                    <label className="check-label" htmlFor={`genre${genre.genreid}`}>{genre.genrename}</label> 
                  </>  
                )}
            </div>
            <div className="item">
                <label>Є хітом</label>
                <input type="number" min="0" max="1" name="isHit"></input>
            </div>
            <div className="item">
                <label>videourl</label>
                <input type="text" name="videourl"></input>
            </div>
            <div className="item">
                    <label>PosterUrl</label>
                    <input className='poster-url' type="text" name="posterurl"></input>
                </div>
            <div>
                <div className="item">
                    <label>Актор 1</label>
                    <input type="text" name="actor1"></input>
                </div>
                <div className="item">
                    <label>Актор 2</label>
                    <input type="text" name="actor2"></input>
                </div>
                <div className="item">
                    <label>Актор 3</label>
                    <input type="text" name="actor3"></input>
                </div>
                <div className="item">
                    <label>Актор 4</label>
                    <input type="text" name="actor4"></input>
                </div>
            </div>
            <div className="item">
                <div>Опис фільму:</div>
                <textarea name="description"></textarea>
            </div>
            <div><button className='add-film-button' onClick={() => sendForm(document.getElementById('film-form'))}>Додати фільм</button></div>
        </form>
        <div className="extra">
        <div className="find-actor">
            <QueryForm setName={findActor} pl={'Пошук актора...'}/>
            <ul>
                {actors && actors.map(actor => 
                <div className='act-inf'>
                    <div className="act-name">{actor.actorname}</div>
                    <div>Id: {actor.actorid}</div>
                </div>

                    )}
            </ul>
        </div>
        <button className="add-actor" onClick={() => setVisAddActor(!isVisAddActor)}>Додати актора</button>
        <AddActorForm isVisibleForm={isVisAddActor} setVisibility={() => {setVisAddActor(!isVisAddActor)}}/>
        </div>
        </div>
    )
}
