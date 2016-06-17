import React from 'react';
import $ from "jquery";

export default class ErasmusTable extends React.Component {

    render() {
        var body = this.props.data.map((e, i) => {
            return (
                <tr key={i} onClick={this.props.onRowClicked.bind(this, e)}>
                    <td>{e.name} {e.surname}</td>
                    <td>{e.email}</td>
                    <td>{e.nation}</td>
                    <td>{e.country}</td>
                    <td>{e.faculty}</td>
                </tr>
            );
        });

        var title = this.props.title.map((e, i) => {
            return <th key={i}>{e}</th>
        });
        var titles = <tr>{title}</tr>;
        return (
            <div className = "middle-block">
                <div>
                    <table class="table table-hover">
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
