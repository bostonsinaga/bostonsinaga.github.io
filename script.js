/* PROJECTS BOARDS */

const section_projects_DOM = document.querySelector(".section-projects");

let projectFrame_img_arr = [
    /* KML TOWN */

    [

    ],

    /* CALLAPET */

    [
        
    ]
];

let projectDescription_str_arr = [
    /* KML TOWN */

    "In my previous job on 2022 as Data Entry, I had a task to input coordinates from WhatsApp to Google Earth's '.kml' file " +
    "by create pins from the coordinates. Then also had to input the coordinates to spreadsheet. " +
    "This was done to find out where the stuff are placed and what the quantity and price. " +
    "It was pretty boring to repeatedly copy and paste coordinates to create pins for thousands of them. " +
    "So I decided to create CLI software named 'KML-TOWN' with C++ to automatically do the task. I developed it on my free time " +
    "(from 2022 November, I also created small similar tools with JavaScript on browser months before that). " +
    "Probably 'KML-TOWN' is not a perfect tool and hard to use, but my task was made easier and I hope other people can take advantage as well.",

    /* CALLAPET */

    "Android games I ever made that have released on Google Play Store. Sequentially named " +
    "<a href=\"https://play.google.com/store/apps/details?id=com.callapet.callamice\" target=\"_blank\">'Call a Mice'</a>, " +
    "<a href=\"https://play.google.com/store/apps/details?id=com.callapet.flyingpinball\" target=\"_blank\">'Flying Pinball'</a>, " +
    "<a href=\"https://play.google.com/store/apps/details?id=com.callapet.zombiehelicoptergap\" target=\"_blank\">'Zombie Helicopter Gap'</a>, " +
    "<a href=\"https://play.google.com/store/apps/details?id=com.callapet.flapduobirds\" target=\"_blank\">'Flap Duo Birds'</a>, " +
    "<a href=\"https://play.google.com/store/apps/details?id=com.callapet.tilesmathjumper\" target=\"_blank\">'Tiles Math Jumper'</a> " +
    "(from 2020 - 2021). I used Cocos2d-x the open source game engine with C++. The game apps source codes are open on my GitHub. " +
    "Creating games was the reason for me to write code. I have learned by myself from watching video tutorials, read articles and online forums."
];

for (let i = 0; i < 2; i++) {
    section_projects_DOM.innerHTML += `
        <div class="section-projects-board">
            <div class="section-projects-board-frame">${projectFrame_img_arr[i]}</div>
            <div class="section-projects-board-left-button"></div>
            <div class="section-projects-board-right-button"></div>
            <div class="section-projects-board-description">${projectDescription_str_arr[i]}</div>
        </div>
    `;
}