
const color = document.getElementById("color");
alert(document.cookie);
const target = document.getElementById("result");

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }  

color.onclick = () => {
    target.style.color = `rgb(${getRandomInt(255)}, ${getRandomInt(255)}, ${getRandomInt(255)})`;
}
