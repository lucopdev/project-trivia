import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class FeedbackPage extends React.Component {
  render() {
    const { score, name, gravatarEmail } = this.props;
    const scoreMinimum = 3;

    const hash = md5(gravatarEmail).toString();
    const gravatarUrl = `https://www.gravatar.com/avatar/${hash}`;

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
        </header>
        <h1>Feedbacks do jogo</h1>
        <p data-testid="feedback-text">
          {
            score >= scoreMinimum ? 'Well Done!' : 'Could be better...'
          }
        </p>
      </section>
    );
  }
}

FeedbackPage.propTypes = {
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(FeedbackPage);
