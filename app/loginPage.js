import React from 'react';
import $ from "jquery";

export default class LoginPage extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: ""
        };
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        let url = "api/auth";
        let data = {
            email: this.state.email,
            password: this.state.password
        };
        this.makeRequest(url, data);
    }

    makeRequest(url, data) {
        $.ajax({
            type: "POST",
            url: url,
            cache: true,
            dataType: "json",
            data: data,
            success: data => {
                localStorage.setItem("token", data.token);
                this.props.ifLogged();
                //console.log(data);
            },
            statusCode: {
                401: () => {
                    alert("Nope, you are still unouthorized");
                    //this.setState({main: <Login />});
                }
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString())
            }
        });
    }

    render() {
        return (
            <div className="container">
                <br /><br /><br />
                <div className = "middle-block">
                    <h3> Login </h3>
                    <form action="api/auth" method="post" onSubmit={this.handleSubmit.bind(this)}>
                        <fieldset class="form-group">
                            <label for="inputEmail1">Email address</label>
                            <input
                                value={this.state.email}
                                onChange={this.handleEmailChange.bind(this)}
                                type="email"
                                class="form-control"
                                id="inputEmail1"
                                placeholder="Enter email"/>
                        </fieldset>
                        <fieldset class="form-group">
                            <label for="inputPassword1">Password</label>
                            <input
                                value={this.state.password}
                                onChange={this.handlePasswordChange.bind(this)}
                                type="password"
                                class="form-control"
                                id="inputPassword1"
                                placeholder="Password"/>
                        </fieldset>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}
