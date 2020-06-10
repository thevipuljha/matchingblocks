const elementById = (id) => document.getElementById(id);
const elementsByclass = (className) => document.getElementsByClassName(className);
const themeList = ["Default", "Ben", "Cartoons", "DC", "Marvel", "Pokemon", "Programming", "TechBrands"];
const getThemeName = () => localStorage.getItem("theme") || "Default";
let tileClickCount = 0,
    firstTileIndex = null,
    secondTileIndex = null,
    totalScore = 0;
let imageList = getThemeImageList(getThemeName());
const isPairFound = () => imageList[secondTileIndex] == imageList[firstTileIndex];



// setting images on blocks according to theme
// function setThemePicOnBlocks(imageList) {
//     const blockButtons = elementsByclass("block-button");
//     for (let index = 0; index < 20; index++) {
//         blockButtons[index].style.backgroundImage = imageList[index];
//     }
// }
// creating shuffled imageList for a theme
function setButtonImageOnClick() {
    const blocks = elementsByclass("block-button");
    for (let index = 0; index < blocks.length; index++) {
        blocks[index].style.backgroundImage = "none";
    }
    if (tileClickCount == 1) {
        blocks[firstTileIndex].style.backgroundImage = imageList[firstTileIndex];
    }
    blocks[secondTileIndex].style.backgroundImage = imageList[secondTileIndex];
}

function setPairedButtonsOff() {
    elementsByclass("block-button")[firstTileIndex].style.backgroundImage = imageList[firstTileIndex];
    elementsByclass("block-button")[secondTileIndex].style.backgroundImage = imageList[secondTileIndex];
    elementsByclass("block-button")[firstTileIndex].disabled = true;
    elementsByclass("block-button")[secondTileIndex].disabled = true;
}

function secondBlockClicked() {
    elementsByclass("block-button")[firstTileIndex].style.backgroundImage = "none";
    elementsByclass("block-button")[secondTileIndex].style.backgroundImage = "none";
    if (isPairFound()) {
        totalScore++;
        setPairedButtonsOff();
        if (score == 10) {
            resetGame();
        }
    }
}

function getThemeImageList(themeName) {
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
// adding pictures and event handlers on themeselectors buttons
function setThemeSelectors() {
    const themeButtons = elementsByclass("theme-pic");
    for (let index = 0; index < themeButtons.length; index++) {
        const themeButton = themeButtons[index];
        themeButton.id = themeList[index];
        themeButton.style.backgroundImage = `url(images/${themeButton.id}/image0.png)`;
        // themeButton.setAttribute("onclick", "localStorage.setItem('theme',this.id)");
    }
}

function blockClicked(clickedButton, clickedIndex) {
    if (tileClickCount == 0) {
        firstTileIndex = clickedIndex;
    }
    secondTileIndex = clickedIndex;
    if (firstTileIndex == secondTileIndex) {
        tileClickCount = 0;
    }
    setButtonImageOnClick();
    if (tileClickCount == 1) {
        secondBlockClicked();
    }
    tileClickCount = (tileClickCount + 1) % 2;
}
//creating blocks for the game
const createBlocks = () => {
    const blocksContainer = elementById("blocksContainer");
    for (let index = 0; index < 20; index++) {
        let newBlock = document.createElement("button");
        newBlock.className = "block-button";
        newBlock.setAttribute("onclick", `blockClicked(this,${index})`);
        blocksContainer.appendChild(newBlock);
    }
};
const resetGame = () => {
    tileClickCount = 0,
        firstTileIndex = null,
        secondTileIndex = null,
        totalScore = 0;
    imageList = getThemeImageList(getThemeName());
}
// initial function to run on page load
const initiate = () => {
    createBlocks();
    setThemeSelectors();
};

window.onload = initiate;