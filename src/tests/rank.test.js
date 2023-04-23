import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Ranking from '../pages/Ranking';
import { rankingStorageMock } from './helpers/rankingStorageMock';
// import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
// import Login from './pages/Login';
// import App from './App';

describe('Testa a pagina de Rank', () => {
  beforeEach(() => {
    localStorage.setItem('ranking', JSON.stringify(rankingStorageMock));
  });
  it('Verifica se o logo é renderizado na tela', async () => {
    renderWithRouterAndRedux(<Ranking />);

    const avatar = screen.getAllByAltText('player-avatar')[0];
    expect(avatar).toBeInTheDocument();
  });
});
