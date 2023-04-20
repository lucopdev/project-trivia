import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { changeScore } from '../redux/action';

class Game extends Component {
  state = {
    qaRandom: [],
    displayAnswer: false,
    counter: 0,
    data: {},
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    // const { dispatch } = this.props;
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    this.isValidToken(data);
    this.setState({
      displayAnswer: false,
      data,
    });
  }

  isValidToken = (data) => {
    const { history } = this.props;
    const LOGOUT_CODE = 3;

    if (data.response_code === LOGOUT_CODE) {
      localStorage.removeItem('token');
      history.push('/');
      return;
    }
    this.randomizeQA(data);
  };

  randomizeQA = (data) => {
    const { counter } = this.state;
    const incorrectAnswer = data.results[counter].incorrect_answers;
    const correctAnswer = data.results[counter].correct_answer;
    this.setState({
      qaRandom: [correctAnswer, ...incorrectAnswer],
    }, () => {
      const { qaRandom } = this.state;
      for (let i = qaRandom.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [qaRandom[i], qaRandom[j]] = [qaRandom[j], qaRandom[i]];
      }
      this.setState({
        qaRandom,
      });
    });
  };

  verifyIsCorrect = (element, correctAnswer) => {
    const verify = element.innerHTML === correctAnswer;
    console.log(verify);
    this.setState({
      displayAnswer: true,
    });
    return verify;
  };

  scoreTable = (element, correctAnswer, difficulty) => {
    const { dispatch } = this.props;
    const time = 30; // colocar o timer correto do estado
    const hard = 3;
    const medium = 2;
    const easy = 1;
    const correctPoint = 10;
    let sum = 0;

    if (difficulty === 'easy') sum = correctPoint + (time * easy);
    if (difficulty === 'medium') sum = correctPoint + (time * medium);
    if (difficulty === 'hard') sum = correctPoint + (time * hard);

    if (this.verifyIsCorrect(element, correctAnswer)) {
      dispatch(changeScore(sum));
    }
  };

  handleClick = async (element, correctAnswer, difficulty) => {
    this.scoreTable(element, correctAnswer, difficulty);
  };

  render() {
    const { counter, qaRandom, displayAnswer, data } = this.state;
    const styleCorrect = {
      border: '3px solid rgb(6, 240, 15)',
    };
    const styleIncorrect = {
      border: '3px solid red',
    };
    return (
      <div>
        <Header />
        {data.results?.map((question, index) => (
          <div key={ index }>
            {index === counter
            && (
              <div>
                <div>
                  <h2
                    data-testid="question-text"
                    dangerouslySetInnerHTML={ { __html: question.question } }
                  />
                  <p
                    data-testid="question-category"
                  >
                    {question.category}
                  </p>
                  <div
                    data-testid="answer-options"
                  >
                    {qaRandom.map((answer, innerIndex) => (
                      <button
                        style={ displayAnswer
                           && (answer === question.correct_answer)
                          ? styleCorrect : styleIncorrect }
                        key={ innerIndex }
                        data-testid={
                          (answer === question.correct_answer)
                            ? 'correct-answer' : `wrong-answer-${innerIndex}`
                        }
                        onClick={
                          ({ target }) => (
                            this
                              .handleClick(
                                target,
                                question.correct_answer,
                                question.difficulty,
                              ))
                        }
                        label={ answer }
                        dangerouslySetInnerHTML={ { __html: answer } }
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  score: state.player.score,
});

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  questions: PropTypes.shape(({
    response_code: PropTypes.number,
    results: PropTypes.arrayOf(PropTypes.shape({
      correct_answer: PropTypes.string,
      incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    })),
  })).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Game);
