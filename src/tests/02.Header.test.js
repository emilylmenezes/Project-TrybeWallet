import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';

const carteira = '/carteira';

describe('', () => {
    test('', () => {
        renderWithRouterAndRedux(<Wallet />);

        expect(screen.getByTestId('email-field')).toBeInTheDocument();
        expect(screen.getByTestId('total-field')).toBeInTheDocument();
    });

    test('', async () => {
        renderWithRouterAndRedux(<Wallet />, carteira);

        const value = screen.getByTestId('value-input');
        const description = screen.getByTestId('description-input');
        const currency = screen.getByTestId('currency-input');
        const method = screen.getByTestId('method-input');
        const tag = screen.getByTestId('tag-input');
        const buttonDelete = screen.getByRole('button', { name: 'Adicionar despesa' });

        
        expect(value).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(currency).toBeInTheDocument();
        expect(method).toBeInTheDocument();
        expect(tag).toBeInTheDocument();
        expect(buttonDelete).toBeInTheDocument();

        userEvent.type(value, 100);
        userEvent.type(description, 'emily');
        userEvent.click(buttonDelete);


        const expense = await screen.findByText('emily');

        const button = await screen.findByRole('button', {  name: /excluir/i});
        userEvent.click(button);

        expect(expense).not.toBeInTheDocument();
    });
});