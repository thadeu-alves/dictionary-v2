const Dom = {
    result: document.querySelector(".result"),
    divLoading: document.querySelector(".loading"),
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