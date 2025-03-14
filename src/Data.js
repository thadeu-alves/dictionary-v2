import {Dom} from "./Dom.js";

const Data = {
    API_URL: "https://api.dictionaryapi.dev/api/v2/entries/en/",

    async search(word){
        try {
            Dom.loading();
            let data = await this.getData(word);
            if(!data){
                console.log("deu ruim");

                this.addWord();

                return;
            }
            this.addWord(data);
        } catch (error) {
            console.log(error.message);
        }
    },

    async getData(word){
        const reponse = await fetch(this.API_URL + word);
        if(!reponse.ok){
            return false;
        }

        const data = await reponse.json();
        return data;
    },

    addWord(data){
        
        if(!data){
            this.search("undefined");
            return;
        }

        let word = data[0].word;
        let text = data[0]?.meanings[0]?.definitions[0].definition;
        let partOf = data[0]?.meanings[0]?.partOfSpeech;
        let synon = data[0].meanings[0]?.synonyms;
        let audioSrc = data[0].phonetics[0]?.audio || "";
        let canAdd = true

        let object = {
            word,
            text,
        }

        allWords.forEach(e => {
            if(e.word == word){
                console.log("true");
                canAdd = false;
            }
        })

        if(canAdd){
            allWords.push(object);
        }
        
        Dom.addResult(word, text, partOf, synon, audioSrc);
    },
}

const allWords = []

export {Data}