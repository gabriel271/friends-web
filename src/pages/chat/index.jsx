import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { socket } from '../../services/socket';
import './styles.css';


function Chat() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const history = useHistory();
    const params = useParams();

    useEffect(() => {
        socket.emit('joinroom', { room: params.id});
        socket.on('newmesage', (data) => {
            setMessages([...messages, data]);
        });
    }, []);

    function leftRoom() {
        socket.emit('leftroom', { room: params.id});
        history.push('/');
    }

    function sentMessage(event) {
        event.preventDefault();
        const name = localStorage.getItem('user.name');
        socket.emit('sentmesage', {name: name ? name : 'user', message});
        setMessage('');
    }

  return (
      <div id="chat-container">
            <div id="header" className="container">
                <h2>Nome do Chat</h2>
                <button type="button"
                    onClick={leftRoom}
                >SAIR</button> 
            </div>
            <section>
                <ul>
                    {messages.map((message, index) => {
                        return (
                            <li key={index}>
                                <p>{message.name}</p>
                                <p>{message.message}</p>
                            </li>
                        )
                    })}
                </ul>
                <form onSubmit={sentMessage}>
                    <input type="text" 
                        placeholder="Escreva a mensagem"
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                    />
                    <button type="sobumite">ENVIAR</button>
                </form>
            </section>    
      </div>
  );
}

export default Chat;
