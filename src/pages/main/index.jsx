import React from 'react';
import logo from '../../images/Friends.png';
import { useHistory } from 'react-router-dom';
import { AiFillGithub } from 'react-icons/ai';
import './styles.css';

function Main() {
    const history = useHistory();

    return (
        <div id="main-container">
            <section>
                <p>Seja bem vindo ao friends chat, pegue sua xicara de café e faça novas amizades.</p>
                <button type="button"
                    onClick={() => history.push('/home')}
                >Entrar no friends</button>
                <p>
                    <a href="https://github.com/gabriel271">
                        <p><AiFillGithub size={30}/></p>
                        <p>gabriel271</p>
                    </a>
                </p>
            </section>
            <div>
                <img src={logo} alt="logo" />
            </div>
        </div>
    );
}

export default Main;
