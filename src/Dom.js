const Dom = {
    result: document.querySelector(".result"),
    divLoading: document.querySelector(".loading"),
    recents: document.querySelector(".recents"),
    wordDisplay: document.querySelector(".wordDisplay"),
    btnViewAll: document.querySelector(".btnViewAll"),
    audio: document.querySelector("audio"),
    audioPlayer: document.querySelector(".audio-player"),
    addResult(word, text, partOf, synon, audioSrc){
        console.log(audioSrc);
        this.loaded();
        this.audio.src = audioSrc;

        this.audio.addEventListener('error', () => {
            console.error("Erro ao carregar o áudio: Fonte não suportada ou inválida.");
            this.audioPlayer.style.display = "none";
        });


        this.result.innerHTML = `
            <h1>${word}</h1>
            <h2>${partOf}</h2>

            <p>${text}</p>


            <h3>${synon}</h3>
        `;
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
        this.result.innerHTML = "";
        this.divLoading.style.display = "flex";
        this.audioPlayer.style.display = "none";
    },
    loaded(){
        this.divLoading.style.display = "none";
        this.audioPlayer.style.display = "flex";
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
        try{
            this.audio.play().catch(error => {
                console.log("Erro ao tentar reproduzir o áudio:", error.message);
            });
        }catch(error){
            console.log(error.message);
        };
    }
}

export { Dom };