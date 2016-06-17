import $ from "jquery";

export default class Server {
    constructor() {
        this.baseUrl = "api/testJson/filter/";
        this.tokenParam = "?token="+sessionStorage.getItem("token");
    }

    getErasmusFilter(filter) {
        const url = this.baseUrl+filter+this.tokenParam;
        return new Promise((resolve, reject) => {
            $.getJSON(url)
            .done((json) => resolve(json))
            .fail((xhr, status, err) => reject(xhr));
        });
    }
}
