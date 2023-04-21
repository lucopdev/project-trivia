import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Login from '../pages/Login';
import { initialState, token } from './helpers/mocks';
import App from '../App';

describe('Testa a pagina de login', () => {
  beforeEach(()=> {
    localStorage.setItem('token', JSON.stringify(token.token));
  })
  it('Verifica se o logo é renderizado na tela', () => {
    renderWithRouterAndRedux(<Login />);
    const logoTrivia = screen.getByRole('img', { name: /logo\-trivia/i });
    expect(logoTrivia).toBeInTheDocument();
  });
  
  it('verifica se os inputs são renderizados na tela', () => {
    renderWithRouterAndRedux(<Login />);
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
  });
  
  it('verifica se os botões play e configuração estão sendo renderizados na tela', () => {
    renderWithRouterAndRedux(<Login />);
    const btnPlay = screen.getByRole('button', { name: /play/i });
    const btnConfig = screen.getByRole('button', { name: /configurações/i });
    expect(btnPlay).toBeInTheDocument();
    expect(btnConfig).toBeInTheDocument();
 
  });

  it('verifica se ao clicar no botão play, os dados são armazenados e é carregada a pagina do game', async () => {
    const { history, store } = renderWithRouterAndRedux(<App />);
    const btnPlay = screen.getByRole('button', { name: /play/i });
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    expect(btnPlay).toBeDisabled();
    userEvent.type(inputName, 'teste');
    expect(inputName.value).toBe('teste');
    userEvent.type(inputEmail, 'teste@teste.com')
    expect(inputEmail.value).toBe('teste@teste.com');
    expect(btnPlay).toBeEnabled();
    userEvent.click(btnPlay);

    await waitFor(()=> {
      act(()=> {
        history.push('/game');
      });
      const { pathname } = history.location;
      expect(pathname).toMatch('/game');
      
      const state = store.getState();
      expect(state.player.name).toEqual('teste');
    });
  });
});
