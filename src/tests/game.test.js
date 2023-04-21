import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Login from '../pages/Login';
import { initialState, token } from './helpers/mocks';
import App from '../App';

describe('Testa a pagina de game', () => {
  beforeEach(()=> {
    localStorage.setItem('token', JSON.stringify(token.token));
  })
  it('Verifica se o nome é renderizado na tela', () => {
    
  });
});