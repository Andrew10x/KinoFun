import { useState, useEffect } from 'react';
import axios from 'axios';

import './styles.scss';

import editSvg from '../../assets/edit.svg';
import deleteSvg from '../../assets/delete.svg';
import EditActorForm from './EditActorForm';


const EditFilm = () => {
  const [actors, setActors] = useState(null);
  const [isVisibleForm, setFormVisibility] = useState(false);
  const [actorObj, setActorObj] = useState(null);

  useEffect(() => {
    const getFilms = async () => {
        axios
        .get('http://localhost:4000/actors')
        .then(({data}) => setActors(data))
    };
    getFilms();
  }, []);

  const deleteSelectedFilm = async id => {
    axios
        .post(`http://localhost:4000/delActor/${id}`)
        getActors();
        getActors();
  };

  const getSelectedFilm = async id => {
        axios.get(`http://localhost:4000/actor/${id}`)
        .then(({data}) => setActorObj(data))

    setFormVisibility(previousValue => !previousValue);
  };

  const getActors = () => {
    axios
    .get('http://localhost:4000/actors')
    .then(({data}) => setActors(data))
  }

  return (
    <div className="actor-container">
      <ul>
        {actors &&
          actors.map(actor => (
            <li>
              <div>{actor.actorname}</div>
              <div>
                <i>
                  <img src={editSvg} alt="edit" onClick={() => getSelectedFilm(actor.actorid)} />
                </i>
                <i>
                  <img
                    src={deleteSvg}
                    alt="delete"
                    onClick={() => deleteSelectedFilm(actor.actorid)}
                  />
                </i>
              </div>
            </li>
          ))}
      </ul>
      {actorObj && (
        <EditActorForm
          isVisibleForm={isVisibleForm}
          setVisibility={() => {
            setFormVisibility(!isVisibleForm);
          }}
          actorObj={actorObj}
          getActors={getActors}
        />
      )}
    </div>
  );
};

export default EditFilm;