import React from 'react';
import axios from 'axios';

export default function AddUserForm({ isVisibleForm, setVisibility}) {

    async function sendForm(form) {
        if(form) {
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
    
            const res = await axios.post('http://localhost:4000/addUser', obj);
            console.log(res)
            if(res.data.status === -1)
                alert('Логін зайнятий')
            else
                setVisibility(!isVisibleForm);
        }
    }

    return (
        <>{isVisibleForm && (
        <form action='' method='post' name='test' className='form' id='form'>
            <input type='text' name='firstname' placeholder="Ім'я"/>
            <input type='text' name='lastname' placeholder="Прізвище"/>
            <input type='text' name='middlename' placeholder="По батькові"/>
            <input type='text' name='login' placeholder="login"/>
            <input type='password' name='password' placeholder="password"/>
            <select name='select'>
                <option>admin</option>
                <option>contentmaker</option>
            </select>
            <div className='buttons'>
                <input type='button' value='Авторизуватися' className='button1' onClick={() => sendForm(document.getElementById('form'))}/>
                <input type='button' value='Вийти' className='button2' onClick={setVisibility}/>
            </div> 
        </form>)}
        </>
    )
}
