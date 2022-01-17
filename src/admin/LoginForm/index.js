import React from 'react';
import axios from 'axios';
import './styles.scss';

export default function LoginForm({ isVisibleForm, setVisibility}) {

    async function sendForm(form) {
        if(form) {
            const obj = {
                login: form.login.value,
                password: form.password.value
            };
            let res;
            try{
                res = await axios.post('http://localhost:4000/loginUser', obj);
                localStorage.setItem('token', res.data.token);
                setVisibility(!isVisibleForm);
                window.location.reload();
                
            }
            catch(e) {
                alert('Помилка авторизації')
            }
        
        }
    }

    return (
        <>{isVisibleForm && (
        <form action='' method='post' name='test' className='login-form' id='form'>
            <input type='text' name='login' placeholder="login"/>
            <input type='password' name='password' placeholder="password"/>
            <div className='buttons'>
                <input type='button' value='Авторизуватися' className='button1' onClick={() => sendForm(document.getElementById('form'))}/>
                <input type='button' value='Вийти' className='button2' onClick={setVisibility}/>
            </div> 
        </form>)}
        </>
    )
}
