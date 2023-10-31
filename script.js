const word_DOM = document.querySelector(".word");
const phonetic_DOM = document.querySelector(".phonetic");
const wordDetailBox_DOM = document.querySelector(".word-details");
const mainForm = document.querySelector(".box form");

mainForm.querySelector("button").addEventListener("click", e => {
    e.preventDefault()
    const searchedWord = mainForm.querySelector("input").value
    getWordDetails(searchedWord);
})




function getWordDetails(word) {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Word not found (Status Code: ${res.status})`);
      }
      return res.json();
    })
    .then((data) => {
      word_DOM.textContent = data[0].word;
      phonetic_DOM.textContent = data[0].phonetic;
      data[0].meanings.forEach((e) => {
        showContent(e)
      });
    })
    .catch((error) => {
      console.log(error);
    });
}




// Create "word detail box" template
function showContent(wordDetails) {
    // Get Template
    let temp = document.querySelector(".word-details-template");
    const clone = document.importNode(temp.content, true);
    // Place new text into template 
    const wordType_DOM = clone.querySelector(".word-type");
    wordType_DOM.textContent = wordDetails.partOfSpeech
    // Create multiple definition in HTML p tag and put them into "HTML definition box"
    wordDetails.definitions.forEach((e) =>{
        const newP = document.createElement("p")
        newP.classList.add("definition")
        newP.textContent = `+) ${e.definition}`
        const definitionBox_DOM = clone.querySelector(".definition-box");
        definitionBox_DOM.appendChild(newP)
    });
    // Append new template
    document.querySelector(".box__container2").appendChild(clone)
}




/*
    Notes:
    
    + Bug: it does not remove the old "word detail" box when search for a new word

    + Bug: Notification when not finding the right word 

*/
