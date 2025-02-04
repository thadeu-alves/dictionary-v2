const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const input = document.querySelector(".word");
const button = document.querySelector(".btnSearch");
const form = document.querySelector(".form");
const result = document.querySelector(".result");

input.addEventListener("keypress", e => {
    if (e.key === 'Enter') {
        search();
    }
})

button.addEventListener("click", () => search());

async function search(){
    if (input.value != "") {
        loading()
        form.classList.add("searched");
        var data =  await getSign(input.value);
        var text = data[0].meanings[0].definitions[0].definition;
        addText(text);
        input.value = "";
    }
}

function loading(){
    result.innerHTML = "LOADING";
}

async function getSign(word) {
    const data = await fetch(API_URL + word);
    const response = await data.json();
    return response;
}

function addText(text){
    result.innerHTML = `<p>${text}</p>`;
    typeWriterEffect(result, text, text.length);
}

function typeWriterEffect(element, text) {
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
}