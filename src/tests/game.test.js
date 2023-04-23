import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { token } from './helpers/initialStateMock';
import Game from '../pages/Game';
import { rankingStorageMock } from './helpers/rankingStorageMock';
import { questions } from './helpers/questionsMock';
import { act } from 'react-dom/test-utils';

describe('Testa a pagina de game', () => {
  
  beforeEach(() => {
    localStorage.setItem('token', JSON.stringify(token.token));
    localStorage.setItem('ranking', JSON.stringify(rankingStorageMock));

    const mockQuestions = () => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(questions),
      });
    };
    mockQuestions();
    jest.useFakeTimers();
  });

  it('Verifica se os elementos são renderizado na tela', async () => {
    const { history } = renderWithRouterAndRedux(<Game />);
    const LOGOUT_CODE = 3;
    const timeOut = 2000;

    if (questions.response_code === LOGOUT_CODE) {
      expect(!JSON.parse(localStorage.getItem('token')));
      history.push('/');
      history.location.pathname('/');
    } else {
      const timer = await screen.findByTestId('timer');
      const correctBtn = await screen.findByTestId('correct-answer');

      expect(timer).toBeInTheDocument();
      expect(timer.innerHTML).toBe('30');
  
      await waitFor(() => {
        expect(timer.innerHTML).toBe('29');
      }, timeOut);
      // jest.advanceTimersByTime(300000);
      expect(await screen.findByTestId('question-text')).toBeInTheDocument();
      expect(await screen.findByTestId('question-category')).toBeInTheDocument();
      expect(await screen.findByTestId('answer-options')).toBeInTheDocument();
      expect(correctBtn).toBeInTheDocument();
      userEvent.click(correctBtn);
      expect(correctBtn).toBeDisabled();
      // espera que o timer tenha o valor pausado

        const nextBtn = screen.queryByRole('button', { name: /next/i });
        expect(nextBtn).toBeInTheDocument();
        userEvent.click(nextBtn);
        expect(timer.innerHTML).toBe('30');
    
    }
    jest.useRealTimers();
  });
});
