import React from 'react';

export default class Menu extends React.Component {
    render() {
        return (
            <nav class="navbar navbar-dark bg-inverse">
                <div class="container">
                    <a class="navbar-brand" href="#">Navbar</a>
                    <ul class="nav navbar-nav">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Features</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
