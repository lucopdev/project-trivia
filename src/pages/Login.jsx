import React, { Component } from 'react';

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
        >
          Play
        </button>
      </div>
    );
  }
}

export default Login;
