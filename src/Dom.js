const Dom = {
    result: document.querySelector(".result"),
    divLoading: document.querySelector(".loading"),
    addResult(word, text, partOf, synon){
        this.loaded();
        this.result.innerHTML = `
            <h1>${word}</h1>
            <h2>${partOf}</h2>
            <p>${text}</p>
            <h3>${synon}</h3>`;
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
    },
    loaded(){
        this.divLoading.style.display = "none";
    }
}

export { Dom };