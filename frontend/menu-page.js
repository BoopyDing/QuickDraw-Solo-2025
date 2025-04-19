let title = document.getElementById("title");
let titleWords = "Quickdraw";

const sleepNow = (delay) =>
  new Promise((resolve) => setTimeout(resolve, delay));

async function typeEffect(element, words) {
  for (let i = 0; i < words.length; i++) {
    let delay = Math.floor(Math.random() * 200) + 200;
    await sleepNow(delay);
    element.textContent += words.charAt(i);
  }
}
typeEffect(title, titleWords);
