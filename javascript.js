const elementById = (id) => document.getElementById(id);
const elementsByclass = (className) =>
  document.getElementsByClassName(className);
const addEvent = (element, event, task) => element.setAttribute(event, task);
const themeList = [
  "Ben 10",
  "Cartoons",
  "Cricketers",
  "DC Comics",
  "Default",
  "Marvels",
  "Pokemon",
  "Programming",
  "Tech Brands",
];
const getThemeId = (index) => themeList[index].split(" ").join("-");
const getThemeName = () => localStorage.getItem("theme") || "Default";
const showThemeName = () =>
  (elementById("currentThemeName").innerText = getThemeName()
    .split("-")
    .join(" "));
const getColor = () => localStorage.getItem("color") || "#1E90FF";

const getBestClickCount = () => localStorage.getItem("bestClick") || "NA";
const getTotalWinCount = () => localStorage.getItem("winCount") || 0;
const showTotalWinCount = () =>
  (elementById("totalWinCount").innerText = getTotalWinCount());
const showBestClickCount = () =>
  (elementById("bestClick").innerText = getBestClickCount());
const showClickCount = () =>
  (elementById("currentClicks").innerText = totalClickCount);
const getBlocks = () => elementsByclass("block-button");
const setBackground = (element, image) =>
  (element.style.backgroundImage = image);
const isPairFound = () =>
  imageList[secondTileIndex] == imageList[firstTileIndex];
let tileClickCount,
  firstTileIndex,
  secondTileIndex,
  totalScore,
  totalClickCount;
let imageList = [];

const removePopup = () =>
  elementsByclass("popup-container")[0].classList.remove("show-popup");

const createElement = (tag, id, classname, task, bgColor) => {
  const newElement = document.createElement(tag);
  if (id) newElement.id = id;
  if (classname) newElement.className = classname;
  if (task) newElement.setAttribute("onclick", task);
  if (bgColor) newElement.style.backgroundColor = bgColor;
  return newElement;
};

const showToast = (message) => {
  elementsByclass("popup-container")[1].classList.toggle("show-popup");
  if (message) elementById("toast").innerText = message;
};
const hideToast = () =>
  elementsByclass("popup-container")[1].classList.remove("show-popup");

// toggling theme selectors div on theme button click
function toggleThemeSelectors() {
  elementsByclass("popup-container")[0].classList.add("show-popup");
}

//  changing theme to selected theme
function changeTheme(theme) {
  localStorage.setItem("theme", theme);
  removePopup();
  startNewGame();
}
// changing blocks color according to selected color
function changeBlocksColor(selectedColor) {
  localStorage.setItem("color", selectedColor);
  const blocks = elementsByclass("block-button");
  for (let index = 0; index < blocks.length; index++) {
    blocks[index].style.backgroundColor = selectedColor;
  }
}

// making paired blocks different from different from others
function makeBlocksPaired() {
  const blocks = getBlocks();
  blocks[firstTileIndex].style.visibility = "hidden";
  blocks[secondTileIndex].style.visibility = "hidden";
  setSelectedButtonImagesOff();
}

// task to perform on blocks paired
function pairFound() {
  totalScore++;
  makeBlocksPaired();
  if (totalScore == 10) {
    localStorage.setItem("winCount", Number(getTotalWinCount()) + 1);
    showToast("Yay! You Won in " + totalClickCount + " moves");
    if (
      getBestClickCount() > tileClickCount ||
      !localStorage.getItem("bestClick")
    )
      localStorage.setItem("bestClick", totalClickCount);
    setTimeout(() => {
      hideToast();
      startNewGame();
    }, 3000);
  }
}

// remove background image from current clicked blocks
function setSelectedButtonImagesOff() {
  const blocks = getBlocks();
  setBackground(blocks[secondTileIndex], "none");
  setBackground(blocks[firstTileIndex], "none");
}
// setting corresponding image on block on click
function setButtonImagesOnClick() {
  const blocks = getBlocks();
  if (tileClickCount == 1) {
    setBackground(blocks[secondTileIndex], imageList[secondTileIndex]);
  }
  setBackground(blocks[firstTileIndex], imageList[firstTileIndex]);
}

