const randomColor = () => {
  const hex = "012345689ABCDEF";
  color = "#";
  for (let i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 16);
  }
  return color;
};

let colorRef;

const startChangingColor = () => {
  const changeColor = () => {
    document.body.style.backgroundColor = randomColor();
  };
  if (!colorRef) {
    colorRef = setInterval(changeColor, 1000);
  }
};

const stopChangingColor = () => {
  clearInterval(colorRef);
  colorRef = null;
};

document.querySelector("#start").addEventListener("click", startChangingColor);
document.querySelector("#stop").addEventListener("click", stopChangingColor);
