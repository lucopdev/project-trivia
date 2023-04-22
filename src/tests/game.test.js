import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { initialState, token } from './helpers/initialStateMock';
import Game from '../pages/Game';
import { rankingStorageMock } from './helpers/rankingStorageMock';
import { questions } from './helpers/questionsMock';
// import userEvent from '@testing-library/user-event';
// import Login from './pages/Login';
// import App from './App';

describe('Testa a pagina de game', () => {
  beforeEach(() => {
    localStorage.setItem('token', JSON.stringify(token.token));
    localStorage.setItem('ranking', JSON.stringify(rankingStorageMock));

    const mockQuestions = () => {
      jest.spyOn(global, 'fetch').mockResolvedValue({
        json: () => Promise.resolve(
          questions,
        ),
      });
    };
    mockQuestions();
  });
  it('Verifica se os elementos são renderizado na tela', async () => {
    const { history } = renderWithRouterAndRedux(<Game />, { initialState });
    const responseCode = 3;
    const timeOut = 1000;
    if (questions.response_code === responseCode) {
      expect(!JSON.parse(localStorage.getItem('token')));
      act(() => {
        history.push('/');
      });
      history.location.pathname('/');
    } else {
      const timer = await screen.findByTestId('timer');
      const correctBtn = await screen.findByTestId('correct-answer');

      expect(timer).toBeInTheDocument();
      expect(timer.innerHTML).toBe('30');
      await waitFor(() => {
        expect(timer.innerHTML).toBe('29');
      }, timeOut);
      expect(await screen.findByTestId('question-text')).toBeInTheDocument();
      expect(await screen.findByTestId('question-category')).toBeInTheDocument();
      expect(await screen.findByTestId('answer-options')).toBeInTheDocument();
      expect(correctBtn).toBeInTheDocument();
    }
    // questions.results.forEach( async (questionA, outerIndex) => {
    //   const correctBtn = await screen.findByTestId('correct-answer');
    //   expect(correctBtn).toBeInTheDocument();
    //   userEvent.click(correctBtn);
    //   if (questionA.correct_answer === correctBtn.innerHTML) {

    //   } else {
    //     questions.results.forEach( async (questionB, innerIndex) => {
    //       const incorrectBtn = await screen.findByTestId(`wrong-answer-${innerIndex}`);

    //     });
    //   }
    // });
  });
});
