getWordDetails("serene")

function getWordDetails(word) {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((res) => res.json())
    .then((data) => {
        // word
        console.log(`Word: ${data[0].word}`)

        // audio 

        // phonetic
        console.log(`Phonetic: ${data[0].phonetic}`)

        // word type (array)
            // meaning (array)
                // examples (array)
        data[0].meanings.forEach(e => console.log(`Word Type: ${e.partOfSpeech}`))
    });
}


