import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import userEvent from '@testing-library/user-event';

describe('', () => {
    test('Teste se a página de login é renderizada', () => {
        const routerAndRedux = renderWithRouterAndRedux(<App />);
        expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
        expect(screen.getByTestId('email-input')).toBeInTheDocument();
        expect(screen.getByTestId('password-input')).toBeInTheDocument();
        expect(routerAndRedux.history.location).toBe('/');
    });

    test('Verificando se o login é feito', () => {
        const routerAndRedux = renderWithRouterAndRedux(<App />);
        userEvent.click(screen.getByRole('button', { name: 'Entrar' }));
        userEvent.type(screen.getByTestId('email-input'), 'alguem@gmail.com');
        userEvent.type(screen.getByTestId('password-input'), '741963');
        expect(routerAndRedux.history.location).toBe('/carteira');
    });
});