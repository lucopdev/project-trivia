import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import categories from '../tests/helpers/categoryData';
import { changeConfig } from '../redux/action';

class Config extends React.Component {
  state = {
    categoryInput: '',
    typeInput: '',
    difficultyInput: '',
  };

  saveConfiguration = () => {
    const { dispatch } = this.props;
    const { categoryInput, typeInput, difficultyInput } = this.state;

    const configObj = {
      category: categoryInput,
      type: typeInput,
      difficulty: difficultyInput,
    };
    dispatch(changeConfig(configObj));
  };

  handleInput = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  handleChange = (target) => {
    this.handleInput(target);
  };

  render() {
    const { categoryInput, typeInput, difficultyInput } = this.state;
    return (
      <div>

        <h1 data-testid="settings-title">Configurações gerais</h1>

        <select
          data-testid="category-id"
          name="categoryInput"
          value={ categoryInput }
          onChange={ (event) => this.handleChange(event) }
        >
          {categories?.map((category, index) => (
            <option
              value={ category.value }
              key={ index }
            >
              {category.category}
            </option>
          ))}
        </select>

        <select
          data-testid="difficulty-id"
          name="difficultyInput"
          value={ difficultyInput }
          onChange={ (event) => this.handleChange(event) }
        >
          <option value="">Any Difficulty</option>
          <option value="&difficulty=easy">Easy</option>
          <option value="&difficulty=medium">Medium</option>
          <option value="&difficulty=hard">Hard</option>
        </select>

        <select
          data-testid="type-id"
          name="typeInput"
          value={ typeInput }
          onChange={ (event) => this.handleChange(event) }
        >
          <option value="">Any Type</option>
          <option value="&type=multiple">Multiple Choice</option>
          <option value="&type=boolean">True / False</option>
        </select>

        <button
          onClick={ this.saveConfiguration }
        >
          Salvar
        </button>
        <Link to="/">
          <button>
            Voltar
          </button>
        </Link>
      </div>
    );
  }
}

Config.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Config);
