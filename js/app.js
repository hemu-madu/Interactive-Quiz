// App State
const state = {
    view: 'start', // start, quiz, leaderboard
    username: '',
    score: 0,
    questionIndex: 0,
    timeLeft: 30,
    timerInterval: null,
    questions: [],
    history: [] // {id, userAns, correctAns, timeSpent}
};

// DOM Elements
const views = {
    start: document.getElementById('view-start'),
    quiz: document.getElementById('view-quiz'),
    leaderboard: document.getElementById('view-leaderboard')
};

const ui = {
    usernameInput: document.getElementById('username'),
    btnStart: document.getElementById('btn-start'),

    // Quiz View
    timerText: document.getElementById('timer-text'),
    timerCircle: document.querySelector('.timer-progress'),
    scoreVal: document.getElementById('score-val'),
    qCurrent: document.getElementById('q-current'),
    qTotal: document.getElementById('q-total'),
    questionText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container'),
    btnNext: document.getElementById('btn-next'),

    // Leaderboard View
    finalUser: document.getElementById('final-user'),
    finalScore: document.getElementById('final-score'),
    finalAccuracy: document.getElementById('final-accuracy'),
    finalTimeBonus: document.getElementById('final-timebonus'),
    leaderboardList: document.getElementById('leaderboard-list'),
    btnRestart: document.getElementById('btn-restart')
};

// Config
const TOTAL_TIME = 30;
const QUESTIONS_COUNT = 30; // Limit to 30

// --- Init ---
function init() {
    setupEventListeners();
    // Pre-shuffle or prepare questions if needed, usually we shuffle at start
}

function setupEventListeners() {
    ui.btnStart.addEventListener('click', startSession);
    ui.usernameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') startSession();
    });

    ui.btnNext.addEventListener('click', nextQuestion);
    ui.btnRestart.addEventListener('click', resetSession);
}

// --- Navigation ---
function switchView(viewName) {
    // Hide all EXCEPT target
    const target = views[viewName];

    Object.values(views).forEach(v => {
        if (v === target) return; // Don't hide the one we're opening
        v.classList.remove('active-view');
        v.style.opacity = '0';
        setTimeout(() => v.classList.add('hidden'), 500);
    });
    target.classList.remove('hidden');

    // Force Reflow
    void target.offsetWidth;

    target.classList.add('active-view');
    target.style.opacity = '1';

    state.view = viewName;
}

// --- Session Logic ---
function startSession() {
    const name = ui.usernameInput.value.trim() || 'Anonymous';
    state.username = name;
    state.score = 0;
    state.questionIndex = 0;
    state.history = [];

    // Prepare Questions (Clone and Shuffle Order of Questions if desired, here just slice)
    // Assuming 'questions' global is available from questions.js
    if (typeof questions === 'undefined') {
        alert("Error: Questions not loaded.");
        return;
    }

    // Shuffle the pool of questions to get random 30
    const shuffledQ = [...questions].sort(() => 0.5 - Math.random());
    state.questions = shuffledQ.slice(0, QUESTIONS_COUNT);

    ui.qTotal.innerText = state.questions.length;

    switchView('quiz');
    // Slight delay to ensure view is visible before content populates/animates
    setTimeout(() => {
        loadQuestion();
    }, 400);
}

function loadQuestion() {
    if (state.questionIndex >= state.questions.length) {
        finishSession();
        return;
    }

    const q = state.questions[state.questionIndex];
    ui.questionText.innerText = q.question;
    ui.qCurrent.innerText = state.questionIndex + 1;
    ui.scoreVal.innerText = state.score;
    ui.btnNext.classList.add('hidden'); // Hide next button until answered (or timeout)

    // Options Logic
    let options = [...q.options];
    let correctAns = q.answer;
    let originalIndices = options.map((_, i) => i);

    // Shuffle options locally
    // We need to track which one is correct after shuffle
    // Or just compare string values (safe if strings are unique)
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }

    renderOptions(options, correctAns);
    startTimer();
}

