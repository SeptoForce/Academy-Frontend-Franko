import { GetNewQuestionSet, GetNewToken } from "./functions.js";

const textQuestion = document.getElementById("question-text");
const footer = document.getElementById("footer");
const fiftyFifty = document.getElementById("fifty-fifty");
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

  const classNames = {
    bg_correct: "bg-green-500",
    bg_fail: "bg-red-500",
    bg_default: "bg-yellow-500/80",
    hover_bg_white: "hover:bg-white",
    hover_text_yellow: "hover:text-yellow-500",
  };

  textQuestion.innerText = questionObject.question;
  const answers = questionObject.incorrectAnswers;
  answers.push(questionObject.correctAnswer);
  answers.sort(() => Math.random() - 0.5);
  for (let i = 0; i < 4; i++) {
    answerButtons[i].innerText = answers[i];
  }

  footer.innerText = `© Franko Zarkovic 2024${String.fromCharCode(
    97 + answers.indexOf(questionObject.correctAnswer),
  )}`;

  answerButtons.forEach((button) => {
    button.disabled = false;

    button.classList.remove(
      classNames.bg_default,
      classNames.bg_fail,
      classNames.bg_correct,
    );
    button.classList.add(classNames.bg_default);
    button.classList.remove(
      classNames.hover_bg_white,
      classNames.hover_text_yellow,
    );
    button.classList.add(
      classNames.hover_bg_white,
      classNames.hover_text_yellow,
    );

    button.onclick = () => {
      if (button.innerText === questionObject.correctAnswer) {
        button.classList.remove(classNames.bg_default);
        button.classList.add(classNames.bg_correct);
        answerButtons.forEach((button) => {
          button.classList.remove(
            classNames.hover_bg_white,
            classNames.hover_text_yellow,
          );
        });
        setTimeout(() => {
          ContinueGame();
        }, 1000);
      } else {
        button.classList.remove(classNames.bg_default);
        button.classList.add(classNames.bg_fail);
        answerButtons.forEach((button) => {
          button.classList.remove(
            classNames.hover_bg_white,
            classNames.hover_text_yellow,
          );
          if (button.innerText === questionObject.correctAnswer) {
            button.classList.remove(classNames.bg_default);
            button.classList.add(classNames.bg_correct);
          }
        });
        setTimeout(() => {
          FailGame();
        }, 2000);
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
  const classNames = {
    bg_default: "bg-yellow-500/30",
    bg_yellow: "bg-yellow-500",
  };

  for (let i = 0; i < 15; i++) {
    questionMarkers[i].classList.remove(classNames.bg_yellow);
    questionMarkers[i].classList.add(classNames.bg_default);
    questionMarkers[i].innerText = "";
  }
  for (let i = 0; i < currentQuestion; i++) {
    questionMarkers[i].classList.remove(classNames.bg_default);
    questionMarkers[i].classList.add(classNames.bg_yellow);
  }
  questionMarkers[currentQuestion - 1].innerText = prizes[currentQuestion - 1];
};

let currentQuestionObject = {};

const ContinueGame = async () => {
  currentQuestion++;
  if (currentQuestion > 15) {
    alert("Congratulations! You have won €1,000,000!");
    currentQuestion = 0;
    ContinueGame();
  }
  UpdateQuestionMarkers(currentQuestion);
  if (questionSet.length === 0) {
    questionSet = await GetNewQuestionSet(token);
  }
  currentQuestionObject = questionSet.pop();
  populateElements(currentQuestionObject);
};

const FailGame = () => {
  currentQuestion = 0;
  fiftyFifty.disabled = false;
  ContinueGame();
};

const DisableTwoIncorrectButtons = () => {
  let disabledButtons = 0;
  for (let i = 0; i < 4; i++) {
    if (answerButtons[i].innerText !== currentQuestionObject.correctAnswer) {
      answerButtons[i].disabled = true;
      disabledButtons++;
    }
    if (disabledButtons === 2) {
      break;
    }
  }
};

fiftyFifty.onclick = () => {
  fiftyFifty.disabled = true;
  DisableTwoIncorrectButtons();
};

let currentQuestion = 0;
let token = "";
token = await GetNewToken();

let questionSet = [];
questionSet = await GetNewQuestionSet(token);

ContinueGame();
