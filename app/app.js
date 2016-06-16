import $ from "jquery";
require('./css/bootstrap.css');
require('./css/main.css');

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';


import MenuHeader from "./menu/menuHeader.js";
import LoginPage from "./loginPage.js";
import ErasmusPage from "./erasmusPage";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <MenuHeader location={this.props.location} />
                {this.props.children}
            </div>
        );
    }
}

const app = document.getElementById('app');

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={ErasmusPage}></IndexRoute>
            <Route path="login"component={LoginPage}></Route>
        </Route>
    </Router>, app
);
