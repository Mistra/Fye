import React from 'react';
import $ from "jquery";

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

    filterRequest(text) {
        let url = "api/testJson/filter/" + text; //FIXME non così
        this.makeRequest(url);
    }

    makeRequest(url) {
        url += '?token=' + localStorage.getItem("token"); //FIXME Cazzo è questo?
        $.ajax({
            url: url,
            cache: true,
            dataType: "json",
            success: data => {
                this.setState({data: data});
                //this.setState({main: this.setGui('suka')});
            },
            error: (xhr, status, err) => { //FIXME fai in funzione esterna
                switch(xhr.status) {
                    case 401 : {
                        console.log("non autorizzato");
                        this.props.ifNotLogged();
                    } break;
                     //this.setState({main: <Login setList={this.setList.bind(this)}/>});
                    default: console.error(this.props.url, status, err.toString());
                }
            }
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
