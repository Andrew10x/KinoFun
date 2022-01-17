import { useEffect, useState } from 'react';
import axios from 'axios';



const EditUserForm = ({ isVisibleForm, setVisibility, userObj, getUsers}) => {
  
  
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');
  const [inputValue4, setInputValue4] = useState('');
  const [inputValue5, setInputValue5] = useState('');
  const [id, setId] = useState('');
  useEffect(() => {
    setInputValue1( userObj[0].firstname);
    setInputValue2( userObj[0].lastname);
    setInputValue3( userObj[0].middlename);
    setInputValue4( userObj[0].login);
    setInputValue5('');
    setId(userObj[0].userid)
  }, [isVisibleForm,  userObj]);


  const sendForm = async form => {
    if (form) {
      const obj = {
        firstname: form.firstname.value,
        lastname: form.lastname.value,
        middlename: form.middlename.value,
        login: form.login.value,
        password: form.password.value
      };

      if(form.select.value === 'admin')
                obj.roleid = 1;
            else 
                obj.roleid = 2;
      
      axios.post(`http://localhost:4000/editUser/${id}`, obj);
      getUsers();
      getUsers();
      setVisibility(!isVisibleForm);
    }
  }

  return (
    <>
      {isVisibleForm && (
        <form action="" method="post" name="test" className="form" id="form">
          <input
            type="text"
            name="firstname"
            value={inputValue1}
            placeholder={ userObj.firstname}
            onChange={e => setInputValue1(e.target.value)}
          />
          <input
            type="text"
            name="lastname"
            value={inputValue2}
            placeholder={ userObj.lastname}
            onChange={e => setInputValue2(e.target.value)}
          />
          <input
            type="text"
            name="middlename"
            value={inputValue3}
            placeholder={ userObj.middlename}
            onChange={e => setInputValue3(e.target.value)}
          />
          <input
            type="text"
            name="login"
            value={inputValue4}
            placeholder={ userObj.login}
            onChange={e => setInputValue4(e.target.value)}
          />
          <input
            type="password"
            name="password"
            value={inputValue5}
            placeholder={ userObj.password}
            onChange={e => setInputValue5(e.target.value)}
          />
          <select name='select'>
                <option>contentmaker</option>
                <option>admin</option>
          </select>
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

export default EditUserForm;