const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const input = document.querySelector(".word");

const btnSearch = document.querySelector(".btnSearch");
const btnViewAll = document.querySelector(".btnViewAll");

const form = document.querySelector(".form");
const result = document.querySelector(".result");
const recents =  document.querySelector(".recents");
const wordDisplay = document.querySelector(".wordDisplay");

var allWords = []


input.addEventListener("keypress", e => {
    if (e.key === 'Enter') {
        search();
    }
})

btnSearch.addEventListener("click", () => search());
btnViewAll.addEventListener("click", () => viewAll());

async function search(){
    if (input.value != "") {
        loading()
        form.classList.add("searched");
        var data =  await getSign(input.value);
        var text = data[0].meanings[0].definitions[0].definition;
        addText(text);
        addWord(text, input.value);
        input.value = "";
    }
}

function viewAll(){
    var div = recents.querySelector("div");
    recents.style.display = "flex";
    recents.querySelector("button").addEventListener("click", () => {
        recents.style.display = "none";
    })

    div.innerHTML = "";

    allWords.map(e => {
        let p = document.createElement("p");
        p.innerHTML = e.word;
        p.addEventListener("click", () => {
            showWord(e.id);
        })
        div.appendChild(p);
    })
}

function loading(){
    result.innerHTML = "LOADING <div>...</div>";
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

function addWord(text, word){
    allWords.push({
        word,
        text,
        id: allWords.length,
    });
    console.log(allWords);
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

function showWord(id) {
    let word = allWords[id].word;
    let text = allWords[id].text;
    let div = wordDisplay.querySelector("div");

    wordDisplay.style.display = "flex";
    div.innerHTML = "";
    div.innerHTML = `<h1>${word}</h1>
            <p>${text}</p>`;

    window.addEventListener("click", e => {
        if(e.target.classList.contains("wordDisplay")) {
            wordDisplay.style.display = "none";
        }
    })
}