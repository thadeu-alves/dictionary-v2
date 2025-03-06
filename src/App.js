import {Data} from "./Data.js";
import { Dom } from "./Dom.js";


const App = {
    btnSearch: document.querySelector(".btnSearch"),
    btnViewAll: document.querySelector(".btnViewAll"),
    btnAuioPlay: document.querySelector(".audio-play"),
    input: document.querySelector(".word"),
    btnClear: document.querySelector(".clear"),
    start(){
        console.log("started");
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
        console.log(this.input.value);
        let word = this.input.value;
        Data.search(word);
    },
    onViewAllClick(){
        Data.recents();
    },
    onClearClick(){
        this.input.value = "";
        this.btnClear.style.display = "none";
    },
    onAudioPlayClick(){
        console.log('play audio')
        Dom.playAudio();
    }
}

export {App};