// this block of code run on blocks click
function blockClicked(clickedIndex) {
  setSelectedButtonImagesOff();
  if (tileClickCount == 0) {
    firstTileIndex = clickedIndex;
  }
  secondTileIndex = clickedIndex;
  if (firstTileIndex == secondTileIndex) {
    tileClickCount = 0;
  }
  setButtonImagesOnClick();
  if (tileClickCount == 1 && isPairFound()) {
    pairFound();
  }
  if (tileClickCount == 1) {
    setTimeout(() => setSelectedButtonImagesOff(), 200);
  }
  totalClickCount++;
  showClickCount();
  tileClickCount = (tileClickCount + 1) % 2;
}

// creating shuffled list of image paths according to theme
function getThemeImageList() {
  const themeName = getThemeName();
  let imageList = [];
  for (let index = 0; index < 10; index++)
    for (let i = 0; i < 2; ++i)
      imageList.push(`url(images/${themeName}/image${index}.png)`);

  for (let i = 19; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = imageList[i];
    imageList[i] = imageList[j];
    imageList[j] = temp;
  }
  return imageList;
}

//starting or building new game
const startNewGame = () => {
  const blocks = getBlocks();
  for (let index = 0; index < blocks.length; index++) {
    blocks[index].disabled = false;
    setBackground(blocks[index], "none");
    blocks[index].innerText = "";
    blocks[index].style.visibility = "visible";
  }
  tileClickCount = 0;
  firstTileIndex = 0;
  secondTileIndex = 0;
  totalScore = 0;
  totalClickCount = 0;
  imageList = getThemeImageList();
  showThemeName();
  showTotalWinCount();
  showBestClickCount();
  showClickCount();
  elementById("colorButton").value = getColor();
  showToast("Welcome! to Matching Blocks");
  setTimeout(() => {
    hideToast();
  }, 2500);
};

// adding eventListeners to html elements
function addEventListeners() {
  addEvent(elementById("newGameButton"), "onclick", "startNewGame()");
  addEvent(
    elementById("colorButton"),
    "onchange",
    "changeBlocksColor(this.value)"
  );
  addEvent(elementById("themeButton"), "onclick", "toggleThemeSelectors()");
  window.onclick = function (event) {
    if (event.target == elementsByclass("popup-container")[0]) removePopup();
    if (event.target == elementsByclass("popup-container")[1]) hideToast();
  };
}
// adding pictures and event handlers on themeselector buttons
function setThemeSelectors() {
  const themeSelector = elementById("themeSelector");
  for (let index = 0; index < themeList.length; index++) {
    let newDiv = createElement("div");
    const themeId = getThemeId(index);
    let newButton = createElement(
      "button",
      themeId,
      "theme-pic",
      `changeTheme("${themeId}")`,
      0
    );
    newButton.style.backgroundImage = `url(images/${newButton.id}/image0.png)`;
    let newLable = document.createElement("label");
    newLable.setAttribute("for", themeId);
    newLable.innerHTML = themeList[index];
    newDiv.appendChild(newButton);
    newDiv.appendChild(newLable);
    themeSelector.appendChild(newDiv);
  }
}

//creating blocks for the game
const createBlocks = () => {
  const blocksContainer = elementById("blocksContainer");
  for (let index = 0; index < 20; index++) {
    let newBlock = createElement(
      "button",
      0,
      "block-button",
      `blockClicked(${index})`,
      getColor()
    );
    blocksContainer.appendChild(newBlock);
  }
};

// initial function to run on page load completion
const initiate = () => {
  createBlocks();
  setThemeSelectors();
  addEventListeners();
  startNewGame();
};

window.onload = initiate;
