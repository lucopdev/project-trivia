import React, { Component } from 'react';
import PropTypes from 'prop-types';

import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name, score, gravatarEmail } = this.props;

    const hash = md5(gravatarEmail).toString();
    const gravatarUrl = `https://www.gravatar.com/avatar/${hash}`;

    return (
      <div className="header-container">
        <img
          data-testid="header-profile-picture"
          src={ gravatarUrl }
          alt="avatar"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
