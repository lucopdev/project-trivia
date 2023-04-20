import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { fetchEndpointQA } from '../redux/action';
import Header from '../components/Header';

class Game extends Component {
  state = {
    qaRandom: [],
    isCorrect: false,
    counter: 0,
    data: {},
    toRespond: false,
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    // const { dispatch } = this.props;
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    this.isValidToken(data);

    this.setState({
      isCorrect: false,
      data,
      toRespond: false,
    });
  }

  isValidToken = (data) => {
    const { history } = this.props;
    console.log(data);
    const LOGOUT_CODE = 3;

    if (data.response_code === LOGOUT_CODE) {
      localStorage.removeItem('token');
      history.push('/');
      return;
    }
    this.randomizeQA(data);
  };

  // counter = () => {
  //   this.setState((prevState) => ({
  //     counter: prevState.counter + 1,
  //   }));
  // };

  randomizeQA = (data) => {
    // const { questions } = this.props;
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

  verifyIsCorrect = () => {
    this.setState({
      isCorrect: true,
    });
  };

  handleClick = async (element, correctAnswer) => {
    this.verifyIsCorrect(element, correctAnswer);
    this.setState({ toRespond: true });
  };

  nextClick = () => {
    this.setState((prevState) => ({
      counter: prevState.counter + 1,
      toRespond: false,
    }));
  };

  render() {
    // const { questions } = this.props;
    const { counter, qaRandom, isCorrect, data, toRespond } = this.state;
    console.log(isCorrect);
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
        {
          toRespond && (
            <button
              data-testid="btn-next"
              onClick={ () => this.nextClick() }
            >
              Next
            </button>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.game.questions,
});

Game.propTypes = {
  // dispatch: PropTypes.func.isRequired,
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
