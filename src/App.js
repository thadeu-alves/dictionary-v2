import {Data} from "./Data.js";

const App = {
    btnSearch: document.querySelector(".btnSearch"),
    input: document.querySelector(".word"),
    start(){
        console.log("started");
        this.input.addEventListener("keypress", e => {
            if (e.key === 'Enter') {
                this.onSearchClick();
            }
        })
        this.btnSearch.addEventListener("click", () => this.onSearchClick());
        console.log(this.input);
    },
    onSearchClick(){
        console.log(this.input.value);
        let word = this.input.value;
        Data.search(word);
    }
}

export {App};