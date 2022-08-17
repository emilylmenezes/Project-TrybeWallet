import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser } from '../redux/actions';
import '../style/Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isSaveButtonDisabled: true,
    };
  }

onInputChange = ({ target }) => {
  const { name, value } = target;
  this.setState({
    [name]: value,
  }, () => { this.onHandleButton(); });
};

 onHandleButton = () => {
   const { email, password } = this.state;
   const valueMin = 6;
   const regex = /\S+@\S+\.\S+/;
   if (password.length >= valueMin && regex.test(email)) {
     this.setState({
       isSaveButtonDisabled: false,
     }, () => {});
   } else {
     this.setState({
       isSaveButtonDisabled: true,
     });
   }
 };

  onHandleClick = (event) => {
    const { history, saveAcess } = this.props;
    const { email } = this.state;
    saveAcess(email);
    event.preventDefault();
    history.push('/carteira');
  };

  render() {
    const {
      email,
      password,
      isSaveButtonDisabled,
    } = this.state;
    return (
      <div className="container">
        <form action="" autoComplete="off" className="container-form">
          <h2 className="title">TrybeWallet</h2>
          <div className="container-login">
            <label htmlFor="email">
              <input
                data-testid="email-input"
                type="email"
                placeholder="Digite seu e-mail"
                name="email"
                value={ email }
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="label-senha">
              <input
                data-testid="password-input"
                type="password"
                placeholder="Digite sua senha"
                name="password"
                value={ password }
                onChange={ this.onInputChange }
              />
            </label>
          </div>
          <div className="submit-form">
            <button
              type="button"
              disabled={ isSaveButtonDisabled }
              onClick={ this.onHandleClick }
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveAcess: (email) => dispatch(getUser(email)),
});

Login.propTypes = {
  saveAcess: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
