import store from "./redux/store";
import { selectUser } from "./redux/selectors";
import { Component } from "react";
import { Navigate } from "react-router-dom";
import { login } from "./api";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorEmail: "",
      errorPassword: "",
    };
    this.formData = {
      email: "",
      password: "",
    };
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.clearFormData = this.clearFormData.bind(this);
  }

  resetErrorMessages() {
    this.setState((state) => ({
      errorEmail: "",
      errorPassword: "",
    }));
  }

  validate() {
    this.resetErrorMessages();
    if (!this.formData.email) {
      this.setState((state) => ({
        errorEmail: "Некорректный email",
      }));
      return false;
    }
    if (!this.formData.password) {
      this.setState((state) => ({
        errorPassword: "Некорректный пароль!",
      }));
      return false;
    }
    return true;
  }

  // проверяем на наличие ошибок от Firebase
  showErrorMessages(code) {
    if (code === "auth/wrong-password") {
      this.setState((state) => ({
        errorPassword: "Неверный пароль!",
      }));
    }
    if (code === "auth/user-not-found") {
      this.setState((state) => ({
        errorEmail: "Такого пользователя не существует!",
      }));
    }
    if (code === "auth/wrong-password") {
      this.setState((state) => ({
        errorPassword: "Неверный пароль!",
      }));
    }
  }

  async handleSubmitForm(e) {
    e.preventDefault();
    if (this.validate()) {
      const result = await login(this.formData.email, this.formData.password);
      if (typeof result !== "object") {
        this.showErrorMessages(result);
      }
    }
  }

  handleEmailChange(e) {
    this.formData.email = e.target.value;
  }

  handlePasswordChange(e) {
    this.formData.password = e.target.value;
  }

  clearFormData() {
    this.formData = {
      email: "",
      password: "",
    };
  }

  render() {
    if (store.getState().selectUser()) {
      return <Navigate to="/" replace />;
    } else
      return (
        <section>
          <h1>Вход</h1>
          <form onSubmit={this.handleSubmitForm}>
            <div className="field">
              <label className="label">Адрес электронной почты</label>
              <div className="control">
                <input
                  type="email"
                  className="input"
                  onChange={this.handleEmailChange}
                />
              </div>
              {this.state.errorEmail && (
                <p className="help is-danger">{this.state.errorEmail}</p>
              )}
            </div>
            <div className="field">
              <label className="label">Пароль</label>
              <div className="control">
                <input
                  type="password"
                  className="input"
                  onChange={this.handlePasswordChange}
                />
              </div>
              {this.state.errorPassword && (
                <p className="help is-danger">{this.state.errorPassword}</p>
              )}
            </div>
            <div className="field is-grouped is-grouped-right">
              <div className="control">
                <input
                  type="reset"
                  className="button is-link is-light"
                  value="Сброс"
                />
              </div>
              <div className="control">
                <input
                  type="submit"
                  className="button is-primary"
                  value="Войти"
                />
              </div>
            </div>
          </form>
        </section>
      );
  }
}
