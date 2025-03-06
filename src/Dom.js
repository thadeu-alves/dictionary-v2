const Dom = {
    result: document.querySelector(".result"),
    divLoading: document.querySelector(".loading"),
    recents: document.querySelector(".recents"),
    wordDisplay: document.querySelector(".wordDisplay"),
    btnViewAll: document.querySelector(".btnViewAll"),
    audio: document.querySelector("audio"),
    addResult(word, text, partOf, synon, audioSrc){
        console.log(audioSrc);
        this.loaded();
        this.audio.src = audioSrc;
        this.result.querySelector("h1").innerHTML = word;
        this.result.querySelector("h2").innerHTML = partOf;
        this.result.querySelector("p").innerHTML = text;
        this.result.querySelector("h3").innerHTML = synon;
        this.typeWriterEffect(this.result.querySelector("p"), text, text.length);
    },
    typeWriterEffect(element, text){
        element.innerHTML = '';
        element.classList.add('typing'); // Adiciona a classe de animação
        let i = 0;

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, 50);
            } else {
                element.classList.remove('typing'); // Remove a classe quando termina
            }
        }

        type(); 
    },
    loading(){
        this.result.style.display = "none";
        this.divLoading.style.display = "flex";
    },
    loaded(){
        this.result.style.display = "initial";
        this.divLoading.style.display = "none";
    },
    showRecents(allWords){
        let div = this.recents.querySelector("div");
        this.recents.style.display = "flex";
        this.recents.querySelector("button").addEventListener("click", () => {
            this.recents.style.display = "none";
        })

        div.innerHTML = "";

        allWords.map(e => {
            let p = document.createElement("p");
            p.innerHTML = e.word;
            p.addEventListener("click", () => {
                this.showWord(e.id, allWords);
            })
            div.appendChild(p);
        })
    },
    showWord(id, allWords) {
        let word = allWords[id].word;
        let text = allWords[id].text;
        let div = this.wordDisplay.querySelector("div");
    
        this.wordDisplay.style.display = "flex";
        div.innerHTML = "";
        div.innerHTML = `<h1>${word}</h1>
                <p>${text}</p>`;
    
        window.addEventListener("click", e => {
            if(e.target.classList.contains("wordDisplay")) {
                this.wordDisplay.style.display = "none";
            }
        })
    },
    displayBtnAll(){
        this.btnViewAll.style.display = "initial";
    },
    playAudio(){
        console.log("music play");
        this.audio.play();
    }
}

export { Dom };