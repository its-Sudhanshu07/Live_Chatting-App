import "./index.css"
import React from "react";


const UserPage = ({ message, onLike }) => {
  const { user, text, date, likes } = message;
  const initial = user[0];

  return (
    <li className="user-Container">
      <div className="user-name-date-div">
        <p className="initial">{initial}</p>
        <p className="person-name">{user}</p>
        <p className="date">{date.toLocaleTimeString()}</p>
      </div>
      <p className="text-fild">{text}</p>
      <button onClick={() => onLike(message.id)} className="like-btn">
        Like ({likes})
      </button>
    </li>
  );
};
export default UserPage