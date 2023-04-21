export const token = {
  response_code: 0,
  response_message: "Token Generated Successfully!",
  token: 'e798f25a068f16cca3cff72e1e2abd89c7e9bca9fa482d7b2df06ca88f0637cc',
};

export const initialState = {
  player: {
    name: 'teste',
    assertions: 2,
    score: 80,
    gravatarEmail: 'teste@teste.com',
  },
  game: {
    questions: {
      response_code: 0,
      results: [
        {
          category: "Entertainment: Video Games",
          type: "multiple",
          difficulty: "easy",
          question: "Which of these is NOT a main playable character in &quot;Grand Theft Auto V&quot;?",
          correct_answer: "Lamar",
          incorrect_answers: [
            "Trevor",
            "Michael",
            "Franklin"
          ]
        },
        {
          category: "History",
          type: "multiple",
          difficulty: "medium",
          question: "What was the name of one of the surviving palaces of Henry VIII located near Richmond, London?",
          correct_answer: "Hampton Court",
          incorrect_answers: [
            "St James&#039;s Palace",
            "Buckingham Palace",
            "Coughton Court"
          ]
        },
        {
          category: "Politics",
          type: "boolean",
          difficulty: "hard",
          question: "Nazi Germany surrendered on Harry Truman&#039;s birthday while he was president.",
          correct_answer: "True",
          incorrect_answers: [
            "False"
          ]
        },
        {
          category: "Entertainment: Video Games",
          type: "multiple",
          difficulty: "medium",
          question: "In the &quot;Call Of Duty: Zombies&quot; map &quot;Der Riese&quot;, what is the name of the &quot;Pack-A-Punched PPSH-41&quot;?",
          correct_answer: "The Reaper",
          incorrect_answers: [
            "Lamentation",
            "The Grim Reaper",
            "The Eviscerator  "
          ]
        },
        {
          category: "Entertainment: Television",
          type: "multiple",
          difficulty: "medium",
          question: "In &quot;The Simpsons&quot;, what is the real name of &quot;Comic Book Guy&quot;?",
          correct_answer: "Jeff Albertson",
          incorrect_answers: [
            "Comic Book Guy",
            "Edward Stone",
            "Jack Richardson"
          ]
        }
      ]
    }
  },
  ranking: {
    playersList: [
      {
        name: "",
        score: 150,
        gravatarUrl: "https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e",
        assertions: 3,
      }
    ],
    orderedRanking: [],
  }
}
