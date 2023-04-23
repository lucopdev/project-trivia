import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getToken from '../services/fetchAPI';
import Button from '../components/ButtonConfig';
import { addUser } from '../redux/action';
import logoTrivia from '../trivia.png';
import '../styles/login.css';

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
    localStorage.setItem('token', token.token);
    const { history, dispatch } = this.props;
    const { inputEmail, inputName } = this.state;
    const userObject = {
      inputEmail,
      inputName,
    };
    dispatch(addUser(userObject));
    history.push('/game');
  };

  render() {
    const { inputName, inputEmail } = this.state;
    const isValid = (inputName.length > 0 && inputEmail.length > 0);
    return (
      <div className="main-login">
        <img className="logo-trivia" src={ logoTrivia } alt="logo-trivia" />
        <input
          value={ inputName }
          name="inputName"
          data-testid="input-player-name"
          type="text"
          placeholder="nome"
          onChange={ this.handleChange }
        />
        <input
          value={ inputEmail }
          name="inputEmail"
          type="email"
          data-testid="input-gravatar-email"
          placeholder="email"
          onChange={ this.handleChange }
        />
        <button
          data-testid="btn-play"
          disabled={ !isValid }
          onClick={ this.handleClick }
        >
          Play
        </button>
        <Button />
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
