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
        `<img src="${projectFrame_filedir_arr[0][i]}" alt="kml-town-screenshot" style="display: none" class="img-normal"/>`
    );

    if (i < 5) {
        projectFrame_img_arr[1] += (
            `<img src="${projectFrame_filedir_arr[1][i]}" alt="callapet-screenshot" style="display: none" class="img-normal"/>`
        );
    }
}

const projectTitle_str_arr = [
    `<a href="https://github.com/bostonsinaga/KML-TOWN">KML-TOWN</a> (2022)`,
    `<a href="https://play.google.com/store/apps/dev?id=7043024713824441776">CALLAPET</a> (2020-2021)`
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
    "<a href=\"https://play.google.com/store/apps/details?id=com.callapet.callamice\">'Call a Mice'</a>, " +
    "<a href=\"https://play.google.com/store/apps/details?id=com.callapet.flyingpinball\">'Flying Pinball'</a>, " +
    "<a href=\"https://play.google.com/store/apps/details?id=com.callapet.zombiehelicoptergap\">'Zombie Helicopter Gap'</a>, " +
    "<a href=\"https://play.google.com/store/apps/details?id=com.callapet.flapduobirds\">'Flap Duo Birds'</a>, " +
    "<a href=\"https://play.google.com/store/apps/details?id=com.callapet.tilesmathjumper\">'Tiles Math Jumper'</a>. " +
    "I used Cocos2d-x the open source game engine with C++. The game apps source codes are open on my GitHub. " +
    "Creating games was the reason for me to write code. I have learned by myself from watching video tutorials, read articles and online forums."
];

for (let i = 0; i < 2; i++) {
    section_projects_DOM.innerHTML += `
        <div class="section-projects-board">
            <div class="section-projects-board-flag" style="display: none">1</div>
            <a class="section-projects-board-frames section-projects-board-frames-normal">
                <div class="section-projects-board-frames-left-button section-projects-board-frames-left-button-normal"></div>
                <div class="section-projects-board-frames-right-button section-projects-board-frames-right-button-normal"></div>
                ${projectFrame_img_arr[i]}
            </a>
            <div class="section-projects-board-about">
                <h1 class="section-projects-board-about-title">${projectTitle_str_arr[i]}</h1>
                <div class="section-projects-board-about-description">${projectDescription_str_arr[i]}</div>
            </div>
        </div>
    `;
}

/* >>>>> arrow click */

const clickArrow = (arrowNode, valSign) => {

    // arrow -> frames -> board
    const flagNode = arrowNode.parentNode.parentNode.querySelector(".section-projects-board-flag");
    const framesImgNodes = arrowNode.parentNode.parentNode.querySelectorAll(".section-projects-board-frames img");

    let curDex = parseInt(flagNode.innerText);
    framesImgNodes[curDex].style.display = "none";
    curDex += valSign;

    if (curDex < 0 && valSign < 0) {
        curDex = framesImgNodes.length - 1;
    }
    else if (curDex > framesImgNodes.length - 1 && valSign > 0) {
        curDex = 0;
    }

    framesImgNodes[curDex].style.display = "block";
    flagNode.innerText = curDex;
}

const leftArrowNodes = document.querySelectorAll(".section-projects-board-frames-left-button");
const rightArrowNodes = document.querySelectorAll(".section-projects-board-frames-right-button");

// init frames visibilty
clickArrow(leftArrowNodes[0], -1); // kml-town
clickArrow(leftArrowNodes[1], -1); // callapet

for (let leftEl of leftArrowNodes) {
    leftEl.addEventListener("click", (event) => {
        event.stopPropagation();
        event.preventDefault();
        clickArrow(leftEl, -1);
    });
}

for (let rightEl of rightArrowNodes) {
    rightEl.addEventListener("click", (event) => {
        event.stopPropagation();
        event.preventDefault();
        clickArrow(rightEl, 1);
    });
}

function setBoardFrameLink(frameNode, isInsert) {

    let boardFramesCtr = 0;
    let boardFramesImg_links = [
        "https://github.com/bostonsinaga/KML-TOWN",
        "https://play.google.com/store/apps/dev?id=7043024713824441776"
    ];

    if (frameNode) {
        if (isInsert) {
            for (let testNode of document.querySelectorAll(".section-projects-board-frames")) {
                if (testNode == frameNode) {
                    testNode.href = boardFramesImg_links[boardFramesCtr];
                    break;
                }
                boardFramesCtr++;
            }
        }
        else frameNode.removeAttribute("href");
    }
    else {
        if (isInsert) {
            for (let node of document.querySelectorAll(".section-projects-board-frames")) {
                node.href = boardFramesImg_links[boardFramesCtr];
                boardFramesCtr++;
            }
        }
        else {
            for (let node of document.querySelectorAll(".section-projects-board-frames")) {
                node.removeAttribute("href");
            }
        }
    }
}

