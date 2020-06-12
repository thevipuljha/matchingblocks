const elementById = (id) => document.getElementById(id);
const elementsByclass = (className) => document.getElementsByClassName(className);
const themeList = ["Ben", "Cartoons", "Cricketers", "DC", "Default", "Marvel", "Pokemon", "Programming", "TechBrands"];
const getThemeName = () => localStorage.getItem("theme") || "Default";
const getColor = () => localStorage.getItem("color") || "#1E90FF";
const getTotalWinCount = () => localStorage.getItem("winCount") || 0;
const showThemeName = () => elementById("currentThemeName").innerText = getThemeName();
const showTotalWinCount = () => elementById("totalWinCount").innerText = getTotalWinCount();
const addEvent = (element, event, task) => element.setAttribute(event, task);
const getBlocks = () => elementsByclass("block-button");
const setBackground = (element, image) => element.style.backgroundImage = image;
const isPairFound = () => imageList[secondTileIndex] == imageList[firstTileIndex];
const themeSelectorVisibility = (value) => elementById("themeSelector").style.visibility = value;
let tileClickCount, firstTileIndex, secondTileIndex, totalScore;
let imageList = getThemeImageList();

// toggling theme selectors div on theme button click
function toggleThemeSelectors() {
    if (elementById("themeSelector").style.visibility == "visible") {
        themeSelectorVisibility("hidden");
    } else {
        themeSelectorVisibility("visible");
    }
}

//  changing theme to selected theme
function changeTheme(theme) {
    localStorage.setItem("theme", theme);
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
    blocks[firstTileIndex].disabled = true;
    blocks[secondTileIndex].disabled = true;
    blocks[firstTileIndex].innerHTML = "&checkmark;";
    blocks[secondTileIndex].innerHTML = "&checkmark;";
}

// task to perform on blocks paired 
function pairFound() {
    totalScore++;
    makeBlocksPaired();
    if (totalScore == 10) {
        localStorage.setItem("winCount", Number(getTotalWinCount()) + 1)
        startNewGame();
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
    tileClickCount = (tileClickCount + 1) % 2;
}

// creating shuffled list of image paths according to theme
function getThemeImageList() {
    const themeName = getThemeName();
    let imageList = [];
    for (let index = 0; index < 10; index++) {
        imageList.push(`url(images/${themeName}/image${index}.png)`);
        imageList.push(`url(images/${themeName}/image${index}.png)`);
    }
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
    }
    tileClickCount = 0;
    firstTileIndex = 0;
    secondTileIndex = 0;
    totalScore = 0;
    imageList = getThemeImageList();
    showThemeName();
    showTotalWinCount();
    elementById("colorButton").value = getColor();
}

// adding eventListeners to html elements
function addEventListeners() {
    addEvent(elementById("newGameButton"), "onclick", "startNewGame()");
    addEvent(elementById("colorButton"), "onchange", "changeBlocksColor(this.value)");
    addEvent(elementById("themeButton"), "onclick", "toggleThemeSelectors()");
}
// adding pictures and event handlers on themeselector buttons
function setThemeSelectors() {
    const themeButtons = elementsByclass("theme-pic");
    for (let index = 0; index < themeButtons.length; index++) {
        const themeButton = themeButtons[index];
        themeButton.style.backgroundImage = `url(images/${themeButton.id}/image0.png)`;
        themeButton.setAttribute("onclick", "changeTheme(this.title)");
    }
}

//creating blocks for the game
const createBlocks = () => {
    const blocksContainer = elementById("blocksContainer");
    for (let index = 0; index < 20; index++) {
        let newBlock = document.createElement("button");
        newBlock.className = "block-button";
        newBlock.setAttribute("onclick", `blockClicked(${index})`);
        newBlock.style.backgroundColor = getColor();
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