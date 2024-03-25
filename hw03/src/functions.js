export async function GetNewToken() {
  const response = await fetch(
    "https://opentdb.com/api_token.php?command=request",
  );
  const data = await response.json();
  console.log(data);

  if (Number(data.response_code) === 0) {
    console.log(data.token);
    return data.token;
  } else {
    throw new Error(
      "Failed to get token, response code: " + data.response_code,
    );
  }
}

export const GetNewQuestionSet = async (token) => {
  if (token === "") {
    throw new Error("Token is empty");
  }

  const response = await fetch(
    "https://opentdb.com/api.php?amount=3&category=9&difficulty=easy&type=multiple&encode=url3986&token=" +
      token,
  );
  const data = await response.json();
  console.log(data);

  if (data.response_code !== 0) {
    throw new Error(
      "Failed to get question, response code: " + data.response_code,
    );
  }

  // return three question objects
  let questionSet = [];
  for (let i = 0; i < 3; i++) {
    questionSet.push({
      question: decodeURIComponent(data.results[i].question),
      correctAnswer: decodeURIComponent(data.results[i].correct_answer),
      incorrectAnswers: data.results[i].incorrect_answers.map((answer) =>
        decodeURIComponent(answer),
      ),
    });
  }

  return questionSet;
};
