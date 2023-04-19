import React from 'react';
import { Redirect } from 'react-router-dom';

class Button extends React.Component {
  constructor() {
    super();

    this.state = {
      isClicked: false,
    };
  }

  configButton = () => {
    this.setState({ isClicked: true });
  };

  render() {
    const { isClicked } = this.state;

    if (isClicked) return (<Redirect to="/configuracoes" />);

    return (
      <button
        data-testid="btn-settings"
        onClick={ () => this.configButton() }
      >
        Configurações
      </button>
    );
  }
}

export default Button;
