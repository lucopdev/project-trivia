import React from 'react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from "./helpers/renderWithRouterAndRedux";
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Login from '../pages/Login';
import { initialState, token } from './helpers/initialStateMock';
import App from '../App';
import Ranking from '../pages/Ranking';
import { rankingStorageMock } from './helpers/rankingStorageMock';

describe('Testa a pagina de Rank', () => {
  beforeEach(()=> {
    localStorage.setItem('ranking', JSON.stringify(rankingStorageMock));
  })
  it('Verifica se o logo é renderizado na tela', async () => {
    const { store } = renderWithRouterAndRedux(<Ranking />, { initialState });
    
      const avatar = screen.getAllByAltText('player-avatar')[0];
      expect(avatar).toBeInTheDocument();
  });
});