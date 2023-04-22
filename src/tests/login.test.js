import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Login from '../pages/Login';
// import { initialState, token } from './helpers/mocks';
import App from '../App';

const testeConstant = 'teste';
const testeEmailConstant = 'teste@teste.com';
const inputPlayerNameConstant = 'input-player-name';
const inputGravatarEmailConstant = 'input-gravatar-email';

describe('Testa a pagina de login', () => {
  // beforeEach(()=> {
  //   localStorage.setItem('token', JSON.stringify(token.token));
  // })
  it('Verifica se o logo é renderizado na tela', () => {
    renderWithRouterAndRedux(<Login />);
    const logoTrivia = screen.getByRole('img', { name: /logo-trivia/i });
    expect(logoTrivia).toBeInTheDocument();
  });

  it('verifica se os inputs são renderizados na tela', () => {
    renderWithRouterAndRedux(<Login />);
    const inputName = screen.getByTestId(inputPlayerNameConstant);
    const inputEmail = screen.getByTestId(inputGravatarEmailConstant);
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

  it('Testa se ao clicar em play, é carregada a pagina do game', async () => {
    const { history, store } = renderWithRouterAndRedux(<App />);
    const btnPlay = screen.getByRole('button', { name: /play/i });
    const inputName = screen.getByTestId(inputPlayerNameConstant);
    const inputEmail = screen.getByTestId(inputGravatarEmailConstant);
    expect(btnPlay).toBeDisabled();
    userEvent.type(inputName, testeConstant);
    expect(inputName.value).toBe(testeConstant);
    userEvent.type(inputEmail, testeEmailConstant);
    expect(inputEmail.value).toBe(testeEmailConstant);
    expect(btnPlay).toBeEnabled();
    userEvent.click(btnPlay);

    await waitFor(() => {
      act(() => {
        history.push('/game');
      });
      const { pathname } = history.location;
      expect(pathname).toMatch('/game');

      const state = store.getState();
      expect(state.player.name).toEqual(testeConstant);
    });
  });

  it('Testa se ao clicar em configurações os elementos surgem na tela', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const btnPlay = screen.getByRole('button', { name: /play/i });
    const inputName = screen.getByTestId(inputPlayerNameConstant);
    const inputEmail = screen.getByTestId(inputGravatarEmailConstant);
    expect(btnPlay).toBeDisabled();
    userEvent.type(inputName, testeConstant);
    expect(inputName.value).toBe(testeConstant);
    userEvent.type(inputEmail, testeEmailConstant);
    expect(inputEmail.value).toBe(testeEmailConstant);
    expect(btnPlay).toBeEnabled();
    userEvent.click(btnPlay);

    const btnConfig = screen.getByRole('button', { name: /configurações/i });
    expect(btnConfig).toBeInTheDocument();
    userEvent.click(btnConfig);

    await waitFor(() => {
      act(() => {
        history.push('/configuracoes');
      });
      const { pathname } = history.location;
      expect(pathname).toMatch('/configuracoes');
      const titleConfig = screen.getByRole('heading', {
        name: /configurações gerais/i,
      });
      expect(titleConfig).toBeInTheDocument();
    });
  });
});
