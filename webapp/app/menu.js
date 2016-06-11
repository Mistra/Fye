import React from 'react';

export default class Menu extends React.Component {
    render() {
        return (
            <nav class="navbar navbar-fixed-top navbar-dark bg-inverse">

                    <a class="navbar-brand" href="#">Navbar</a>
                    <ul class="nav navbar-nav">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">{localStorage.getItem("lastname")}</a>
                        </li>
                    </ul>

            </nav>
        );
    }
}
