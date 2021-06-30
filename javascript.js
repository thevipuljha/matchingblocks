const elementById = (id) => document.getElementById(id);
const elementsByclass = (className) =>
  document.getElementsByClassName(className);
const getLocalData = (key) => localStorage.getItem(key);
const setLocalData = (key, value) => localStorage.setItem(key, value);
const addOnClick = (element, task) => element.setAttribute("onclick", task);
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
const getCurrentColor = () => getLocalData("color") || "#1E90FF";
const getBestClickCount = () => getLocalData("bestClick") || "NA";
const getTotalWinCount = () => getLocalData("winCount") || 0;
const getThemeName = () => getLocalData("theme") || "Default";
const setBlocksColor = () =>
  document.documentElement.style.setProperty(
    "--block-color",
    getCurrentColor()
  );

const getThemeId = (themeName) => themeName.split(" ").join("-");
const showThemeName = () =>
  (elementById("currentThemeName").innerText = getThemeName()
    .split("-")
    .join(" "));

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

const getThemeContainer = () => elementsByclass("popup-container")[0];
const getToastContainer = () => elementsByclass("popup-container")[1];

const removePopup = () => getThemeContainer().classList.remove("show-popup");

const getNewElement = (tag, id, classname) => {
  const newElement = document.createElement(tag);
  if (id) newElement.id = id;
  if (classname) newElement.className = classname;
  return newElement;
};

const showToast = (message) => {
  getToastContainer().classList.add("show-popup");
  elementById("toast").innerText = message;
};
const hideToast = () => getToastContainer().classList.remove("show-popup");

const showThemeSelectors = () =>
  getThemeContainer().classList.add("show-popup");

//  changing theme to selected theme
function changeTheme(theme) {
  console.log(theme);
  setLocalData("theme", theme);
  removePopup();
  startNewGame();
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
    }, 2500);
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

function setUpGame() {
  tileClickCount =
    firstTileIndex =
    secondTileIndex =
    totalScore =
    totalClickCount =
      0;
  showThemeName();
  showTotalWinCount();
  showBestClickCount();
  showClickCount();
  imageList = getThemeImageList();
}

//starting or building new game
const startNewGame = () => {
  const blocks = getBlocks();
  setUpGame();
  for (let index = 0; index < blocks.length; index++) {
    blocks[index].style.visibility = "visible";
    setBackground(blocks[index], imageList[index]);
    setBackground(blocks[index], "none");
  }
  elementById("colorButton").value = getCurrentColor();
  showToast("Welcome! to Matching Blocks");
  setTimeout(hideToast, 2500);
};

// changing blocks color according to selected color
function changeBlocksColor(selectedColor) {
  setLocalData("color", selectedColor);
  setBlocksColor();
}

// adding eventListeners to html elements
function addEventListeners() {
  addOnClick(elementById("newGameButton"), "startNewGame()");
  addOnClick(elementById("themeButton"), "showThemeSelectors()");
  elementById("colorButton").setAttribute(
    "onchange",
    "changeBlocksColor(this.value)"
  );
  window.onclick = (event) => {
    if (event.target == getThemeContainer()) removePopup();
    if (event.target == getToastContainer()) hideToast();
  };
}

// Return new theme button with image and event handler
function getNewThemeButton(themeId) {
  let newButton = getNewElement("button", themeId, "theme-button");
  addOnClick(newButton, `changeTheme("${themeId}")`);
  newButton.style.backgroundImage = `url(images/${themeId}/image0.png)`;
  return newButton;
}

// adding button for theme in themeselector option
function setThemeSelectors() {
  const themeSelector = elementById("themeSelector");
  for (let index = 0; index < themeList.length; index++) {
    const newDiv = getNewElement("div");
    const currentTheme = themeList[index];
    const themeId = getThemeId(currentTheme);
    const newButton = getNewThemeButton(themeId);
    const newLable = getNewElement("label");
    newLable.setAttribute("for", themeId);
    newLable.innerHTML = currentTheme;
    newDiv.appendChild(newButton);
    newDiv.appendChild(newLable);
    themeSelector.appendChild(newDiv);
  }
}

//creating empty blocks for the game
const createBlocks = () => {
  const blocksContainer = elementById("blocksContainer");
  setBlocksColor();
  for (let index = 0; index < 20; index++) {
    let newBlock = getNewElement("button", 0, "block-button");
    addOnClick(newBlock, `blockClicked(${index})`);
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
