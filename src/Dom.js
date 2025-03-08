const Dom = {
    result: document.querySelector(".result"),
    divLoading: document.querySelector(".loading"),
    recents: document.querySelector(".recents"),
    wordDisplay: document.querySelector(".wordDisplay"),
    btnViewAll: document.querySelector(".btnViewAll"),
    audio: document.querySelector("audio"),
    audioPlayer: document.querySelector(".audio-player"),

    addResult(word, text, partOf, synon, audioSrc){

        this.loaded();
        this.audio.src = audioSrc;

        this.audio.addEventListener('error', () => {
            console.error("Erro ao carregar o áudio: Fonte não suportada ou inválida.");
            this.audioPlayer.style.display = "none";
        });

        this.innerElement(this.result, "h1", word);
        this.innerElement(this.result, "h2", partOf);
        this.innerElement(this.result, "p", text);
        this.innerElement(this.result, "h3", synon);

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
        this.undisplayElement(this.result, true);
        this.displayElement(this.divLoading, "flex");
        this.undisplayElement(this.audioPlayer);
    },

    loaded(){
        this.undisplayElement(this.divLoading);
        this.displayElement(this.audioPlayer, "flex");
    },

    showRecents(allWords){
        let div = this.recents.querySelector("div");
        this.displayElement(this.recents, "flex");
        this.recents.querySelector("button").addEventListener("click", () => {
            this.undisplayElement(this.recents);
        })

        this.undisplayElement(div, true);

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
    
        this.displayElement(this.wordDisplay, "flex");
        this.undisplayElement(div, true);
        this.innerElement(div, "h1", word);
        this.innerElement(div, "p", text);
    
        window.addEventListener("click", e => {
            if(e.target.classList.contains("wordDisplay")) {
                this.undisplayElement(this.wordDisplay);
            }
        })
    },

    displayBtnAll(){
        this.displayElement(this.btnViewAll, "initial");
    },

    playAudio(){
        console.log("audio play");

        try{
            this.audio.play().catch(error => {
                console.log("Erro ao tentar reproduzir o áudio:", error.message);
            });
        }catch(error){
            console.log(error.message);
        }

    },

    undisplayElement(element, innner = false){
        if(innner){
            element.innerHTML = "";
        }else{
            element.style.display = "none";
        }
        
    },

    displayElement(element, value){
        element.style.display = value;
    },

    innerElement(element, type, value){
        let create = document.createElement(type);
        create.innerHTML = value;
        element.appendChild(create);
    }
}

export { Dom };