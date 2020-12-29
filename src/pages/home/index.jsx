import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { socket } from '../../services/socket';
import './styles.css';

socket.on('connect', () => {
    socket.emit('login')
});

function Home() {
    const [userName, setUserName] = useState(localStorage.getItem('user.name') || 'user');
    const [roomName, setRoomName] = useState('');
    const [roomMax, setRoomMax] = useState('');
    const [rooms, setRooms] = useState([]);
    const history = useHistory();

    useEffect(() => {
        socket.emit('getrooms');
        socket.on('listrooms', (data) => {
            setRooms(JSON.parse(data))
        });
    }, []);

    function createRoom(event) {
        event.preventDefault();

        socket.emit('createroom', {name: roomName, max: roomMax});
    }

    function changeName(event) {
        event.preventDefault();

        localStorage.setItem('user.name', userName);
    }

    return (
        <div id="home-container">
            <div id="configs-container" className="container">
                <form id="user-name-form"
                    onSubmit={changeName}
                >
                    <input type="text" 
                        placeholder="Mudar nome..."
                        value={userName}
                        onChange={(event) => setUserName(event.target.value)}
                    />
                    <button type="submite">SALVAR</button>
                </form>
            </div>

            <section>
                <div id="rooms-container">
                    <h2>Salas</h2>
                    <ul>
                        {rooms.map((room) => {
                            return (
                                <li key={room.id} className="container">
                                    <p>{room.name} {room.participants.length}/{room.max}</p>
                                    <button type="button"
                                        onClick={() => {
                                            if(Number(room.participants.length) === Number(room.max)) return alert('Sala cheia');
                                            history.push(`/chat/${room.id}/${room.name}`);
                                        }}
                                    >JOIN</button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div id="room-form-container">
                    <h2>Criar sala</h2>
                    <form id="room-form"
                        onSubmit={createRoom}
                    >
                        <input type="text" 
                            required placeholder="Nome da sala"
                            value={roomName}
                            onChange={(event) => setRoomName(event.target.value)}
                        />
                        <input type="number" 
                            required placeholder="Numero maximo de participantes"
                            value={roomMax}
                            onChange={(event) => setRoomMax(event.target.value)}
                        />
                        <button type="submite">ADICIONAR</button>
                    </form>
                </div>
            </section>
      </div>
    );
}

export default Home;
