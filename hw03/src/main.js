import { GetNewQuestionSet, GetNewToken } from "./functions.js";

const textQuestion = document.getElementById("question-text");
const answerButtons = [];
for (let i = 1; i < 5; i++) {
  answerButtons.push(document.getElementById(`answer-${i}`));
}
const questionMarkers = [];
for (let i = 1; i < 16; i++) {
  questionMarkers.push(document.getElementById(`question-${i}`));
}

const populateElements = (questionObject) => {
  if (questionObject === undefined) {
    throw new Error("Question object is undefined");
  }
  textQuestion.innerText = questionObject.question;
  const answers = questionObject.incorrectAnswers;
  answers.push(questionObject.correctAnswer);
  answers.sort(() => Math.random() - 0.5);
  for (let i = 0; i < 4; i++) {
    answerButtons[i].innerText = answers[i];
  }

  const classCorrect = "bg-green-500";
  const classIncorrect = "bg-red-500";
  const classDefault = "bg-yellow-500/80";
  answerButtons.forEach((button) => {
    button.classList.remove(classCorrect, classIncorrect, classDefault);
    button.classList.add(classDefault);

    button.onclick = () => {
      if (button.innerText === questionObject.correctAnswer) {
        button.classList.remove(classDefault);
        button.classList.add(classCorrect);
        setTimeout(() => {
          ContinueGame();
        }, 1000);
      } else {
        button.classList.remove(classDefault);
        button.classList.add(classIncorrect);
        answerButtons.forEach((button) => {
          if (button.innerText === questionObject.correctAnswer) {
            button.classList.remove(classDefault);
            button.classList.add(classCorrect);
          }
        });
        setTimeout(() => {
          FailGame();
        }, 1000);
      }
    };
  });
};

const UpdateQuestionMarkers = (currentQuestion) => {
  const prizes = [
    "€100",
    "€200",
    "€300",
    "€500",
    "€1,000",
    "€2,000",
    "€4,000",
    "€8,000",
    "€16,000",
    "€32,000",
    "€64,000",
    "€125,000",
    "€250,000",
    "€500,000",
    "€1,000,000",
  ];

  for (let i = 0; i < 15; i++) {
    questionMarkers[i].classList.remove("bg-yellow-500");
    questionMarkers[i].innerText = "";
  }
  for (let i = 0; i < currentQuestion; i++) {
    questionMarkers[i].classList.add("bg-yellow-500");
  }
  questionMarkers[currentQuestion - 1].innerText = prizes[currentQuestion - 1];
};

const ContinueGame = async () => {
  currentQuestion++;
  UpdateQuestionMarkers(currentQuestion);
  if (questionSet.length === 0) {
    questionSet = await GetNewQuestionSet(token);
  }
  populateElements(questionSet.pop());
};

const FailGame = () => {
  currentQuestion = 0;
  ContinueGame();
};

let currentQuestion = 0;
let token = "";
token = await GetNewToken();

let questionSet = [];
questionSet = await GetNewQuestionSet(token);

ContinueGame();
