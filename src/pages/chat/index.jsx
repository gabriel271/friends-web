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
        return function cleanup() {
            socket.emit('leftroom', { room: params.id });
        }
    }, []);

    useEffect(() => {
        socket.on('newmesage', (data) => {
            setMessages(state => [...state, data]);
            let scroll = document.getElementsByTagName('ul')[0];
            scroll.scrollTop = scroll.scrollHeight;
        });
    }, []);

    function leftRoom() {
        socket.emit('leftroom', { room: params.id });
        history.push('/home');
    }

    function sentMessage(event) {
        event.preventDefault();
        const name = localStorage.getItem('user.name');
        socket.emit('sentmesage', {name: name ? name : 'user', message, room: params.id});
        setMessage('');
    }

  return (
      <div id="chat-container">
            <div id="header" className="container">
                <p>Sala {params.name}</p>
                <button type="button"
                    onClick={leftRoom}
                >SAIR</button> 
            </div>
            <section>
                <ul>
                    {messages.map((message, index) => {
                        return (
                            <li key={index} 
                                className={socket.id === message.author ? 'my-message' : 'not-my-message'}
                            >
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
