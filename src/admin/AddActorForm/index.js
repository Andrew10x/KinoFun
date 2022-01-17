import React from 'react';
import axios from 'axios';
import './styles.scss';

export default function AddActorForm({ isVisibleForm, setVisibility}) {

    function sendForm(form) {
        if(form) {
            const obj = {
                actorname: form.actorname.value,
                photourl: form.photourl.value,
                actordescription: form.actordescription.value
            };
    
            axios.post('http://localhost:4000/addActor', obj);
            setVisibility(!isVisibleForm);
        }
    }

    return (
        <>{isVisibleForm && (
        <form action='' method='post' name='test' className='form' id='form'>
            <input type='text' name='actorname' placeholder="ім'я актора"/>
            <input type='text' name='photourl' placeholder="url фотографії"/>
            <textarea name='actordescription' placeholder="опис" className='details'/>
            <div className='buttons'>
                <input type='button' value='Зберегти' className='button1' onClick={() => sendForm(document.getElementById('form'))}/>
                <input type='button' value='Вийти' className='button2' onClick={setVisibility}/>
            </div> 
        </form>)}
        </>
    )
}
