// Define the quiz data
const apiUrl = "https://my-json-server.typicode.com/Ruszeii/Project-3";

// Global variables
let currentQuiz = null;
let currentQuestionIndex = 0;
let correctAnswers = 0;
let answeredQuestions = 0;
let startTime;

// Function to start the quiz
async function startQuiz() {
    try {
        const selectedQuizValue = document.getElementById("quiz-select").value;
        const response = await fetch(`${https://my-json-server.typicode.com/Ruszeii/Project-3}/${quiz1}`);
        const quizDataFromAPI = await response.json();

        if (quizDataFromAPI) {
            currentQuiz = quizDataFromAPI.questions;
            currentQuestionIndex = 0;
            correctAnswers = 0;
            answeredQuestions = 0;
            startTime = Date.now();
            showNextQuestion();
        } else {
            console.error('Error loading quiz data:', error);
            alert('Invalid quiz ID. Please select a valid quiz.');
        }
    } catch (error) {
        console.error('Error loading quiz data:', error);
        alert('An error occurred while fetching the quiz data. Please try again later.');
    }
}

// Function to display the next question
function showNextQuestion() {
    if (currentQuestionIndex < currentQuiz.length) {
        const question = currentQuiz[currentQuestionIndex];
        const questionText = question.text;
        const answerOptions = question.answerOptions;

        // Update question text
        const questionElement = document.getElementById('question-text');
        questionElement.textContent = questionText;

        // Clear existing answer options
        const answerOptionsElement = document.getElementById('answer-options');
        answerOptionsElement.innerHTML = '';

        // Create and append answer options
        for (const answerOption of answerOptions) {
            const answerOptionElement = document.createElement('input');
            answerOptionElement.type = 'radio';
            answerOptionElement.name = 'answer';
            answerOptionElement.value = answerOption.text;
            answerOptionElement.textContent = answerOption.text;

            answerOptionsElement.appendChild(answerOptionElement);
        }

        currentQuestionIndex++;
    } else {
        showCompletionView();
    }
}

// Function to evaluate the user's answer
function evaluateAnswer(userAnswer) {
    const currentQuestion = currentQuiz[currentQuestionIndex - 1];
    if (userAnswer === currentQuestion.correctAnswer) {
        correctAnswers++;
        // Display correct answer message
        showFeedbackView('Brilliant!');
    } else {
        // Display incorrect answer message with correct answer explanation
        const correctAnswerText = currentQuestion.answerOptions.find(option => option.isCorrect).text;
        showFeedbackView(`Incorrect! The correct answer is: ${correctAnswerText}`);
    }
}

// Function to show the feedback view
function showFeedbackView(feedbackMessage) {
    // Display feedback message
    const feedbackTextElement = document.getElementById('feedback-text');
    feedbackTextElement.textContent = feedbackMessage;

    // Show the feedback view
    const feedbackView = document.getElementById('feedback-view');
    feedbackView.style.display = 'block';

    // Hide the feedback view after 1000 milliseconds (1 second)
    setTimeout(() => {
        feedbackView.style.display = 'none';
        showNextQuestion(); // Proceed to the next question
    }, 1000);
}

// Function to show the completion view
function showCompletionView() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Elapsed time in seconds
    const totalScore = Math.round((correctAnswers / answeredQuestions) * 100);

    // Display completion message and options
    const completionMessageElement = document.getElementById('completion-message');
    if (totalScore >= 80) {
        completionMessageElement.textContent = `Congratulations ${document.getElementById('name').value}! You passed the quiz.`;
    } else {
        completionMessageElement.textContent = `Sorry ${document.getElementById('name').value}, you failed the quiz.`;
    }

    // Show the completion view
    const completionView = document.getElementById('completion-view');
    completionView.style.display = 'block';

    // Update scoreboard
    document.getElementById('answered-count').textContent = answeredQuestions;
    document.getElementById('elapsed-time').textContent = elapsedTime;
    document.getElementById('total-score').textContent = totalScore;
}

// Event listener for the start quiz form submission
document.getElementById("start-quiz-form").addEventListener("submit", function (event) {
    event.preventDefault();
    startQuiz();
});

// Event listener for submitting an answer
document.getElementById("submit-answer").addEventListener("click", function () {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        answeredQuestions++;
        evaluateAnswer(selectedAnswer.value);
    }
});

// Event listener for the "Got It" button in feedback view
document.getElementById("got-it-button").addEventListener("click", function () {
    // Logic to proceed to the next question after feedback
    showNextQuestion();
});

// Event listener for retrying the quiz
document.getElementById("retry-quiz").addEventListener("click", function () {
    // Reset the quiz and start over
    startQuiz();
});

// Event listener for returning to the main page
document.getElementById("return-to-main").addEventListener("click", function () {
    // Logic to go back to the main page
    // For simplicity, you can reload the page
    location.reload();
});
