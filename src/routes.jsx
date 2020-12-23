import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Main from './pages/main';
import Chat from './pages/chat';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Main}></Route>
                <Route path="/chat/:id/:name" component={Chat}></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes; 
