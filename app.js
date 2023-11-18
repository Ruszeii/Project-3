const apiUrl = "https://raw.githubusercontent.com/ruszeii/Project-3/main/db.json";

let currentQuiz = null;
let currentQuestionIndex = 0;
let correctAnswers = 0;
let answeredQuestions = 0;
let startTime;

async function fetchQuizData() {
    try {
        const response = await fetch(apiUrl);
        const quizzesDataFromAPI = await response.json();
        return quizzesDataFromAPI;
    } catch (error) {
        console.error('Error loading quiz data:', error);
        throw error;
    }
}

async function startQuiz() {
    try {
        const selectedQuizValue = document.getElementById("quiz-select").value;
        const quizzesDataFromAPI = await fetchQuizData();

        const selectedQuiz = quizzesDataFromAPI.find(quiz => quiz.id === parseInt(selectedQuizValue));

        if (selectedQuiz && selectedQuiz.questions) {
            currentQuiz = selectedQuiz.questions;
            currentQuestionIndex = 0;
            correctAnswers = 0;
            answeredQuestions = 0;
            startTime = Date.now();
            showNextQuestion();
        } else {
            console.error('Error loading quiz data:', selectedQuiz);
            alert('Invalid quiz ID. Please select a valid quiz.');
        }
    } catch (error) {
        console.error('An error occurred while starting the quiz:', error);
        alert('An error occurred while starting the quiz. Please try again later.');
    }
}
function showNextQuestion() {
    if (currentQuestionIndex < currentQuiz.length) {
        const question = currentQuiz[currentQuestionIndex];
        const questionText = question.text;
        const answerOptions = question.answerOptions;

        const questionElement = document.getElementById('question-text');
        questionElement.textContent = questionText;

        const answerOptionsElement = document.getElementById('answer-options');
        answerOptionsElement.innerHTML = '';
        for (const answerOption of answerOptions) {
            const answerOptionElement = document.createElement('input');
            answerOptionElement.type = 'radio';
            answerOptionElement.name = 'answer';
            answerOptionElement.value = answerOption.text;
            const label = document.createElement('label');
            label.textContent = answerOption.text;
            label.appendChild(answerOptionElement);
            answerOptionsElement.appendChild(label);
        }

        currentQuestionIndex++;
    } else {
        showCompletionView();
    }
}

function evaluateAnswer(userAnswer) {
    const currentQuestion = currentQuiz[currentQuestionIndex - 1];
    if (currentQuestion.answerOptions.find(option => option.text === userAnswer && option.isCorrect)) {
        correctAnswers++;

        showFeedbackView('Brilliant!');
    } else {
        const correctAnswerText = currentQuestion.answerOptions.find(option => option.isCorrect).text;
        showFeedbackView(`Incorrect! The correct answer is: ${correctAnswerText}`);
    }
}

function showFeedbackView(feedbackMessage) {
    const feedbackTextElement = document.getElementById('feedback-text');
    feedbackTextElement.textContent = feedbackMessage;

    const feedbackView = document.getElementById('feedback-view');
    feedbackView.style.display = 'block';

    setTimeout(() => {
        feedbackView.style.display = 'none';
        showNextQuestion(); 
    }, 1000);
}
function showCompletionView() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000); 
    const totalScore = Math.round((correctAnswers / answeredQuestions) * 100);

    const completionMessageElement = document.getElementById('completion-message');
    if (totalScore >= 80) {
        completionMessageElement.textContent = `Congratulations ${document.getElementById('name').value}! You passed the quiz.`;
    } else {
        completionMessageElement.textContent = `Sorry ${document.getElementById('name').value}, you failed the quiz.`;
    }

    const completionView = document.getElementById('completion-view');
    completionView.style.display = 'block';

    document.getElementById('answered-count').textContent = answeredQuestions;
    document.getElementById('elapsed-time').textContent = elapsedTime;
    document.getElementById('total-score').textContent = totalScore;
}

document.getElementById("start-quiz-form").addEventListener("submit", function (event) {
    event.preventDefault();
    startQuiz();
});

document.getElementById("submit-answer").addEventListener("click", function () {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        answeredQuestions++;
        evaluateAnswer(selectedAnswer.value);
    }
});
document.getElementById("got-it-button").addEventListener("click", function () {
    showNextQuestion();
});

document.getElementById("retry-quiz").addEventListener("click", function () {
    startQuiz();
});

document.getElementById("return-to-main").addEventListener("click", function () {
    location.reload();
});
