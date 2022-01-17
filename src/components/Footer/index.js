import React from 'react';
import './styles.scss';
import LoginForm from '../../admin/LoginForm';

export default function Footer() {
    const [isVisLogin, setVisLogin] = React.useState(false);

    function logout() {
        delete localStorage.token;
        window.location.reload();
    }
    return (
        <>
        <LoginForm isVisibleForm={isVisLogin} setVisibility={() => {setVisLogin(!isVisLogin)}}/>
        <footer>
            {!localStorage.token ? 
            <div className="authLink" onClick={() => setVisLogin(!isVisLogin)}>Вхід для адміністратора</div>
            : <div className="authLink" onClick={logout}>Вийти</div>}

            </footer>
        </>
    )
}
