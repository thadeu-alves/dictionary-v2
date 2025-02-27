import {Dom} from "./Dom.js";

const Data = {
    API_URL: "https://api.dictionaryapi.dev/api/v2/entries/en/",
    async search(word){
        try {
            Dom.loading();
            let data = await this.getData(word);
            console.log(data);
            this.addWord(data);
        } catch (error) {
            console.log(error.message);
        }
    },
    async getData(word){
        const reponse = await fetch(this.API_URL + word);
        if(!reponse.ok){
            throw new Error("Undefined");
        }


        const data = await reponse.json();
        return data;
    },
    addWord(data){
        let word = data[0].word;
        let text = data[0].meanings[0].definitions[0].definition;
        let partOf = data[0].meanings[0].partOfSpeech;
        let synon = data[0].meanings[0].synonyms;
        allWords.push({
            word,
            text,
            id: allWords.length,
        });
        Dom.addResult(word, text, partOf, synon);
    },
    recents(){
        if(allWords.length > 0){
            Dom.showRecents(allWords);
        }
    }
}

const allWords = []

export {Data}