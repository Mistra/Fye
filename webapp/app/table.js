import React from 'react';
import $ from "jquery";

export default class Table extends React.Component {

    render() {
        var body = this.props.data.map(e => {
            return (
                <tr key={e.email} onClick={this.props.onRowClicked.bind(this, e)}>
                    <td>{e.name} {e.surname}</td>
                    <td>{e.email}</td>
                    <td>{e.nation}</td>
                    <td>{e.country}</td>
                    <td>{e.faculty}</td>
                </tr>
            );
        });

        var title = this.props.title.map(e => {
            return <th>{e}</th>
        });

        return (
            <div>
                <table class="table table-sm table-hover">
                    <thead>
                        <tr> {title} </tr>
                    </thead>
                    <tbody>
                        {body}
                    </tbody>
                </table>
            </div>
        );
    }
}
