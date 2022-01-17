import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import editSvg from '../../assets/edit.svg';
import deleteSvg from '../../assets/delete.svg';


const EditFilm = () => {
  const [films, setFilms] = useState(null);

  useEffect(() => {
    const getInFilms = async () => {
        axios
        .get('http://localhost:4000/films')
        .then(({data}) => setFilms(data))
    };
    getInFilms();
  }, []);

  const deleteSelectedFilm = async id => {
    axios
        .get(`http://localhost:4000/delFilm/${id}`)
        getFilms();
        getFilms();
  };

  const getFilms = () => {
    axios
    .get('http://localhost:4000/films')
    .then(({data}) => setFilms(data))
  }

  return (
    <div className="actor-container">
      <ul>
        {films &&
          films.map(film => (
            <li>
              <div>{film.filmname}</div>
              <div>
                <i>
                <Link to={`/editFilm#${film.filmid}`}>
                  <img src={editSvg} alt="edit" />
                </Link>
                </i>
                <i>
                  <img
                    src={deleteSvg}
                    alt="delete"
                    onClick={() => deleteSelectedFilm(film.filmid)}
                  />
                </i>
              </div>
            </li>
          ))}
      </ul>
      </div> 
  );
};

export default EditFilm;