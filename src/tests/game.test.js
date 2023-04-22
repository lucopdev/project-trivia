import React from 'react';
// import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
// import Login from './pages/Login';
import { initialState, token } from './helpers/initialStateMock';
// import App from './App';
import Game from '../pages/Game';
import { rankingStorageMock } from './helpers/rankingStorageMock';
import { questions } from './helpers/questionsMock';

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
    renderWithRouterAndRedux(<Game />, { initialState });

    expect(await screen.findByTestId('timer')).toBeInTheDocument();
    expect(await screen.findByTestId('question-text')).toBeInTheDocument();
    expect(await screen.findByTestId('question-category')).toBeInTheDocument();
    expect(await screen.findByTestId('answer-options')).toBeInTheDocument();
    const correctBtn = await screen.findByTestId('correct-answer');

    expect(correctBtn).toBeInTheDocument();

    if(questions.response_code === 3) {
      expect(!JSON.parse(localStorage.getItem('token')));
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