function renderOptions(options, correctAnswersText) {
    ui.optionsContainer.innerHTML = '';

    options.forEach((optText, idx) => {
        const btn = document.createElement('div');
        btn.className = 'option-card';
        // Escape HTML to prevent rendering tags like <h1> or <br>
        const safeText = optText.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

        btn.innerHTML = `<span class="option-marker">${String.fromCharCode(65 + idx)}</span> <span class="opt-text">${safeText}</span>`;

        btn.addEventListener('click', () => handleAnswer(btn, optText, correctAnswersText));
        ui.optionsContainer.appendChild(btn);
    });
}

// --- Timer Logic ---
function startTimer() {
    clearInterval(state.timerInterval);
    state.timeLeft = TOTAL_TIME;
    updateTimerUI();

    state.timerInterval = setInterval(() => {
        state.timeLeft--;
        updateTimerUI();

        if (state.timeLeft <= 0) {
            handleTimeout();
        }
    }, 1000);
}

function updateTimerUI() {
    ui.timerText.innerText = state.timeLeft;
    // Calculate Stroke Offset
    // 283 is circumference of r=45 (2 * PI * 45)
    // 283 - (283 * perc)
    const total = TOTAL_TIME;
    const perc = state.timeLeft / total;
    const offset = 283 - (283 * perc);

    ui.timerCircle.style.strokeDashoffset = offset;

    // Color alert
    if (state.timeLeft <= 5) {
        ui.timerCircle.style.stroke = 'var(--danger)';
    } else {
        ui.timerCircle.style.stroke = 'var(--primary)';
    }
}

function stopTimer() {
    clearInterval(state.timerInterval);
}

// --- Answer Handling ---
function handleAnswer(selectedBtn, selectedText, correctText) {
    if (ui.optionsContainer.classList.contains('locked')) return;

    stopTimer();
    ui.optionsContainer.classList.add('locked'); // Prevent multiple clicks

    const isCorrect = selectedText === correctText;

    if (isCorrect) {
        selectedBtn.classList.add('correct');
        state.score += 10;
        // Optional: Time Bonus?
        // state.score += Math.floor(state.timeLeft / 2);
    } else {
        selectedBtn.classList.add('wrong');
        // Highlight correct
        Array.from(ui.optionsContainer.children).forEach(btn => {
            if (btn.querySelector('.opt-text').innerText === correctText) {
                btn.classList.add('correct');
            }
        });
    }

    ui.scoreVal.innerText = state.score;
    // Show Next Button
    ui.btnNext.classList.remove('hidden');

    // Animate Next into view?
}

function handleTimeout() {
    stopTimer();
    ui.optionsContainer.classList.add('locked');

    // Highlight correct
    const correctText = state.questions[state.questionIndex].answer;
    Array.from(ui.optionsContainer.children).forEach(btn => {
        if (btn.querySelector('.opt-text').innerText === correctText) {
            btn.classList.add('correct');
        }
    });

    ui.btnNext.classList.remove('hidden');
}

function nextQuestion() {
    state.questionIndex++;
    ui.optionsContainer.classList.remove('locked');
    loadQuestion();
}

// --- Leaderboard ---
function finishSession() {
    switchView('leaderboard');

    ui.finalUser.innerText = state.username;
    ui.finalScore.innerText = state.score;
    ui.finalAccuracy.innerText = '100% (Mock)'; // Calculate real accuracy if needed
    ui.finalTimeBonus.innerText = '0';

    saveScore(state.username, state.score);
    renderLeaderboard();
}

function saveScore(name, score) {
    const key = 'neu_quiz_lb';
    let lb = JSON.parse(localStorage.getItem(key) || '[]');
    lb.push({ name, score });
    lb.sort((a, b) => b.score - a.score);
    lb = lb.slice(0, 10); // Keep top 10
    localStorage.setItem(key, JSON.stringify(lb));
}

function renderLeaderboard() {
    const key = 'neu_quiz_lb';
    let lb = JSON.parse(localStorage.getItem(key) || '[]');

    ui.leaderboardList.innerHTML = '';

    lb.forEach((entry, i) => {
        const li = document.createElement('li');
        li.className = 'lb-item';
        if (entry.name === state.username && entry.score === state.score) {
            li.classList.add('highlight');
        }
        li.innerHTML = `<span>#${i + 1} ${entry.name}</span> <span>${entry.score}</span>`;
        ui.leaderboardList.appendChild(li);
    });
}

function resetSession() {
    switchView('start');
    ui.usernameInput.value = '';
}

// Start
init();
