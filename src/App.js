import {Data} from "./Data.js";
import { Dom } from "./Dom.js";


const App = {
    btnSearch: document.querySelector(".btnSearch"),
    btnViewAll: document.querySelector(".btnViewAll"),
    btnAuioPlay: document.querySelector(".audio-play"),
    btnClear: document.querySelector(".clear"),
    input: document.querySelector(".word"),


    start(){


        this.input.addEventListener("keypress", e => {
            if (e.key === 'Enter') {
                this.onSearchClick();
            }else{
                this.btnClear.style.display = "initial";
            }
        })


        this.btnClear.addEventListener("click", () => this.onClearClick());
        this.btnSearch.addEventListener("click", () => this.onSearchClick());
        this.btnViewAll.addEventListener("click", () => this.onViewAllClick());  
        this.btnAuioPlay.addEventListener("click", () => this.onAudioPlayClick());  
    },

    onSearchClick(){
        let word = this.input.value;
        Data.search(word);
    },

    onViewAllClick(){
        Data.showRecents();
    },

    onClearClick(){
        this.input.value = "";
        this.btnClear.style.display = "none";
    },
    
    onAudioPlayClick(){
        Dom.playAudio();
    }
}

export {App};