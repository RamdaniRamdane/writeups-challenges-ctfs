alert(document.cookie);
const word = document.getElementById("word");
const res = document.getElementById("result");

if(document.location.hash.split("#")[1] != undefined){
    res.innerHTML = decodeURI(document.location.hash.split("#")[1]).replace("<", "&lt;").replace(">", "&gt;");
}

window.onhashchange = () => {
    let h = document.location.hash.split("#")[1];

    if(h != undefined){
        res.innerHTML = decodeURI(h);
    }
    else{
        res.innerHTML = "";
    }
}

word.oninput = () => {
   document.location.hash = word.value;
}
