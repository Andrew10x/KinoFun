import {useEffect, useState} from 'react';
import axios from 'axios';
import QueryForm from '../../../components/QueryForm';
import AddActorForm from '../../../admin/AddActorForm';


export default function EditFilm() {

    const [countries, setCountries] = useState(null);
    const [actors, setActors] = useState(null);
    const [genres, setGenres] = useState(null);
    const [isVisAddActor, setVisAddActor] = useState(false);
    const [filmObj, setFilm] = useState(null);
    const [ivName, setIvName] = useState('');
    const [ivDuration, setIvDuration] = useState('');   
    const [ivYear, setIvYear] = useState('');   
    const [ivIsHit, setIvIsHit] = useState('');
    const [ivVideoUrl, setIvVideoUrl]  = useState(''); 
    const [ivPosterUrl, setIvPosterUrl]  = useState(''); 
    const [ivDescr, setIvDescr] = useState('');
    const [ivActor1, setIvActor1] = useState('');
    const [ivActor2, setIvActor2] = useState('');
    const [ivActor3, setIvActor3] = useState('');
    const [ivActor4, setIvActor4] = useState('');

    useEffect(() => {
        axios
        .get(`http://localhost:4000/film/${Number(window.location.hash.split('#')[1])}`)
        .then(({data}) => {
            console.log(data[0])
            setFilm(data);
            setIvName(data[0].filmname);
            setIvDuration( data[0].duration);
            setIvYear(data[0].year);
            setIvIsHit(data[0].ishit);
            setIvVideoUrl(data[0].videourl);
            setIvPosterUrl(data[0].posterurl);
            setIvDescr(data[0].description);
            if(data[0].actorid.length)
            setIvActor1(data[0].actorid[0])
            if(data[0].actorid.length > 1)
            setIvActor2(data[0].actorid[1])
            if(data[0].actorid.length > 2)
            setIvActor3(data[0].actorid[2])
            if(data[0].actorid.length > 3)
            setIvActor4(data[0].actorid[3])

            document.getElementById('genre1').value = true;
        });


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
            filmid: Number(window.location.hash.split('#')[1]),
            filmname: form.filmname.value,
            duration: form.duration.value,
            year: Number(form.year.value),
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
            obj.actorsid.push(Number(form.actor1.value));
        if(form.actor2.value !== '')
            obj.actorsid.push(Number(form.actor2.value));
        if(form.actor3.value !== '')
            obj.actorsid.push(Number(form.actor3.value));
        if(form.actor4.value !== '')
            obj.actorsid.push(Number(form.actor4.value));
        console.log(obj)
        console.log(form.actor1.value === '')

        axios.post(`http://localhost:4000/editFilm`, obj);
    }

    return (
        <div className='act-cont'>
        {filmObj && filmObj.map(film =>
        <form id="film-form" className="film-form" onSubmit={(e)=> e.preventDefault()}>
            <div className="item">
                <label>Назва фільму</label>
                <input type="text" className='film-input' name="filmname" 
                value={ivName}
                onChange={e => setIvName(e.target.value)}
                ></input>
            </div>
            <div className="item">
                <label>Тривалість</label>
                <input type="text" name="duration"
                value={ivDuration}
                onChange={e => setIvDuration(e.target.value)}
                ></input>
            </div>
            <div className="item">
                <label>Рік</label>
                <input type="number" min="1950" max="2022" name="year"
                value={ivYear}
                onChange={e => setIvYear(e.target.value)}
                ></input>
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
                <input type="number" min="0" max="1" name="isHit" 
                value={ivIsHit}
                onChange={e => setIvIsHit(e.target.value)}
                ></input>
            </div>
            <div className="item">
                <label>VideoUrl</label>
                <input type="text" name="videourl"
                value={ivVideoUrl}
                onChange={e => setIvVideoUrl(e.target.value)}
                ></input>
            </div>
            <div className="item">
                    <label>PosterUrl</label>
                    <input className='poster-url' type="text" name="posterurl"
                    value={ivPosterUrl}
                    onChange={e => setIvPosterUrl(e.target.value)}
                    ></input>
                </div>
            <div>
                <div className="item">
                    <label>Актор 1</label>
                    <input type="text" name="actor1"
                    value={ivActor1}
                    onChange={e => setIvActor1(e.target.value)}
                    ></input>
                </div>
                <div className="item">
                    <label>Актор 2</label>
                    <input type="text" name="actor2"
                    value={ivActor2}
                    onChange={e => setIvActor2(e.target.value)}
                    ></input>
                </div>
                <div className="item">
                    <label>Актор 3</label>
                    <input type="text" name="actor3"
                    value={ivActor3}
                    onChange={e => setIvActor3(e.target.value)}
                    ></input>
                </div>
                <div className="item">
                    <label>Актор 4</label>
                    <input type="text" name="actor4"
                    value={ivActor4}
                    onChange={e => setIvActor4(e.target.value)}
                    ></input>
                </div>
            </div>
            <div className="item">
                <div>Опис фільму:</div>
                <textarea name="description"
                 value={ivDescr}
                 onChange={e => setIvDescr(e.target.value)}
                ></textarea>
            </div>
            <div><button className='add-film-button' onClick={() => sendForm(document.getElementById('film-form'))}>Зберегти</button></div>
        </form>
        )}
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
