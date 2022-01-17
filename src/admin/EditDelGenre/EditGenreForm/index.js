import { useEffect, useState } from 'react';
import axios from 'axios';



const EditGenreForm = ({ isVisibleForm, setVisibility, genreObj, getGenres}) => {
  
  const [inputValue1, setInputValue1] = useState('');
  const [id, setId] = useState('');
  useEffect(() => {
    setInputValue1( genreObj[0].genrename);
    setId(genreObj[0].genreid)
  }, [isVisibleForm,  genreObj]);

  if (! genreObj) {
    genreObj = {
      genrename: 'назва жанру'
    };
  }

  const sendForm = async form => {
    if (form) {
      const obj = {
        genrename: form.genrename.value
      };
      
      axios.post(`http://localhost:4000/editGenre/${id}`, obj);
      getGenres();
      getGenres();
      setVisibility(!isVisibleForm);
    }
  }

  return (
    <>
      {isVisibleForm && (
        <form action="" method="post" name="test" className="form" id="form">
          <input
            type="text"
            name="genrename"
            value={inputValue1}
            placeholder={ genreObj.genrename}
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

export default EditGenreForm;