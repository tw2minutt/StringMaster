//my-info.html
//chay 1 lan thoi ? cho chay lai thi sao
let tagline = document.getElementById("tagline");
const text = "Front-end Developer ";
let i = 0;
function typing() {
  if (i < text.length) {
    tagline.style.color = "#34B0EA";
    tagline.innerHTML += text.charAt(i);
    i++;
    setTimeout(typing, 50);
  }
}
typing();

