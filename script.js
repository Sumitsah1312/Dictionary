const form = document.querySelector("form");
const words = document.querySelector(".word");
const partOfSpeech = document.querySelector(".partOfSpeech");
const meaning = document.querySelector(".meaning");
const synonymn = document.querySelector(".synonymn");
const antonymn = document.querySelector(".antonymn");
const example = document.querySelector(".example");
const button = document.querySelector(".btn");
const result = document.querySelector(".result");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWordInfo(form.elements[0].value);
  // document.querySelector('.btn').style.b';
});

const getWordInfo = async (word) => {

// Agar answer nhi aaya to user to batao
  try {
    // result.innerHTML="Fetching Data ......";
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
    const data = await response.json();
    console.log(data);
    let definitions = data[0].meanings[0].definitions[0];
   
    words.innerHTML = `<h1><strong> ${data[0].word} ------ :  </strong></h1>  <img src="speaker.png" class="speak" alt="">  `;
  
    partOfSpeech.innerHTML = `${data[0].meanings[0].partOfSpeech}`;
    meaning.innerHTML = `<strong>Meaning : </strong><p>${
      definitions.definition === undefined ? "Not Found" : definitions.definition
    }</p>`;
    example.innerHTML = `<strong>Example : </strong><p>${
      definitions.example === undefined ? "Not Found" : definitions.example
    }</p>`;
    synonymn.innerHTML = `<strong>Synonymn : </strong><p>${
      ((data[0].meanings[0].synonyms === undefined)||data[0].meanings[0].synonyms === "")
        ? "Not Found"
        : data[0].meanings[0].synonyms
    }</p>`;
    antonymn.innerHTML = `<strong>Antonymn : </strong><p>${
      data[0].meanings[0].antonyms.length === 0
        ? "Not Found"
        : data[0].meanings[0].antonyms
    }</p>`;
  
    button.innerHTML=`<a href="${data[0].sourceUrls}" target="_blank">Read More</a>`
    
  
  } catch (error) {
    result.innerHTML=`Sorry ${word} Word is not Found`;
  }
 };
