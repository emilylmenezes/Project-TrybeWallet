// Coloque aqui suas actions

export const LOGIN = 'LOGIN';
export const getUser = (email) => ({ type: LOGIN, payload: email });

export const REQUEST_API = 'REQUEST_API';
export const requestAPI = () => ({ type: REQUEST_API });

export const API_SUCESS = 'SUCESS_API';
export const sucessAPI = (coins) => ({ type: API_SUCESS, payload: coins });

export const API_FAILURE = 'FAILURE_API';
export const failureAPI = (error) => ({ type: API_FAILURE, error });

export const getApi = () => async (dispatch) => {
  dispatch(requestAPI());
  try {
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(url);
    const request = await response.json();
    const filterUSDT = Object.keys(request).filter((element) => element !== 'USDT');
    dispatch(sucessAPI(filterUSDT));
  } catch (error) {
    dispatch(failureAPI(error));
  }
};

export const ADD_EXPENSES = 'ADD_EXPENSES';

export const addExpenses = (payload) => ({ type: ADD_EXPENSES, payload });

export const callApi = (expense) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const getJson = await response.json();
  const result = { expense, getJson };
  dispatch(addExpenses(result));
};

export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const deleteExpense = (payload) => ({ type: DELETE_EXPENSE, payload });
