import React from 'react';
import $ from "jquery";

import MenuHeader from "./menuHeader.js";
import LoginPage from "./loginPage.js";
import ErasmusPage from "./erasmusPage";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = { main: null};
        console.debug("app started, find a way to toggle debug logs off in production");
    }

    componentDidMount() {
        this.setErasmusPage();
    }

    setErasmusPage() {
        this.setState({main:
            <ErasmusPage
                ifNotLogged={this.setLoginPage.bind(this)}
                />
        });
    }

    setLoginPage() {
        this.setState({main:
            <LoginPage
                ifLogged={this.setErasmusPage.bind(this)}
                />
        });
    }

    render() {
        return (
            <div>
                <MenuHeader />
                {this.state.main}
            </div>
        );
    }
}
