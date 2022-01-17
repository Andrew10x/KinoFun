import { useState, useEffect } from 'react';
import axios from 'axios';

import editSvg from '../../assets/edit.svg';
import deleteSvg from '../../assets/delete.svg';
import EditCountryForm from './EditCountryForm';


const EditCountry = () => {
  const [countries, setCountries] = useState(null);
  const [isVisibleForm, setFormVisibility] = useState(false);
  const [countryObj, setCountryObj] = useState(null);

  useEffect(() => {
    const getInCountries = async () => {
        axios
        .get('http://localhost:4000/countries')
        .then(({data}) => setCountries(data))
    };
    getInCountries();
  }, []);

  const deleteSelectedCountry = async id => {
    axios
        .get(`http://localhost:4000/delCountry/${id}`)
        getCountries();
        getCountries();
  };

  const getSelectedCountry = async id => {
        axios.get(`http://localhost:4000/country/${id}`)
        .then(({data}) => setCountryObj(data))

    setFormVisibility(previousValue => !previousValue);
  };

  const getCountries = () => {
    axios
    .get('http://localhost:4000/countries')
    .then(({data}) => setCountries(data))
  }

  return (
    <div className="actor-container">
      <ul>
        {countries &&
          countries.map(country => (
            <li>
              <div>{country.countryname}</div>
              <div>
                <i>
                  <img src={editSvg} alt="edit" onClick={() => getSelectedCountry(country.countryid)} />
                </i>
                <i>
                  <img
                    src={deleteSvg}
                    alt="delete"
                    onClick={() => deleteSelectedCountry(country.countryid)}
                  />
                </i>
              </div>
            </li>
          ))}
      </ul>
      {countryObj && (
        <EditCountryForm
          isVisibleForm={isVisibleForm}
          setVisibility={() => {
            setFormVisibility(!isVisibleForm);
          }}
          countryObj={countryObj}
          getCountries={getCountries}
        />
      )}
    </div>
  );
};

export default EditCountry;