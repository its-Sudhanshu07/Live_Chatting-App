import React, { useState } from 'react' 
import { v4 as uuidv4 } from 'uuid';
import InputEmoji from 'react-input-emoji' 
import UserPage from '../UserPage'
import "./index.css" 

const EmojiPage= ()=> {

  const [ text, setText ] = useState('')
  const [messages, setMessages] = useState([]) 
  const [mentionInput, setMentionInput] = useState('');
  const [showMentions, setShowMentions] = useState(false);

  const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

  const getRandomUser = () => {
    const randomIndex = Math.floor(Math.random() * user_list.length);
    return user_list[randomIndex];
  };
    
    
  const handleOnEnter = (text) => {
      console.log('enter', text);
  };

  const handleInputChange = (value) => {
    setText(value);
    if (value[value.length - 1] === '@') {
      setShowMentions(true);
      setMentionInput('');
    } else {
      setShowMentions(false);
    }
  };

  const handleMentionSelect = (username) => {
    setText((prevText) => prevText.slice(0, -mentionInput.length) + username + ' ');
    setShowMentions(false);
    setMentionInput('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUser = getRandomUser();
    const newMessage = {
      id: uuidv4(),
      user: newUser,
      text: text,
      date: new Date(),
      likes: 0
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setText('');
  };

  const handleLike = (id) => {
    setMessages(prevMessages =>
      prevMessages.map(message =>
        message.id === id ? { ...message, likes: message.likes + 1 } : message
      )
    );
  };

    return (
     <div className="emoji-container">
       <ul className="ul-list">
        {messages.map(message => (
          <UserPage key={message.id} message={message} onLike={handleLike} />
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="form-el">
        <InputEmoji
          value={text}
          onChange={handleInputChange}
          cleanOnEnter
          onEnter={handleOnEnter}
          
          className="input-el"
          placeholder="Type a message"
        />
        {showMentions && (
          <div className="mention-dropdown">
            {user_list.map(user => (
              <div
                key={user}
                className="mention-option"
                onClick={() => handleMentionSelect(user)}
              >
                @{user}
              </div>
            ))}
          </div>
        )}
        <button type="submit" className="btn-click">Send</button>
      </form>
    </div>
  );
};
export default EmojiPage