import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";

require('./bootstrap.css');
require('./main.css');

import Table from "./table.js";
import Menu from "./menu.js";
import OverList from "./overList.js";
import Insert from "./insert.js";
import Login from "./login.js";

export default class App extends React.Component {
    constructor() {
        super();
        this.delay;
        this.state = {
            main: null,
            data: [],
            dialogVisibility: 'hidden',
            selectedErasmus: {}
        };
        this.makeRequest("api/testJson/filter");
        //localStorage.setItem("lastname", "Smith");
    }

    componentDidMount() {
        //this.makeRequest("api/testJson/filter");
    }

    setList() {
        this.setState({main: this.setGui('suka')});
        this.makeRequest("api/testJson/filter");
    }

    setGui($page) {
        let $scene;
        if ($page == "login") {
            return (
                <div className="container">
                    <br /><br /><br />
                    <div className = "middle-block">
                        <Login />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <div className = "upper-block">
                        <input type="text" className="form-control"
                            onChange={this.filterRequest.bind(this)}
                            placeholder="Filter by: Nation, City, University"
                            aria-describedby="sizing-addon2"/>
                    </div>
                    <div className = "middle-block">
                        <Table
                            title={["Nome","Email","Nazione","Città","Facoltà"]}
                            data={this.state.data}
                            onRowClicked={this.openDialog.bind(this)}
                            />
                    </div>
                </div>
            );
        }
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
        url += '?token=' + localStorage.getItem("token");
        $.ajax({
            url: url,
            cache: true,
            dataType: "json",
            success: data => {
                this.setState({data: data});
                this.setState({main: this.setGui('suka')});
            },
            statusCode: {
                401: () => {
                    this.setState({main: <Login setList={this.setList.bind(this)}/>});
                }
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
                {this.state.main}
                <OverList
                    visibility={this.state.dialogVisibility}
                    onBorderClicked={this.closeDialog.bind(this)}
                    title={["Nome","Cognome","Email","Nazione","Città","Facoltà","Status"]}
                    data={this.state.selectedErasmus}
                    />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
