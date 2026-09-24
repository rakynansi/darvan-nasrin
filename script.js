/* =========================
   LOGIN
========================= */

function login() {

    const name = document
        .getElementById("nameInput")
        .value
        .trim();

    if (!name) {
        alert("Please enter your name.");
        return;
    }

    localStorage.setItem("ourWorldName", name);

    document
        .getElementById("loginPage")
        .classList.add("hidden");

    document
        .getElementById("mainPage")
        .classList.remove("hidden");

    document
        .getElementById("accountName")
        .textContent = name;

    document
        .getElementById("welcomeText")
        .textContent = `Welcome ${name} ♡`;
}


/* =========================
   LOAD USER
========================= */

window.addEventListener("load", function () {

    const savedName =
        localStorage.getItem("ourWorldName");

    if (savedName) {

        document
            .getElementById("loginPage")
            .classList.add("hidden");

        document
            .getElementById("mainPage")
            .classList.remove("hidden");

        document
            .getElementById("accountName")
            .textContent = savedName;

        document
            .getElementById("welcomeText")
            .textContent =
            `Welcome ${savedName} ♡`;
    }

    loadTheme();
});


/* =========================
   SETTINGS
========================= */

function toggleSettings() {

    document
        .getElementById("settingsMenu")
        .classList.toggle("hidden");
}


/* =========================
   THEMES
========================= */

function setTheme(theme) {

    document.body.classList.remove(
        "theme-dark",
        "theme-lavender",
        "theme-blue"
    );

    if (theme !== "pink") {

        document.body.classList.add(
            `theme-${theme}`
        );
    }

    localStorage.setItem(
        "ourWorldTheme",
        theme
    );
}


function loadTheme() {

    const theme =
        localStorage.getItem("ourWorldTheme");

    if (theme) {
        setTheme(theme);
    }
}


/* =========================
   LANGUAGE
========================= */

function setLanguage(language) {

    if (language === "ar") {
        document.documentElement.lang = "ar";
        document.documentElement.dir = "rtl";

        alert(
            "تم تغيير اللغة. يمكننا ترجمة جميع النصوص لاحقًا."
        );

    } else {

        document.documentElement.lang = "en";
        document.documentElement.dir = "ltr";
    }
}


/* =========================
   PAGE NAVIGATION
========================= */

function hideAllPages() {

    const pages = document.querySelectorAll(
        ".sub-page"
    );

    pages.forEach(page => {
        page.classList.add("hidden");
    });

    document
        .getElementById("homePage")
        .classList.add("hidden");
}


function goHome() {

    hideAllPages();

    document
        .getElementById("homePage")
        .classList.remove("hidden");
}


function openSection(id) {

    hideAllPages();

    document
        .getElementById(id)
        .classList.remove("hidden");
}


/* =========================
   OUR TIME
========================= */

const mediaData = {

    songs: [
        {
            name: "Your Song 1",
            artist: "Artist",
            link: "https://example.com"
        },

        {
            name: "Your Song 2",
            artist: "Artist",
            link: "https://example.com"
        }
    ],

    games: [
        {
            name: "Our Game",
            link: "https://example.com"
        }
    ],

    apps: [
        {
            name: "Our App",
            link: "https://example.com"
        }
    ]
};


function openMedia(type) {

    hideAllPages();

    document
        .getElementById("mediaPage")
        .classList.remove("hidden");

    const title =
        document.getElementById("mediaTitle");

    const list =
        document.getElementById("mediaList");

    list.innerHTML = "";

    if (type === "songs") {
        title.textContent = "Our Songs 🎵";
    }

    if (type === "games") {
        title.textContent = "Our Games 🎮";
    }

    if (type === "apps") {
        title.textContent = "Our Apps 📱";
    }

    mediaData[type].forEach(item => {

        const div =
            document.createElement("div");

        div.className = "media-item";

        div.innerHTML = `
            <div>
                <h3>${item.name}</h3>
                ${
                    item.artist
                    ? `<p>${item.artist}</p>`
                    : ""
                }
            </div>

            <a
                href="${item.link}"
                target="_blank"
                rel="noopener noreferrer"
            >
                Open
            </a>
        `;

        list.appendChild(div);
    });
}


/* =========================
   PRIVATE PHOTOS
========================= */

