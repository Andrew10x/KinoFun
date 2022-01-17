import { useEffect, useState } from 'react';
import axios from 'axios';



const EditFilmForm = ({ isVisibleForm, setVisibility, actorObj, getActors}) => {
  
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');
  const [id, setId] = useState('');
  
  useEffect(() => {
    setInputValue1( actorObj[0].actorname);
    setInputValue2( actorObj[0].photourl);
    setInputValue3( actorObj[0].actordescription);
    setId(actorObj[0].actorid)
  }, [isVisibleForm,  actorObj]);

  if (! actorObj) {
    actorObj = {
      actorname: 'назва фільму',
      photourl: 'оригінальна назва фільму',
      actordescription: 'режисер'
    };
  }

  const sendForm = async form => {
    if (form) {
      const obj = {
        actorname: form.actorname.value,
        photourl: form.photourl.value,
        actordescription: form.actordescription.value,
      };
      
      axios.post(`http://localhost:4000/editActor/${id}`, obj);
      getActors();
      getActors();
      setVisibility(!isVisibleForm);
    }
  }

  return (
    <>
      {isVisibleForm && (
        <form action="" method="post" name="test" className="form" id="form">
          <input
            type="text"
            name="actorname"
            value={inputValue1}
            placeholder={ actorObj.actorname}
            onChange={e => setInputValue1(e.target.value)}
          />
          <input
            type="text"
            name="photourl"
            value={inputValue2}
            placeholder={ actorObj.photourl}
            onChange={e => setInputValue2(e.target.value)}
          />
          <textarea
            type="text"
            className="details"
            name="actordescription"
            value={inputValue3}
            placeholder={ actorObj.actordescription}
            onChange={e => setInputValue3(e.target.value)}
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

export default EditFilmForm;