import React from 'react';
import axios from 'axios';
//import './styles.scss';

export default function AddCounryForm({ isVisibleForm, setVisibility}) {

    function sendForm(form) {
        if(form) {
            const obj = {
                countryname: form.countryname.value
            };
    
            axios.post('http://localhost:4000/addCountry', obj);
            setVisibility(!isVisibleForm);
        }
    }

    return (
        <>{isVisibleForm && (
        <form action='' method='post' name='test' className='form' id='form'>
            <input type='text' name='countryname' placeholder="назва країни"/>
            <div className='buttons'>
                <input type='button' value='Зберегти' className='button1' onClick={() => sendForm(document.getElementById('form'))}/>
                <input type='button' value='Вийти' className='button2' onClick={setVisibility}/>
            </div> 
        </form>)}
        </>
    )
}
