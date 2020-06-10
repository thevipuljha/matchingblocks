const elementById = (id) => document.getElementById(id);
const elementsByclass = (className) => document.getElementsByClassName(className);
const themeList = ["Default", "Ben", "Cartoons", "DC", "Marvel", "Pokemon", "Programming", "TechBrands"];

function setThemePics() {
    const themeButtons = elementsByclass("theme-pic");
    for (let index = 0; index < themeButtons.length; index++) {
        const theme = themeButtons[index].id;
        const imagepath = `url(images/${theme}/image0.png)`
        themeButtons[index].style.backgroundImage = imagepath;
    }
}


const createBlocks = () => {
    const blocksContainer = elementById("blocksContainer");
    for (let index = 0; index < 20; index++) {
        let newBlock = document.createElement("button");
        newBlock.className = "block-button";
        newBlock.id = "blockButton" + (index + 1);
        newBlock.style.backgroundImage = 'url("images/Default/image0.png")';
        blocksContainer.appendChild(newBlock);
    }
};
// initial function to run on page load
const initiate = () => {
    createBlocks();
    setThemePics();
};

window.onload = initiate;