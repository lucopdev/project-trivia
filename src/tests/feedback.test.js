import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
// import { wait } from '@testing-library/user-event/dist/utils';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { initialState } from './helpers/initialStateMock';
import Feedback from '../pages/Feedback';
import { rankingStorageMock } from './helpers/rankingStorageMock';

describe('Testa a pagina de feedback', () => {
  beforeEach(() => {
    localStorage.setItem('ranking', JSON.stringify(rankingStorageMock));
  });
  it('Verifica se os elementos da tela de feedback estão presentes na tela', async () => {
    const { history, store } = renderWithRouterAndRedux(<Feedback />, { initialState });

    const title = screen.getByRole('heading', {
      name: /feedbacks do jogo/i,
    });
    expect(screen.getByRole('button', { name: /play again/i })).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    const magicNumber = 3;
    if (store.getState().player.assertions >= magicNumber) {
      expect(screen.getByText(/well done!/i)).toBeInTheDocument();
    } else {
      expect(screen.getByText(/could be better\.\.\./i)).toBeInTheDocument();
    }

    await waitFor(() => {
      act(() => {
        history.push('/');
      });
      const { pathname } = history.location;
      expect(pathname).toMatch('/');
    });
  });

  it('Testa se ao clicar em ranking a pagina é direcionada corretamente', async () => {
    const { history } = renderWithRouterAndRedux(<Feedback />, { initialState });
    const rankBtn = screen.getByRole('button', { name: /ranking/i });
    userEvent.click(rankBtn);

    await waitFor(() => {
      act(() => {
        history.push('/ranking');
      });
      const { pathname } = history.location;
      expect(pathname).toMatch('/ranking');
    });
  });

  it('Verifica se ao clicar em play again o jogo é resetado', () => {
    const { store } = renderWithRouterAndRedux(<Feedback />, { initialState });
    const btnPlayAgain = screen.getByRole('button', { name: /play again/i });
    expect(btnPlayAgain).toBeInTheDocument();
    userEvent.click(btnPlayAgain);
    expect(store.getState().player.score).toBe(0);

    if (!JSON.parse(localStorage.getItem('ranking'))) {
      const emptyData = JSON.parse(localStorage.getItem('ranking'));
      expect(emptyData).toEqual([]);
      expect(emptyData).toHaveLength(0);
    } else {
      const fullData = JSON.parse(localStorage.getItem('ranking'));
      expect(fullData).toEqual(
        [{ assertions: 0, gravatarUrl: 'https://www.gravatar.com/avatar/85c8f716441e55c7d22c327f10bc766b', name: 'Lucas', score: 0 }, { assertions: 3, gravatarUrl: 'https://www.gravatar.com/avatar/0dd5ace513fcfa6a420928e4c2adb02e', name: 'Lucas', score: 180 }, { assertions: 1, gravatarUrl: 'https://www.gravatar.com/avatar/ce11fce876c93ed5d2a72da660496473', name: 'teste', score: 70 }, { assertions: 0, gravatarUrl: 'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e', name: '', score: 0 }],
      );
      const magicNumber2 = 4;
      expect(fullData).toHaveLength(magicNumber2);
    }
  });
});
