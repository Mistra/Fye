import React from 'react';
import $ from "jquery";

export default class ErasmusTable extends React.Component {

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
            return <th key={e}>{e}</th>
        });
        var titles = <tr>{title}</tr>;
        return (
            <div className = "middle-block">
                <div>
                    <table class="table table-sm table-hover">
                        <thead>
                            {titles}
                        </thead>
                        <tbody>
                            {body}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
