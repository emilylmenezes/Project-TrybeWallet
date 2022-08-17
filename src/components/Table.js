import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../redux/actions/index';
import '../style/Table.css';

class Table extends Component {
onDeleteClick = (coins) => {
  const { onDeleteExpense } = this.props;
  onDeleteExpense(coins);
}

render() {
  const { expenses } = this.props;
  return (
    <div>
      <table>
        <thead>
          <tr className="form-table">
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody className="tbody-table">
          {expenses.map((element) => (
            <tr key={ element.id }>
              <td>{element.description}</td>
              <td>{element.tag}</td>
              <td>{element.method}</td>
              <td>{ parseFloat(element.value).toFixed(2)}</td>
              <td>
                { element.exchangeRates[element.currency].name}
              </td>
              <td>
                { (parseFloat(element.exchangeRates[element.currency].ask).toFixed(2))}
              </td>
              <td>
                {(parseFloat(element.value)
                    * parseFloat(element.exchangeRates[element.currency].ask))
                  .toFixed(2) }
              </td>
              <td>Real</td>
              <td>
                <button
                  data-testid="edit-btn"
                  type="button"
                  className="button-editar"
                >
                  Editar
                </button>
                <button
                  data-testid="delete-btn"
                  className="button-excluir"
                  type="button"
                  onClick={ () => this.onDeleteClick(element) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.obj).isRequired,
  onDeleteExpense: PropTypes.func.isRequired,
};

const mapDispatchToProps = (setDispatch) => ({
  onDeleteExpense: (setExpense) => setDispatch(deleteExpense(setExpense)),
});

const mapStateToProps = (state) => ({ expenses: state.wallet.expenses });

export default connect(mapStateToProps, mapDispatchToProps)(Table);
