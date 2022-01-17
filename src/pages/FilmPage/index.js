import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import CommentForm from '../../components/CommentForm';
import './styles.scss';


export default function FilmPage() {

    const [filmObj, setFilm] = React.useState(null);
    const [comments, setComments] = React.useState(null);
    console.log(filmObj)

    React.useEffect(() => {
        axios
          .get(`http://localhost:4000/film/${Number(window.location.hash.split('#')[1])}`)
          .then(({data}) => setFilm(data))

        axios
        .get(`http://localhost:4000/selComments/${Number(window.location.hash.split('#')[1])}`)
        .then(({data}) => setComments(data))
    }, [])
    

    function addCommnent(comObj) {
        const newCom = [...comments, comObj];
        setComments(newCom);
    }

    return (
        <div>
        { filmObj && filmObj.map(film =><div>
            <p>{console.log(window.location.hash.split('#')[1])}</p>
            <section id="movie">
                <img src={process.env.PUBLIC_URL + '/Posters/' + film.posterurl} alt="img" />
                <div className="text">
                <h2 className="title">{film.filmname}</h2>
                <div className="field fieldFlex">
                    <div ><b>Жанр:</b></div> {film.genrename.map(f => <div className="margDiv">{ f }</div>)}
                </div>
                <div className="field">
                    <b>Тривалість:</b> {film.duration}
                </div>
                <div className="field">
                    <b>Країна:</b> {film.countryname}
                </div>
                <div className="field">
                    <b>Рік:</b> {film.year}
                </div>
                <div className="plot">
                    <p>
                    {film.description}
                    </p>
                </div>
                <br />
                <div>
                    <b>Актори</b>
                    <div>
                        {film.actor.map(ac =>  <Link to={`/actor#${ac[0]}`} className="margRight">{ac[1]}</Link>)}
                    </div>
                </div>
                </div>
            </section>
            <section id="film">
                <video controls="controls" src={process.env.PUBLIC_URL + '/Videos/' + film.videourl} className="film-item"></video>
            </section>
            <section id="comments">
                <p className="title">Коментарі</p>
                {comments && comments.map(comment => 
                    <div className="comment">
                        <p>{comment.nickname}</p>
                        <div>{comment.commentary}</div>
                    </div>
                    )}
            </section>
            <CommentForm id={film.filmid} onaddComment={addCommnent}/>
        </div>)
        }
        </div>
    )
}