let isEnlarged = false;

// click board frames to enlarge images
for (let frameNode of document.querySelectorAll(".section-projects-board-frames")) {
    frameNode.addEventListener("click", (event) => {
        
        if (window.innerWidth >= 900) {
            event.stopPropagation();

            if (!isEnlarged) {
                document.querySelector(".dark-bg-off").classList.add("dark-bg-on");

                frameNode.classList.remove("section-projects-board-frames-normal");
                frameNode.classList.add("section-projects-board-frames-enlarge");

                for (let imgNode of frameNode.querySelectorAll("img")) {
                    imgNode.classList.remove("img-normal");
                    imgNode.classList.add("img-enlarge");
                }

                isEnlarged = true;

                // left arrow //

                frameNode.parentNode.querySelector(".section-projects-board-frames-left-button")
                    .classList.remove("section-projects-board-frames-left-button-normal");

                frameNode.parentNode.querySelector(".section-projects-board-frames-left-button")
                    .classList.add("section-projects-board-frames-left-button-enlarge");

                // right arrow //

                frameNode.parentNode.querySelector(".section-projects-board-frames-right-button")
                    .classList.remove("section-projects-board-frames-right-button-normal");

                frameNode.parentNode.querySelector(".section-projects-board-frames-right-button")
                    .classList.add("section-projects-board-frames-right-button-enlarge");

                // hide about
                frameNode.parentNode.querySelector(".section-projects-board-about")
                    .classList.add("section-projects-board-about-enlarge");

                setTimeout(() => setBoardFrameLink(frameNode, true), 0.1);
            }
        }
    });
}

function defaultAppearance() {
    if (isEnlarged) {
        for (let frameNode of document.querySelectorAll(".section-projects-board-frames")) {
            document.querySelector(".dark-bg-off").classList.remove("dark-bg-on");

            frameNode.classList.remove("section-projects-board-frames-enlarge");
            frameNode.classList.add("section-projects-board-frames-normal");

            for (let imgNode of frameNode.querySelectorAll("img")) {
                imgNode.classList.remove("img-enlarge");
                imgNode.classList.add("img-normal");
            }

            isEnlarged = false;

            // left arrow //

            frameNode.parentNode.querySelector(".section-projects-board-frames-left-button")
                .classList.remove("section-projects-board-frames-left-button-enlarge");

            frameNode.parentNode.querySelector(".section-projects-board-frames-left-button")
                .classList.add("section-projects-board-frames-left-button-normal");

            // right arrow //

            frameNode.parentNode.querySelector(".section-projects-board-frames-right-button")
                .classList.remove("section-projects-board-frames-right-button-enlarge");

            frameNode.parentNode.querySelector(".section-projects-board-frames-right-button")
                .classList.add("section-projects-board-frames-right-button-normal");

            // show about
            frameNode.parentNode.querySelector(".section-projects-board-about")
                .classList.remove("section-projects-board-about-enlarge");

            setTimeout(() => setBoardFrameLink(frameNode, false), 0.1);
        }
    }
}

// enlarged to default
const universe_DOM = document.querySelector(".UNIVERSE");
universe_DOM.addEventListener("click", () => defaultAppearance());
document.body.addEventListener("keydown", (e) => {
    if (e.key == "Escape") defaultAppearance();
});

// on small screen (portrait) //

const header_DOM = universe_DOM.querySelector("header"),
      header_about_DOM = header_DOM.querySelector(".header-about"),
      header_figure_DOM = header_DOM.querySelector(".header-figure");

let isSmallScreenDetected_1050 = false,
    isSmallScreenDetected_900 = false;

setInterval(() => {
    if (window.innerWidth <= 1050) {
        if (!isSmallScreenDetected_1050) {
            isSmallScreenDetected_1050 = true;
            header_DOM.removeChild(header_about_DOM);
            header_figure_DOM.insertBefore(header_about_DOM, header_figure_DOM.firstChild);
        }

        if (window.innerWidth <= 900) {
            if (!isSmallScreenDetected_900) {
                isSmallScreenDetected_900 = true;
                setBoardFrameLink(undefined, true);
            }
        }
        else if (isSmallScreenDetected_900) {
            isSmallScreenDetected_900 = false;
            setBoardFrameLink(undefined, false);
        }
    }
    else if (isSmallScreenDetected_1050) {
        isSmallScreenDetected_1050 = false;
        header_figure_DOM.removeChild(header_about_DOM);
        header_DOM.insertBefore(header_about_DOM, header_DOM.firstChild);
    }
}, 0.1);