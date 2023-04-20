import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchEndpointQA } from '../redux/action';
import Header from '../components/Header';

class Game extends Component {
  state = {
    qaRandom: [],
    isCorrect: false,
    counter: 0,
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const { dispatch } = this.props;
    await dispatch(fetchEndpointQA(token));
    this.randomizeQA();
    this.isValidToken();
  }

  isValidToken = async () => {
    const { questions, history } = this.props;
    console.log(questions);
    const LOGOUT_CODE = 3;
    if (questions.response_code === LOGOUT_CODE) {
      localStorage.removeItem('token');
      history.push('/');
    }
  };

  // counter = () => {
  //   this.setState((prevState) => ({
  //     counter: prevState.counter + 1,
  //   }));
  // };

  randomizeQA = () => {
    const { questions } = this.props;
    const { counter } = this.state;
    const incorrectAnswer = questions.results[counter].incorrect_answers;
    const correctAnswer = questions.results[counter].correct_answer;
    this.setState({
      qaRandom: [...incorrectAnswer, correctAnswer],
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

  verifyIsCorrect = ({ target }, answer) => {
    const verify = target.innerHTML === answer;
    this.setState({
      isCorrect: verify,
    }, () => {
      const { isCorrect } = this.state;
      console.log(isCorrect);
    });
  };

  handleClick = async (element, correctAnswer) => {
    this.verifyIsCorrect(element, correctAnswer);
    this.setState({
      isCorrect: false,
    });
  };

  render() {
    const { questions } = this.props;
    console.log(questions);
    const { counter, qaRandom, isCorrect } = this.state;
    const styleCorrect = {
      color: 'white',
      backgroundColor: 'green',
    };
    const styleIncorrect = {
      color: 'white',
      backgroundColor: 'grey',
    };
    return (
      <div>
        <Header />
        {questions.results?.map((question, index) => (
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
                        style={ isCorrect
                           && (answer === question.correct_answer)
                          ? styleCorrect : styleIncorrect }
                        key={ innerIndex }
                        data-testid={
                          (answer === question.correct_answer)
                            ? 'correct-answer' : `wrong-answer-${innerIndex}`
                        }
                        onClick={
                          (target) => this.handleClick(target, question.correct_answer)
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
