const userName = document.querySelector(".name");
const userPoints = document.querySelector(".points");
const timeTaken = document.querySelector(".time_taken");

let name = sessionStorage.getItem("name");
let score = sessionStorage.getItem("score");

if (name) {
    userName.textContent = name;
}

if (score) {
    userPoints.textContent = score;
} else {
    userPoints.textContent = 0;
}

// Time taken could be implemented if we tracked start/end time globally.
// For now, I'll remove the time taken display or set it to a placeholder.
timeTaken.parentElement.style.display = "none"; 
