import React from 'react';

export default class Login extends React.Component {

    render() {
        return (
            <div className="container">
                <br /><br /><br />
                <div className = "middle-block">
                    <h3>
                        Login
                    </h3>
                    <form>
                        <fieldset class="form-group">
                            <label for="inputEmail1">Email address</label>
                            <input type="email" class="form-control" id="inputEmail1" placeholder="Enter email"/>
                        </fieldset>
                        <fieldset class="form-group">
                            <label for="inputPassword1">Password</label>
                            <input type="password" class="form-control" id="inputPassword1" placeholder="Password"/>
                        </fieldset>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}
