import { useEffect, useState } from 'react';
import axios from 'axios';



const EditCountryForm = ({ isVisibleForm, setVisibility, countryObj, getCountries}) => {
  
  const [inputValue1, setInputValue1] = useState('');
  const [id, setId] = useState('');
  useEffect(() => {
    setInputValue1( countryObj[0].countryname);
    setId(countryObj[0].countryid)
  }, [isVisibleForm,  countryObj]);

  if (! countryObj) {
    countryObj = {
      countryname: 'назва країни'
    };
  }

  const sendForm = async form => {
    if (form) {
      const obj = {
        countryname: form.countryname.value
      };
      
      axios.post(`http://localhost:4000/editCountry/${id}`, obj);
      getCountries();
      getCountries();
      setVisibility(!isVisibleForm);
    }
  }

  return (
    <>
      {isVisibleForm && (
        <form action="" method="post" name="test" className="form" id="form">
          <input
            type="text"
            name="countryname"
            value={inputValue1}
            placeholder={ countryObj.countryname}
            onChange={e => setInputValue1(e.target.value)}
          />
          <div className="buttons">
            <input
              type="button"
              value="Зберегти"
              className="button1"
              onClick={() => sendForm(document.getElementById('form'))}
            />
            <input type="button" value="Вийти" className="button2" onClick={setVisibility} />
          </div>
        </form>
      )}
    </>
  );
};

export default EditCountryForm;