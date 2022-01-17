import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import AddActorForm from '../../admin/AddActorForm';
import AddGenreForm from '../../admin/AddGenreForm';
import AddCounryForm from '../../admin/AddCountryForm';
import AddUserForm from '../../admin/AddUserForm';

import './styles.scss';

export default function AdminPage() {
    const [isVisAddActor, setVisAddActor] = React.useState(false);
    const [isVisAddGenre, setVisAddGenre] = React.useState(false);
    const [isVisAddCountry, setVisAddCountry] = React.useState(false);
    const [isVisAddUser, setVisAddUser] = React.useState(false);
    const [userRole, setUserRole] = React.useState(null);

    React.useEffect(() => {
        const config = {
            headers: {'Authorization': "bearer " + localStorage.token}
        };
        if(localStorage.token)
        axios.get('http://localhost:4000/getRole', config)
        .then(({data}) => setUserRole(data.rolename))
    })
    
    return (
        <div className="admin-page">
            <ul className="functions">
                <li><Link to="/addFilm">Додати фільм</Link></li>
                <li><Link to="/editDelFilm">Редагувати/видалити фільм</Link></li>
                <li onClick={() => setVisAddActor(!isVisAddActor)}>Додати актора</li>
                <li><Link to="/editDelActor">Редагувати/видалити актора</Link></li>
                <li><Link to="/watchDelComments">Дивитися/видалити коментарі</Link></li>
                {userRole === 'admin' &&
                <li onClick={() => setVisAddCountry(!isVisAddCountry)}>Додати країну</li>}
                {userRole === 'admin' &&
                <li><Link to="/editDelCountry">Редагувати/видалити країну</Link></li>}
                {userRole === 'admin' &&
                <li onClick={() => setVisAddGenre(!isVisAddGenre)}>Додати жанр</li>}
                {userRole === 'admin' &&
                <li><Link to="/editDelGenre">Редагувати/видалити жанр</Link></li>}
                {userRole === 'admin' &&
                <li onClick={() => setVisAddUser(!isVisAddUser)}>Додати користувача</li>}
                {userRole === 'admin' &&
                <li><Link to="/editDelUser">Редагувати/видалити користувача</Link></li>}
                <AddActorForm isVisibleForm={isVisAddActor} setVisibility={() => {setVisAddActor(!isVisAddActor)}}/>
                <AddGenreForm isVisibleForm={isVisAddGenre} setVisibility={() => {setVisAddGenre(!isVisAddGenre)}}/>
                <AddCounryForm isVisibleForm={isVisAddCountry} setVisibility={() => {setVisAddCountry(!isVisAddCountry)}}/>
                <AddUserForm isVisibleForm={isVisAddUser} setVisibility={() => {setVisAddUser(!isVisAddUser)}}/>
            </ul>
        </div>
    )
}
