import axios from 'axios';
import React from 'react';
import './styles.scss';


export default function CommentForm({id, onaddComment}) {
    
    function saveComment(form) {
        const obj = {
            nickname: form.nickName.value,
            filmid: id,
            commentary: form.commentary.value
        }
        axios.post(`http://localhost:4000/addComment`, obj);
        onaddComment(obj);
        document.getElementById('reset-button').click();
    }

    function submitText(e) {
        e.preventDefault();
    }
    return (
        <section id="comment-form">
            <form className='comment-form' id='form' onSubmit={submitText}>
                <input type="text" name="nickName" placeholder='nick name' className='input'></input>
                <textarea placeholder='коментар' className="textarea" name="commentary"></textarea>
                <div className="buttons">
                    <button onClick={() => {saveComment(document.getElementById('form'))}}>Опублікувати</button>
                    <button id="reset-button" type="reset">Очистити</button>
                </div>
            </form>
        </section>
    )
}
