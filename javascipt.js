const elementById = (id) => document.getElementById(id);
const elementsByclass = (className) => document.getElementsByClassName(className);
const themeList = ["Default", "Ben", "Cartoons", "DC", "Marvel", "Pokemon", "Programming", "TechBrands"];

const createBlocks = () => {
    const blocksContainer = elementById("blocksContainer");
    for (let index = 0; index < 20; index++) {
        let newBlock = document.createElement("button");
        newBlock.className = "block-button";
        newBlock.id = "blockButton" + (index + 1);
        newBlock.style.backgroundImage = 'url("images/Default/image0.png")';
        blocksContainer.appendChild(newBlock);
    }
}
// initial function to run on page load
const initiate = () => {
    createBlocks();
};

window.onload = initiate;