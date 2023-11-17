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
        const selectedQuiz = document.getElementById("quiz-select");
        const selectedJson = selectedQuiz.options[selectedQuiz.selectedIndex].getAttribute("data-json");
        const response = await fetch(`${apiUrl}/${selectedJson}`);
        const quizDataFromAPI = await response.json();

        if (quizDataFromAPI) {
            currentQuiz = quizDataFromAPI;
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

// ... (continue the implementation of other functions as per your requirements)
