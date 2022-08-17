// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  API_SUCESS,
  ADD_EXPENSES,
  DELETE_EXPENSE,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  idSum: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case API_SUCESS:
    return {
      ...state,
      currencies: action.payload,
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, { id: state.idSum,
        ...action.payload.expense,
        exchangeRates: action.payload.getJson },
      ],
      idSum: state.idSum + 1,
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses].filter((acc) => acc.id !== action.payload.id),
    };
  default:
    return state;
  }
};

// Agradeço a minha dev favorita - Izabel Barros - que me auxiliou nesse requisito.
export default wallet;
