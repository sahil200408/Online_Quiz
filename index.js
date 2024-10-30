// Default login credentials
const defaultEmail = "codsoft23mail.com";
const defaultPassword = "234567";

// Function to handle user login
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const loginMessage = document.getElementById("loginMessage");

    if (email === defaultEmail && password === defaultPassword) {
        loginMessage.textContent = "Login successful!";
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("quizContainer").style.display = "block";
        loadQuestions(); // Load questions only after successful login
    } else {
        loginMessage.textContent = "Incorrect email or password!";
    }
}

// Quiz Questions
const questions = [
    {
        que: "1) What year was JavaScript invented?",
        a: "1995",
        b: "1996",
        c: "1994",
        d: "None of the above",
        correct: "a",
    },
    {
        que: "2) Which of the following is a markup language?",
        a: "HTML",
        b: "PHP",
        c: "C++",
        d: "Java",
        correct: "a",
    },
    {
        que: "3) What does CSS stand for?",
        a: "Hypertext Markup Language",
        b: "Cascading Style Sheets",
        c: "JavaScript Object Notation",
        d: "None of the above",
        correct: "b",
    },
    {
        que: "4) Who is known as the father of computers?",
        a: "Albert Einstein",
        b: "Charles Babbage",
        c: "Isaac Newton",
        d: "Nikola Tesla",
        correct: "b",
    },
    {
        que: "5) What is the main language used for web development?",
        a: "Python",
        b: "Java",
        c: "HTML",
        d: "C++",
        correct: "c",
    }
];

// Get elements
const quesBox = document.getElementById("quesBox");
const options = document.getElementsByClassName("option");
const lastMessage = document.querySelector("#options");
const submit = document.querySelector(".btn");
const radioButtons = document.querySelectorAll('input[type="radio"][name="option"]');
const question1 = document.getElementsByTagName("label")[0];
const question2 = document.getElementsByTagName("label")[1];
const question3 = document.getElementsByTagName("label")[2];
const question4 = document.getElementsByTagName("label")[3];
const answershow = document.getElementById("answer-result");
const scoreShow = document.getElementById("score");

let index = 0;
let score = 0;

// Load questions function
function loadQuestions() {
    const data = questions[index];
    quesBox.innerText = data.que;
    question1.innerText = data.a;
    question2.innerText = data.b;
    question3.innerText = data.c;
    question4.innerText = data.d;
}

// Handle submit button click
submit.addEventListener("click", () => {
    let radioChecked = false;
    radioButtons.forEach((radioButton) => {
        if (radioButton.checked) {
            radioChecked = true;
        }
    });
    if (radioChecked) {
        nextQuestion();
    } else {
        answershow.innerText = "Please select an answer";
        setTimeout(() => {
            answershow.innerText = "";
        }, 2000);
    }
});

// Move to the next question or display the result
function nextQuestion() {
    checkAnswer();
    index++;
    if (index < questions.length) {
        loadQuestions();
    } else {
        displayResult();
    }
    uncheckRadioButtons();
}

// Check the selected answer
function checkAnswer() {
    radioButtons.forEach((radioButton) => {
        if (radioButton.checked) {
            if (radioButton.value === questions[index].correct) {
                score++;
                answershow.innerText = "Your last answer was correct!";
            } else {
                answershow.innerText = "Your last answer was wrong!";
            }
            scoreShow.innerText = `Your score is ${score}/${questions.length}`;
            setTimeout(() => {
                answershow.innerText = "";
                scoreShow.innerText = "";
            }, 2000);
        }
    });
}

// Uncheck all radio buttons for the next question
function uncheckRadioButtons() {
    radioButtons.forEach((radio) => {
        radio.checked = false;
    });
}

// Display the final result
function displayResult() {
    if (score > questions.length / 2) {
        quesBox.innerText = "Congratulations! You passed the quiz!";
    } else {
        quesBox.innerText = "Game Over. Better luck next time!";
    }
    lastMessage.innerHTML = `Your final score is ${score}/${questions.length}`;
    submit.innerText = "Play Again";
    submit.addEventListener("click", () => {
        location.reload();
    });
}