function openPrivateSection() {

    const password =
        prompt("Enter the password:");

    if (password !== "9981") {

        alert("Wrong password.");
        return;
    }

    hideAllPages();

    document
        .getElementById("privateSection")
        .classList.remove("hidden");
}


/* =========================
   WHO KNOWS ME BETTER
========================= */

const questions = [

    "What is the date of our relationship?",

    "Who confessed their love first?",

    "What are my biggest fears?",

    "What is my favorite song?",

    "What is my favorite food?",

    "What is my favorite animal?",

    "What word do I say a lot these days?",

    "What is my shoe size?",

    "What is my eye color?",

    "What is my dream?"

];


let currentQuestion = 0;

let answers = [];


function loadQuestion() {

    document
        .getElementById("questionText")
        .textContent =
        questions[currentQuestion];

    document
        .getElementById("questionNumber")
        .textContent =
        currentQuestion + 1;

    document
        .getElementById("answerInput")
        .value = "";
}


function nextQuestion() {

    const input =
        document.getElementById("answerInput");

    const answer =
        input.value.trim();

    if (!answer) {

        alert("Please answer the question.");
        return;
    }

    answers.push({
        question: questions[currentQuestion],
        answer: answer
    });

    currentQuestion++;

    if (currentQuestion >= questions.length) {

        localStorage.setItem(
            "quizAnswers",
            JSON.stringify(answers)
        );

        document
            .getElementById("quizContainer")
            .classList.add("hidden");

        document
            .getElementById("quizFinished")
            .classList.remove("hidden");

        return;
    }

    loadQuestion();
}


/* =========================
   QUIZ INITIALIZATION
========================= */

function initializeQuiz() {

    const saved =
        localStorage.getItem("quizAnswers");

    if (saved) {

        document
            .getElementById("quizContainer")
            .classList.add("hidden");

        document
            .getElementById("quizFinished")
            .classList.remove("hidden");

        return;
    }

    currentQuestion = 0;
    answers = [];

    loadQuestion();
}


document
    .querySelector('[onclick="openSection(\'quiz\')"]')
    ?.addEventListener("click", initializeQuiz);


/* =========================
   CREATE YOUR OWN
========================= */

let creatorCount = 0;


function showCreator() {

    hideAllPages();

    document
        .getElementById("creator")
        .classList.remove("hidden");

    if (creatorCount === 0) {

        for (let i = 0; i < 3; i++) {
            addCreatorQuestion();
        }
    }
}


function addCreatorQuestion() {

    creatorCount++;

    const container =
        document.getElementById(
            "creatorQuestions"
        );

    const div =
        document.createElement("div");

    div.className =
        "creator-question";

    div.innerHTML = `

        <strong>
            Question ${creatorCount}
        </strong>

        <input
            type="text"
            class="custom-question"
            placeholder="Write your question"
        >

        <input
            type="text"
            class="custom-answer"
            placeholder="Correct answer"
        >
    `;

    container.appendChild(div);
}


/* =========================
   CREATE SHAREABLE QUIZ
========================= */

function createQuizLink() {

    const questionInputs =
        document.querySelectorAll(
            ".custom-question"
        );

    const answerInputs =
        document.querySelectorAll(
            ".custom-answer"
        );

    const customQuiz = [];

    for (let i = 0; i < questionInputs.length; i++) {

        const question =
            questionInputs[i].value.trim();

        const answer =
            answerInputs[i].value.trim();

        if (!question || !answer) {
            continue;
        }

        customQuiz.push({
            question: question,
            answer: answer
        });
    }

    if (customQuiz.length === 0) {

        alert("Add at least one question.");
        return;
    }


    const encoded =
        btoa(
            encodeURIComponent(
                JSON.stringify(customQuiz)
            )
        );


    const baseURL =
        window.location.origin +
        window.location.pathname;


    const link =
        `${baseURL}?quiz=${encoded}`;


    document
        .getElementById("createdLink")
        .classList.remove("hidden");


    document
        .getElementById("linkOutput")
        .value = link;
}


/* =========================
   COPY LINK
========================= */

function copyQuizLink() {

    const input =
        document.getElementById(
            "linkOutput"
        );

    navigator.clipboard.writeText(
        input.value
    );

    alert("Link copied!");
}
