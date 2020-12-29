import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Main from './pages/main';
import Chat from './pages/chat';
import Home from './pages/home';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Main}></Route>
                <Route exact path="/home" component={Home}></Route>
                <Route path="/chat/:id/:name" component={Chat}></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes; 
