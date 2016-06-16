import React from 'react';
import {Link} from 'react-router';

class MenuRow extends React.Component {
    render() {
        let active = (this.props.link == this.props.path) ? "active" : "";
        return (
            <li class={active + " nav-item"}>
                <Link class="nav-link" to={this.props.link}>
                    {this.props.children}
                    <span class="sr-only">(current)</span>
                </Link>
            </li>
        );
    }
}

export default class MenuHeader extends React.Component {
    render() {
        return (
            <nav class="navbar navbar-fixed-top navbar-dark bg-inverse">
                    <a class="navbar-brand" href="#">Fye</a>
                    <ul class="nav navbar-nav">
                        <MenuRow path={this.props.location.pathname} link="/">
                            Helpers
                        </MenuRow>
                        <MenuRow path={this.props.location.pathname} link="/login">
                            Login
                        </MenuRow>
                    </ul>
            </nav>
        );
    }
}
