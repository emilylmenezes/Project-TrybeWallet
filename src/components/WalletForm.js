import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getApi, callApi } from '../redux/actions';
import '../style/WalletForm.css';

class WalletForm extends Component {
  constructor() {
    super();
    this.Form = { value: '', description: '' };

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

componentDidMount = () => {
  const { currenciesDispatch } = this.props;
  currenciesDispatch();
}

 onInputChange = ({ target }) => {
   const { name, value } = target;
   this.setState({
     [name]: value,
   });
 };

onButtonClick = async () => {
  const { setCallApiAll } = this.props;
  setCallApiAll(this.state);
  this.setState(this.Form);
}

render() {
  const { value, description, currency, method, tag } = this.state;
  const { currencies } = this.props;
  return (

    <form autoComplete="off">
      <div className="container-walletform">
        <label htmlFor="input-value">
          Valor:
          <br />
          <input
            data-testid="value-input"
            type="number"
            placeholder="Valor das Despesas"
            name="value"
            value={ value }
            id="value"
            onChange={ this.onInputChange }
          />
        </label>

        <label htmlFor="description">
          Descrição:
          <br />
          <input
            data-testid="description-input"
            placeholder="Descrição da Despesa"
            type="text"
            id="description"
            onChange={ this.onInputChange }
            value={ description }
            name="description"
          />
        </label>

        <label htmlFor="coins">
          Moeda:
          <br />
          <select
            data-testid="currency-input"
            name="currency"
            id="currency"
            value={ currency }
            onChange={ this.onInputChange }
          >
            {
              currencies.map((element) => (
                <option
                  name="currencies-coins"
                  value={ element }
                  key={ element }
                >
                  { element }
                </option>
              ))
            }
          </select>
        </label>

        <label htmlFor="method">
          Pagamento:
          <br />
          <select
            name="method"
            value={ method }
            data-testid="method-input"
            id="method"
            onChange={ this.onInputChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="category">
          Categoria:
          <br />
          <select
            data-testid="tag-input"
            id="category"
            name="tag"
            value={ tag }
            onChange={ this.onInputChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          name="addDespesas"
          className="button"
          onClick={ this.onButtonClick }
        >
          Adicionar despesa
        </button>
      </div>
    </form>
  );
}
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (setDispatch) => ({
  currenciesDispatch: () => setDispatch(getApi()),
  setCallApiAll: (data) => setDispatch(callApi(data)),
});

WalletForm.propTypes = {
  currenciesDispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  setCallApiAll: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

// Gostaria de agradecer a Cássia Avellar, a Maria Clara por ter me ajudado nesse requisito que tirou meu sono por 3 dias
// E, gostaria de agradecer especialmente a meu amigo Matheus Rocha por ter perdido a tarde de domingo para perceber que meu select estava com letras minúsculas e por isso meu teste estava quebrando
