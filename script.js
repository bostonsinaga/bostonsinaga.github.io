function customIterate(count, func, retVal) {
    for (let i = 0; i < count; i++) {
        func(i);
    }
    return retVal;
}

/* PROJECTS BOARDS */

const section_projects_DOM = document.querySelector(".section-projects");

// 2D arr
let projectFrame_filedir_arr = [[], []];

for (let i = 0; i < 8; i++) {
    // KML TOWN
    projectFrame_filedir_arr[0].push(`res/frames/kml-town/${i}.${i%2 ? 'jpg':'png'}`);

    // CALLAPET
    if (i < 5) projectFrame_filedir_arr[1].push(`res/frames/games/${i}.png`);
}

// change first 'kml-town dirname' extension
projectFrame_filedir_arr[0][0] = projectFrame_filedir_arr[0][0].slice(
    0, projectFrame_filedir_arr[0][0].length - 3
);

projectFrame_filedir_arr[0][0] += 'jpg';

// 1D arr
let projectFrame_img_arr = ['', ''];

// KML TOWN
for (let i = 0; i < 8; i++) {
    projectFrame_img_arr[0] += (
        `<img src="${projectFrame_filedir_arr[0][i]}" alt="kml-town-screenshot" style="opacity: 0%"/>`
    );

    if (i < 5) {
        projectFrame_img_arr[1] += (
            `<img src="${projectFrame_filedir_arr[1][i]}" alt="callapet-screenshot" style="opacity: 0%"/>`
        );
    }
}

const projectTitle_str_arr = [
    `<a href="https://github.com/bostonsinaga/KML-TOWN" target="_blank">KML-TOWN</a> (2022)`,
    `<a href="https://play.google.com/store/apps/dev?id=7043024713824441776" target="_blank">CALLAPET</a> (2020-2021)`
];

const projectDescription_str_arr = [
    /* KML TOWN */

    "In my previous job on 2022 as Data Entry, I had a task to input coordinates from WhatsApp to Google Earth's '.kml' file " +
    "by create pins from the coordinates. Then also had to input the coordinates to spreadsheet. " +
    "This was done to find out where the stuff are placed and what the quantity and price. " +
    "It was pretty boring to repeatedly copy and paste coordinates to create pins for thousands of them. " +
    "So I decided to create CLI software named 'KML-TOWN' with C++ to automatically do the task. I developed it on my free time. " +
    "I also created small similar tools with JavaScript on browser before this (available on my GitHub). " +
    "Probably 'KML-TOWN' is not a perfect tool and hard to use, but my task was made easier and I hope other people can take advantage as well.",

    /* CALLAPET */

    "Android games I ever made that have released on Google Play Store. Sequentially named " +
    "<a href=\"https://play.google.com/store/apps/details?id=com.callapet.callamice\" target=\"_blank\">'Call a Mice'</a>, " +
    "<a href=\"https://play.google.com/store/apps/details?id=com.callapet.flyingpinball\" target=\"_blank\">'Flying Pinball'</a>, " +
    "<a href=\"https://play.google.com/store/apps/details?id=com.callapet.zombiehelicoptergap\" target=\"_blank\">'Zombie Helicopter Gap'</a>, " +
    "<a href=\"https://play.google.com/store/apps/details?id=com.callapet.flapduobirds\" target=\"_blank\">'Flap Duo Birds'</a>, " +
    "<a href=\"https://play.google.com/store/apps/details?id=com.callapet.tilesmathjumper\" target=\"_blank\">'Tiles Math Jumper'</a>. " +
    "I used Cocos2d-x the open source game engine with C++. The game apps source codes are open on my GitHub. " +
    "Creating games was the reason for me to write code. I have learned by myself from watching video tutorials, read articles and online forums."
];

for (let i = 0; i < 2; i++) {
    section_projects_DOM.innerHTML += `
        <div class="section-projects-board">
            <div class="section-projects-board-flag" style="display: none">1</div>
            <div class="section-projects-board-frames">${projectFrame_img_arr[i]}</div>
            <div class="section-projects-board-left-button"></div>
            <div class="section-projects-board-right-button"></div>
            <div class="section-projects-board-about">
                <h1 class="section-projects-board-about-title">${projectTitle_str_arr[i]}</h1>
                <div class="section-projects-board-about-description">${projectDescription_str_arr[i]}</div>
            </div>
        </div>
    `;
}

/* >>>>> arrow click */

const clickArrow = (arrowNode, valSign) => {

    const flagNode = arrowNode.parentNode.querySelector(".section-projects-board-flag");
    const framesImgNodes = arrowNode.parentNode.querySelectorAll(".section-projects-board-frames img");

    let curDex = parseInt(flagNode.innerText);
    framesImgNodes[curDex].style.opacity = '0%';
    curDex += valSign;

    if (curDex < 0 && valSign < 0) {
        curDex = framesImgNodes.length - 1;
    }
    else if (curDex > framesImgNodes.length - 1 && valSign > 0) {
        curDex = 0;
    }

    framesImgNodes[curDex].style.opacity = '100%';
    flagNode.innerText = curDex;    
}

const leftArrowNodes = document.querySelectorAll(".section-projects-board-left-button");
const rightArrowNodes = document.querySelectorAll(".section-projects-board-right-button");

// init frames visibilty
clickArrow(leftArrowNodes[0], -1); // kml-town
clickArrow(leftArrowNodes[1], -1); // callapet

for (let leftEl of leftArrowNodes) {
    leftEl.addEventListener("click", () => {clickArrow(leftEl, -1);});
}

for (let rightEl of rightArrowNodes) {
    rightEl.addEventListener("click", () => {clickArrow(rightEl, 1);});
}