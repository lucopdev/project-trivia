import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getToken from '../services/fetchAPI';

class Login extends Component {
  state = {
    inputName: '',
    inputEmail: '',
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const token = await getToken();
    localStorage.setItem('token', token);
    const { history } = this.props;
    history.push('/game');
  };

  render() {
    const { inputName, inputEmail } = this.state;
    const isValid = (inputName.length > 0 && inputEmail.length > 0);
    return (
      <div>
        <input
          value={ inputName }
          name="inputName"
          data-testid="input-player-name"
          type="text"
          onChange={ this.handleChange }
        />
        <input
          value={ inputEmail }
          name="inputEmail"
          data-testid="input-gravatar-email"
          type="email"
          onChange={ this.handleChange }
        />
        <button
          data-testid="btn-play"
          disabled={ !isValid }
          onClick={ this.handleClick }
        >
          Play
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
