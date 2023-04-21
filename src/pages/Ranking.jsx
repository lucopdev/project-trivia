import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  state = {
    orderedRanking: [],
  };

  componentDidMount() {
    if (!JSON.parse(localStorage.getItem('ranking'))) {
      localStorage.setItem('ranking', []);
    }
    const listFromStorage = JSON.parse(localStorage.getItem('ranking'));
    const orderedRanking = listFromStorage.sort((a, b) => b.score - a.score);
    this.setState({ orderedRanking });
  }

  render() {
    const { orderedRanking } = this.state;
    return (
      <div className="ranking-container">
        <h1 data-testid="ranking-title">Ranking</h1>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Home
          </button>
        </Link>

        <ul>
          {
            orderedRanking.sort((a, b) => b.score - a.score).map((player, index) => (
              <li key={ index }>
                <img src={ player.gravatarUrl } alt="" />
                <p data-testid={ `player-name-${index}` }>{ player.name }</p>
                <p data-testid={ `player-score-${index}` }>{ player.score }</p>
              </li>
            ))
          }
        </ul>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  rankingList: state.ranking.playersList,
});

export default connect(mapStateToProps)(Ranking);
