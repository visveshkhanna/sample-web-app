function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestion() {
  const num1 = getRandomNumber(1, 10);
  const num2 = getRandomNumber(1, 10);
  const operations = ["+", "-", "*", "/"];
  const operation = operations[getRandomNumber(0, operations.length - 1)];
  const question = `${num1} ${operation} ${num2}`;
  let correctAnswer;

  switch (operation) {
    case "+":
      correctAnswer = num1 + num2;
      break;
    case "-":
      correctAnswer = num1 - num2;
      break;
    case "*":
      correctAnswer = num1 * num2;
      break;
    case "/":
      correctAnswer = parseFloat((num1 / num2).toFixed(2));
      break;
  }

  return { question, correctAnswer };
}

function simulateFeedback(answer, correctAnswer) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (parseFloat(answer) === correctAnswer) {
        resolve({
          status: true,
          response: "Correct! 🎉 Great job.",
        });
      } else {
        resolve({
          status: false,
          response: `Incorrect. 😞 The correct answer was ${correctAnswer}.`,
        });
      }
    }, 2000);
  });
}

function clearOldQuestions() {
  if (questionHistory.length > 5) {
    questionHistory.shift();
  }
}

async function handleAnswerSubmission() {
  const answerInput = document.getElementById("answerInput");
  const feedbackDiv = document.getElementById("feedback");
  const feedbackText = document.getElementById("feedbackText");

  const userAnswer = answerInput.value.trim();
  if (!userAnswer) {
    feedbackDiv.classList.remove("hidden");
    feedbackText.textContent = "Please enter an answer!";
    feedbackText.className = "text-red-500";
    return;
  }

  feedbackDiv.classList.remove("hidden");
  feedbackText.className = "animate-pulse text-gray-500";
  feedbackText.textContent = "Processing your answer...";

  const feedbackMessage = await simulateFeedback(userAnswer, correctAnswer);

  feedbackText.className = feedbackMessage.status
    ? "text-green-500"
    : "text-red-500";
  feedbackText.textContent = feedbackMessage.response;

  questionHistory.push(currentQuestion);

  if (questionHistory.length > 5) {
    showCompletionOption();
  }

  clearOldQuestions();

  setTimeout(() => {
    feedbackDiv.classList.add("hidden");
    answerInput.value = "";
    displayQuestion();
  }, 3000);
}

function displayQuestion() {
  const questionData = generateQuestion();
  document.getElementById("question").textContent = questionData.question;
  currentQuestion = questionData.question;
  correctAnswer = questionData.correctAnswer;
}

function showCompletionOption() {
  const completionDiv = document.getElementById("completionDiv");
  completionDiv.classList.remove("hidden");

  const completeCourseButton = document.getElementById("completeCourse");
  completeCourseButton.addEventListener("click", emitCourseCompletionEvent);
}

function emitCourseCompletionEvent() {
  const courseCompletedEvent = new CustomEvent("courseCompleted", {
    detail: { message: "Congratulations! You have completed the course!" },
  });

  document.dispatchEvent(courseCompletedEvent);
}

document.addEventListener("courseCompleted", (event) => {
  alert(event.detail.message);
  document.getElementById("completionDiv").classList.add("hidden");
});

let questionHistory = [];
let currentQuestion;
let correctAnswer;

document
  .getElementById("submitAnswer")
  .addEventListener("click", handleAnswerSubmission);

displayQuestion();
