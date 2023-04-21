import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { Link } from 'react-router-dom';
import { addPlayerScore, resetGame } from '../redux/action';

class FeedbackPage extends React.Component {
  playAgainFunc = () => {
    const { dispatch } = this.props;
    dispatch(resetGame());
  };

  render() {
    const { score, name, gravatarEmail, assertions, dispatch } = this.props;
    const scoreMinimum = 3;

    if (!JSON.parse(localStorage.getItem('ranking'))) {
      localStorage.setItem('ranking', JSON.stringify([]));
    }

    const currentStorage = JSON.parse(localStorage.getItem('ranking'));

    const hash = md5(gravatarEmail).toString();
    const gravatarUrl = `https://www.gravatar.com/avatar/${hash}`;

    const savedPlayer = {
      name,
      score,
      gravatarUrl,
      assertions,
    };

    const saveToStorage = [...currentStorage, savedPlayer];
    localStorage.setItem('ranking', JSON.stringify(saveToStorage));
    dispatch(addPlayerScore(savedPlayer));

    return (
      <section className="info-score">
        <header className="info-gamer">
          <img
            data-testid="header-profile-picture"
            src={ gravatarUrl }
            alt={ name }
            className="avatar-img"
          />
          <h1 data-testid="header-player-name">{ name }</h1>
          <p data-testid="header-score">
            { score }
          </p>
          <p data-testid="feedback-total-score">
            { score }
          </p>
          <p data-testid="feedback-total-question">
            { assertions }
          </p>
        </header>
        <h1>Feedbacks do jogo</h1>
        <p data-testid="feedback-text">
          {
            assertions >= scoreMinimum ? 'Well Done!' : 'Could be better...'
          }
        </p>
        <Link to="/">
          <button
            data-testid="btn-play-again"
            onClick={ this.playAgainFunc }
          >
            Play again
          </button>
        </Link>

        <Link to="/ranking">
          <button
            data-testid="btn-ranking"
            type="button"
          >
            Ranking
          </button>
        </Link>
      </section>
    );
  }
}

FeedbackPage.propTypes = {
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(FeedbackPage);
