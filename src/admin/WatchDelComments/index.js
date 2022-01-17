import { useState} from 'react';
import axios from 'axios';

import deleteSvg from '../../assets/delete.svg';



const WatchDelComments = () => {
  const [comments, setComments] = useState(null);
  const [date, setDate] = useState(null);

  const deleteSelectedComment = async id => {
    axios
        .get(`http://localhost:4000/delComment/${id}`)
        getComments(date);
        getComments(date);
  };


  const getComments = (d) => {
      if(d)
    axios
    .get(`http://localhost:4000/commentsByDate?date=${d}`)
    .then(({data}) => setComments(data))

    setDate(d);
  }


  return (
    <div className="actor-container">
        <input id="date" type="date" onChange={() => getComments(document.getElementById("date").value)}/>
      <ul>
        {comments &&
          comments.map(comment => (
            <li>
              <div>{comment.commentary}</div>
              <div>
                <i>
                  <img
                    src={deleteSvg}
                    alt="delete"
                    onClick={() => deleteSelectedComment(comment.commentid)}
                  />
                </i>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default WatchDelComments;