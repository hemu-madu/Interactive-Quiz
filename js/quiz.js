// DOM Elements
const timeElement = document.querySelector(".time");
const userNameElement = document.querySelector(".name");
const questionsContainer = document.getElementById("questions");
const nextBtn = document.querySelector(".btn-next");

let questionCount = 0;
let score = 0;
let counter;
let timeValue = 15;
let userScore = 0;

window.onload = function () {
    let name = sessionStorage.getItem("name");
    if (!name) {
        location.href = "index.html";
    }
    userNameElement.textContent = name;
    showQuestions(0);
    startTimer(timeValue);
};

function next() {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);
        clearInterval(counter);
        startTimer(timeValue);
        nextBtn.classList.remove("active");
    } else {
        showResult();
    }
}

function showQuestions(index) {
    let questionText = `<div class="question_text">${questions[index].id}. ${questions[index].question}</div>`;
    let optionTag = `
    <div class="option" onclick="optionSelected(this)"><span>${questions[index].options[0]}</span></div>
    <div class="option" onclick="optionSelected(this)"><span>${questions[index].options[1]}</span></div>
    <div class="option" onclick="optionSelected(this)"><span>${questions[index].options[2]}</span></div>
    <div class="option" onclick="optionSelected(this)"><span>${questions[index].options[3]}</span></div>`;

    questionsContainer.innerHTML = questionText + `<div class="option_group">${optionTag}</div>`;
}

function optionSelected(answer) {
    clearInterval(counter);
    let userAns = answer.textContent;
    let correctAns = questions[questionCount].answer;
    let allOptions = questionsContainer.querySelectorAll(".option");

    if (userAns == correctAns) {
        score += 10;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", `<i class="fas fa-check"></i>`); // Requires FontAwesome
    } else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", `<i class="fas fa-times"></i>`);

        // Auto select correct answer
        for (let i = 0; i < allOptions.length; i++) {
            if (allOptions[i].textContent == correctAns) {
                allOptions[i].classList.add("correct");
            }
        }
    }

    // Disable all options
    for (let i = 0; i < allOptions.length; i++) {
        allOptions[i].classList.add("disabled");
    }

    nextBtn.classList.add("active");
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeElement.textContent = time >= 10 ? `00:${time}` : `00:0${time}`;
        time--;
        if (time < 0) {
            clearInterval(counter);
            timeElement.textContent = "00:00";

            // Auto move or just show correct answer?
            // Let's show correct answer and enable next button
            let correctAns = questions[questionCount].answer;
            let allOptions = questionsContainer.querySelectorAll(".option");
            for (let i = 0; i < allOptions.length; i++) {
                if (allOptions[i].textContent == correctAns) {
                    allOptions[i].setAttribute("class", "option correct disabled");
                } else {
                    allOptions[i].classList.add("disabled");
                }
            }
            nextBtn.classList.add("active");
        }
    }
}

function showResult() {
    sessionStorage.setItem("score", score);
    // Calculate time taken? For now just sending score.
    // Calculate total time taken = (questions.length * 15) - (remaining time)? 
    // It's complicated with per-question timer. Let's just track score.
    // Or save time taken based on total time spent.

    // Just redirect
    location.href = "end.html";
}
