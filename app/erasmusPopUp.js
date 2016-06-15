import React from 'react';
import $ from "jquery";

export default class ErasmusPopUp extends React.Component {

    render() {
        var divStyle = {visibility: this.props.visibility};

        var title = Object.keys(this.props.erasmus).map(e => {
            return <div key={e}>{e}</div>
        });


        var body = $.map(this.props.erasmus, function(value, index) {
            if (index == "country") {
                return <div class="checked" key={index}>{value}</div>
            }
            return <div key={index}>{value}</div>
        });

        return (
            <div>
                <div
                    style={divStyle}
                    class="black_overlay"
                    onClick={this.props.onBorderClicked}>
                </div>
                <div style={divStyle} class="popOver">
                    <div class="middle-block">
                        <h3>Informazioni</h3>
                        <div class="row">
                            <div class="col-md-5 overList-header">
                                {title}
                            </div>
                            <div class="col-md-7 overList-body">
                                {body}
                            </div>
                        </div>
                        <button type="button" class="btn btn-success">
                            Segna come corrisposto
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
