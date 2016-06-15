import React from 'react';
import $ from "jquery";

export default class FilterForm extends React.Component {
    constructor() {
        super();
        this.state = {text: ""};
        this.delay = null;
    }

    handleTextChange(e) {
        this.setState({text: e.target.value});

        clearTimeout(this.delay);
        this.delay = setTimeout(() => {
            this.props.onTextChanged(this.state.text);
        }, 500);
    }

    render() {
        return (
            <div className = "upper-block">
                <input type="text" className="form-control"
                    value={this.state.text}
                    onChange={this.handleTextChange.bind(this)}
                    placeholder="Filter by: Nation, City, University"/>
            </div>
        );
    }
}
