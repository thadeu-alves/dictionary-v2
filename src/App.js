import {Data} from "./Data.js";

const App = {
    btnSearch: document.querySelector(".btnSearch"),
    input: document.querySelector(".word"),
    start(){
        console.log("started");
        this.btnSearch.addEventListener("click", this.onSearchClick);
        console.log(this.input);
    },
    onSearchClick(){
        console.log(this.input);
        //let word = this.input.value;
        //Data.search(word);
    }
}

export {App};