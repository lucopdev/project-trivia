import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback';
import { rankingStorageMock } from './helpers/rankingStorageMock';
import Configs from '../pages/Configs';
import App from '../App';

describe('Testa a pagina de configuração', () => {
  it('Testa se os elementos estão presentes na tela', () => {
   const { history } = renderWithRouterAndRedux(<App />)
   const btnConfig = screen.getByRole('button', { name: /configurações/i });
    userEvent.click(btnConfig);

    const title = screen.getByRole('heading', { name: /configurações gerais/i });
    const btnSave = screen.getByRole('button', { name: /salvar/i });
    const btnVoltar = screen.getByRole('button', { name: /voltar/i });
    const category = screen.getByTestId('category-id');
    const difficulty = screen.getByTestId('difficulty-id');
    const type = screen.getByTestId('type-id');

    expect(history.location.pathname).toBe('/configuration')
    expect(title).toBeInTheDocument();
    expect(btnSave).toBeInTheDocument();
    expect(btnVoltar).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(difficulty).toBeInTheDocument();
    expect(type).toBeInTheDocument();

    userEvent.selectOptions(screen.getByTestId('category-id'), 'Sports');
    expect(screen.getByText('Sports').selected).toBe(true);
    userEvent.selectOptions(screen.getByTestId('difficulty-id'), 'Easy');
    expect(screen.getByText('Easy').selected).toBe(true);
    userEvent.selectOptions(screen.getByTestId('type-id'), 'True / False');
    expect(screen.getByText('True / False').selected).toBe(true);
    
    userEvent.click(btnSave);
    userEvent.click(btnVoltar);
    expect(history.location.pathname).toBe('/');

  });
});