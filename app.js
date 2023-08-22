const fromLang = document.querySelector("#from-lang");
const toLang = document.querySelector("#to-lang");
const btnTranslate = document.querySelector("#btnTranslate");
const fromText = document.querySelector("#from-text");
const toText = document.querySelector("#to-text");

const exchange = document.querySelector(".exchange");

const icons = document.querySelectorAll(".icons");

for(let lang in languages) {
    let option = `<option value="${lang}">${languages[lang]}</option>`
    /*select kutularımıza dilleri eklemek*/
    fromLang.insertAdjacentHTML("beforeend", option);
    toLang.insertAdjacentHTML("beforeend", option);

    /* başlangıç değeri olarak TR-EN */
    fromLang.value = "tr-TR";
    toLang.value = "en-GB";
}
/* ÇEVİRİ  */
btnTranslate.addEventListener("click", () => {
    let text = fromText.value;
    let from = fromLang.value;
    let to = toLang.value;

    const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${from}|${to}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            toText.value = data.responseData.translatedText;
        })
})

/* EXCHANGE İŞLEMİ */
exchange.addEventListener("click", ()=> {
    let text = fromText.value;
    fromText.value = toText.value;
    toText.value= text ;

    let lang = fromLang.value;
    fromLang.value = toLang.value;
    toLang.value =  lang;
})

/* İCONS */

for(let icon of icons){
    icon.addEventListener("click", (element)=> {
        if(element.target.classList.contains("fa-copy")){
            if(element.target.id == "from"){
                navigator.clipboard.writeText(fromText.value);
            }else{
                navigator.clipboard.writeText(toText.value);
            }
        }else{
            let utterance;
            if(element.target.id == "from"){
                utterance = new SpeechSynthesisUtterance(fromText.value);           /*seslendireceği metini belirleme*/
                utterance.lang = fromLang.value;                                    /*seslendirme dilini belirleme*/
            }else{
                utterance = new SpeechSynthesisUtterance(toText.value); 
                utterance.lang = toLang.value;
            }
            speechSynthesis.speak(utterance)              /* seslendirmenin yapılması */
        }
    })
}