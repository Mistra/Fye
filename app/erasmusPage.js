import React from 'react';
import Server from './server'

import FilterForm from "./filterForm.js";
import ErasmusTable from "./erasmusTable.js";
import ErasmusPopUp from "./erasmusPopUp.js";

export default class ErasmusPage extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            dialogVisibility: 'hidden',
            selectedErasmus: {}
        };
        //TODO Riguardare
        this.filterRequest("");
    }

    setData(data) {
        this.setState({data: data})
    }

    notifyError(xhr) {
        switch(xhr.status) {
            case 401 : alert("I can't fetch datas! You have to login!"); break;
            default: console.error(this.props.url, status, err.toString());
        }
    }

    filterRequest(text) {
        let server = new Server;
        let promise = server.getErasmusFilter(text);

        promise
        .then(this.setData.bind(this))
        .catch(this.notifyError.bind(this));
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
            <div className="container">
                <FilterForm
                    onTextChanged={this.filterRequest.bind(this)}
                    />
                <ErasmusTable
                    title={["Nome","Email","Nazione","Città","Facoltà"]} //FIXME hardcoded stuff, no thanks
                    data={this.state.data}
                    onRowClicked={this.openDialog.bind(this)}
                    />
                <ErasmusPopUp
                    erasmus={this.state.selectedErasmus}
                    visibility={this.state.dialogVisibility}
                    onBorderClicked={this.closeDialog.bind(this)}
                    />
            </div>
        );
    }
}
