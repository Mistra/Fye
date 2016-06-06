import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";

require('./bootstrap.css');
require('./main.css');

import Table from "./table.js";
import Menu from "./menu.js";

class Person extends React.Component {
    constructor() {
        super();
    }

    render() {
        var divStyle = {
            visibility: this.props.visibility
        };
        return (
            <div>
                <div
                    style={divStyle}
                    class="black_overlay"
                    onClick={this.props.onBorderClicked}>
                </div>
                <div style={divStyle} id="popUpDiv">
                    <div class="middle-block">

                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Informazioni</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Nome:</th>
                                    <td>{this.props.person.name} {this.props.person.surname}</td>
                                </tr>
                                <tr>
                                    <th>Email:</th>
                                    <td>{this.props.person.email}</td>
                                </tr>
                                <tr>
                                    <th>Nazione:</th>
                                    <td>{this.props.person.nation}</td>
                                </tr>
                                <tr>
                                    <th>Città:</th>
                                    <td>{this.props.person.country}</td>
                                </tr>
                                <tr>
                                    <th>Facoltà:</th>
                                    <td>{this.props.person.faculty}</td>
                                </tr>
                                <tr>
                                    <th>Stato:</th>
                                    <th><div class="checked">pending</div></th>
                                </tr>
                            </tbody>
                        </table>
                        <button type="button" class="btn btn-success">Segna come corrisposto</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default class App extends React.Component {
    constructor() {
        super();
        this.delay;
        this.state = {
            title: [
                "Nome",
                "Email",
                "Nazione",
                "Città",
                "Facoltà"
            ],
            data: [],
            dialogVisibility: 'hidden',
            selectedErasmus: {}
        };
    }

    componentDidMount() {
        this.makeRequest("api/testJson/filter");
    }

    filterRequest(e) {
        let text = e.target.value;
        clearTimeout(this.delay);

        this.delay = setTimeout(() => {
            let url = "api/testJson/filter/" + text;
            this.makeRequest(url);
        }, 500);

    }

    makeRequest(url) {
        $.ajax({
            url: url,
            cache: true,
            dataType: "json",
            success: data => {
                //alert(data);
                this.setState({data: data});
            },
            error: (xhr, status, err) =>
            console.error(this.props.url, status, err.toString())
        });
    }

    openDialog(erasmus) {
        this.setState({
            selectedErasmus: erasmus,
            dialogVisibility: 'visible'
        });
    }

    closeDialog() {
        this.setState({dialogVisibility: 'hidden'});
    }

    render() {
        return (
            <div>
                <Menu />
                <div className="container">
                    <div className = "upper-block">
                        <input type="text" className="form-control"
                            onChange={this.filterRequest.bind(this)}
                            placeholder="Filter by: Nation, City, University"
                            aria-describedby="sizing-addon2"/>
                    </div>
                    <div className = "middle-block">
                        <Table
                            title={this.state.title}
                            data={this.state.data}
                            onRowClicked={this.openDialog.bind(this)}
                            />
                    </div>
                </div>
                <Person
                    visibility={this.state.dialogVisibility}
                    onBorderClicked={this.closeDialog.bind(this)}
                    person={this.state.selectedErasmus}
                    />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
