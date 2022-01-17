import { useState, useEffect } from 'react';
import axios from 'axios';

import editSvg from '../../assets/edit.svg';
import deleteSvg from '../../assets/delete.svg';
import EditGenreForm from './EditGenreForm';


const EditGenre = () => {
  const [genres, setGenres] = useState(null);
  const [isVisibleForm, setFormVisibility] = useState(false);
  const [genreObj, setGenreObj] = useState(null);

  useEffect(() => {
    const getInGenres = async () => {
        axios
        .get('http://localhost:4000/genres')
        .then(({data}) => setGenres(data))
    };
    getInGenres();
  }, []);

  const deleteSelectedFilm = async id => {
    axios
        .get(`http://localhost:4000/delGenre/${id}`)
        getGenres();
        getGenres();
  };

  const getSelectedFilm = async id => {
        axios.get(`http://localhost:4000/genre/${id}`)
        .then(({data}) => setGenreObj(data))

    setFormVisibility(previousValue => !previousValue);
  };

  const getGenres = () => {
    axios
    .get('http://localhost:4000/genres')
    .then(({data}) => setGenres(data))
  }

  return (
    <div className="actor-container">
      <ul>
        {genres &&
          genres.map(genre => (
            <li>
              <div>{genre.genrename}</div>
              <div>
                <i>
                  <img src={editSvg} alt="edit" onClick={() => getSelectedFilm(genre.genreid)} />
                </i>
                <i>
                  <img
                    src={deleteSvg}
                    alt="delete"
                    onClick={() => deleteSelectedFilm(genre.genreid)}
                  />
                </i>
              </div>
            </li>
          ))}
      </ul>
      {genreObj && (
        <EditGenreForm
          isVisibleForm={isVisibleForm}
          setVisibility={() => {
            setFormVisibility(!isVisibleForm);
          }}
          genreObj={genreObj}
          getGenres={getGenres}
        />
      )}
    </div>
  );
};

export default EditGenre;