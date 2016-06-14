import React from 'react';

class MenuRow extends React.Component {
    render() {
        return (
            <li class={this.props.active + " nav-item"}>
                <a class="nav-link" href="#">{this.props.name} <span class="sr-only">(current)</span></a>
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
                        <MenuRow active="active" name = "Helpers" />
                        <MenuRow active="" name = "Outgoing" />
                    </ul>
            </nav>
        );
    }
}
