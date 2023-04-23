import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback';
import { rankingStorageMock } from './helpers/rankingStorageMock';
// import { wait } from '@testing-library/user-event/dist/utils';

describe('Testa a pagina de feedback', () => {
  beforeEach(() => {
    localStorage.setItem('ranking', JSON.stringify(rankingStorageMock));
  });
  it('Verifica se os elementos da tela de feedback estão presentes na tela', async () => {
    const { history, store } = renderWithRouterAndRedux(<Feedback />);

    const title = screen.getByRole('heading', {
      name: /feedbacks do jogo/i,
    });
    expect(screen.getByRole('button', { name: /play again/i })).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    const magicNumber = 3;
    const feedbackText = screen.getByTestId('feedback-text');

    if (store.getState().player.assertions >= magicNumber) {
      expect(feedbackText.innerHTML).toBe('Well done!');
    } else {
      expect(feedbackText.innerHTML).toBe('Could be better...');
    }

    await waitFor(() => {
      history.push('/');
      const { pathname } = history.location;
      expect(pathname).toMatch('/');
    });
  });

  it('Testa se ao clicar em ranking a pagina é direcionada corretamente', async () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);
    const rankBtn = screen.getByRole('button', { name: /ranking/i });
    userEvent.click(rankBtn);

    await waitFor(() => {
      history.push('/ranking');
      const { pathname } = history.location;
      expect(pathname).toMatch('/ranking');
    });
  });

  it('Verifica se ao clicar em play again o jogo é resetado', () => {
    const { store } = renderWithRouterAndRedux(<Feedback />);
    const emptyData = JSON.parse(localStorage.getItem('ranking'));
    const dataLength = 4;
    expect(emptyData).toHaveLength(dataLength);
    const btnPlayAgain = screen.getByRole('button', { name: /play again/i });
    expect(btnPlayAgain).toBeInTheDocument();
    userEvent.click(btnPlayAgain);
    expect(store.getState().player.score).toBe(0);

    if (!JSON.parse(localStorage.getItem('ranking'))) {
      const emptyData2 = JSON.parse(localStorage.getItem('ranking'));
      expect(emptyData2).toEqual([]);
      expect(emptyData2).toHaveLength(0);
    }
  });
  it('Testa se ao iniciar a tela de feedback, o localStorage está vazio', () => {
    renderWithRouterAndRedux(<Feedback />, { initialEntries: ['/feedback'] })
    const emptyData = JSON.parse(localStorage.getItem([]));
    console.log(emptyData);
  });
});
