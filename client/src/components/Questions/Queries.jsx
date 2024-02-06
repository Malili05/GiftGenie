// Import your question data from Question.js
import { questions } from './Question.js';

// DOM elements
const questionText = document.getElementById('question-text');
const nextButton = document.getElementById('next-button');

let currentQuestionIndex = -1;

// Function to display a random question
function displayRandomQuestion() {
    // Generate a random index within the range of your questions array
    const randomIndex = Math.floor(Math.random() * questions.length);

    // Ensure we don't repeat the same question
    if (randomIndex !== currentQuestionIndex) {
        currentQuestionIndex = randomIndex;
        questionText.textContent = questions[randomIndex];
    } else {
        // If the random question is the same as the previous one, call the function again
        displayRandomQuestion();
    }
}

// Event listener for the "Next Question" button
nextButton.addEventListener('click', displayRandomQuestion);

// Initial display of the first random question
displayRandomQuestion();