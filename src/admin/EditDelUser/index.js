import { useState, useEffect } from 'react';
import axios from 'axios';

import editSvg from '../../assets/edit.svg';
import deleteSvg from '../../assets/delete.svg';
import EditUserForm from './EditUserForm';


const EditCountry = () => {
  const [users, setUsers] = useState(null);
  const [isVisibleForm, setFormVisibility] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    const getInUsers = async () => {
        axios
        .get('http://localhost:4000/users')
        .then(({data}) => setUsers(data))
    };
    getInUsers();
  }, []);

  const deleteSelectedUser = async id => {
    axios
        .get(`http://localhost:4000/delUser/${id}`)
        getUsers();
        getUsers();
  };

  const getSelectedUser = async id => {
        axios.get(`http://localhost:4000/user/${id}`)
        .then(({data}) => setUserObj(data))

    setFormVisibility(previousValue => !previousValue);
  };

  const getUsers = () => {
    axios
    .get('http://localhost:4000/users')
    .then(({data}) => setUsers(data))
  }

  return (
    <div className="actor-container">
      <ul>
        {users &&
          users.map(user => (
            <li>
              <div>{user.login}</div>
              <div>
                <i>
                  <img src={editSvg} alt="edit" onClick={() => getSelectedUser(user.userid)} />
                </i>
                <i>
                  <img
                    src={deleteSvg}
                    alt="delete"
                    onClick={() => deleteSelectedUser(user.userid)}
                  />
                </i>
              </div>
            </li>
          ))}
      </ul>
      {userObj && (
        <EditUserForm
          isVisibleForm={isVisibleForm}
          setVisibility={() => {
            setFormVisibility(!isVisibleForm);
          }}
          userObj={userObj}
          getUsers={getUsers}
        />
      )}
    </div>
  );
};

export default EditCountry;