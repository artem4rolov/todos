import { Component } from "react";
import { Navigate } from "react-router-dom";
import { register } from "./api";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorEmail: "",
      errorPassword: "",
      errorPasswordConfirm: "",
    };
    this.formData = {
      email: "",
      password: "",
      passwordConfirm: "",
    };
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirmChange =
      this.handlePasswordConfirmChange.bind(this);
    this.clearFormData = this.clearFormData.bind(this);
    this.resetErrorMessages = this.resetErrorMessages.bind(this);
    this.showErrorMessage = this.showErrorMessage.bind(this);
  }

  resetErrorMessages() {
    this.setState((state) => ({
      errorEmail: "",
      errorPassword: "",
      errorPasswordConfirm: "",
    }));
  }

  // проверяем поля на заполнение
  validate() {
    // сначала сбрасываем сообщения об ошибках в state на всякий случай
    this.resetErrorMessages();
    // затем проверяем поля
    if (!this.formData.email) {
      this.setState((state) => ({
        errorEmail: "Адрес электронной почты не указан!",
      }));
      return false;
    }
    if (!this.formData.password) {
      this.setState((state) => ({
        errorPassword: "Пароль не указан!",
      }));
      return false;
    }
    if (!this.formData.passwordConfirm) {
      this.setState((state) => ({
        errorPasswordConfirm: "Повтор пароля не указан!",
      }));
      return false;
    }
    if (this.formData.password !== this.formData.passwordConfirm) {
      this.setState((state) => ({
        errorPassword: "Пароли не совпадают!",
        errorPasswordConfirm: "Пароли не совпадают!",
      }));
      return false;
    }
    return true;
  }

  // для вывода сообщений об ошибках из FireBase
  showErrorMessage(code) {
    this.resetErrorMessages();
    // проверям, какой код ошибки выдала Firebase при подтверждении формы
    if (code === "auth/email-already-in-use") {
      this.setState((state) => ({
        errorEmail: "Пользователь с таким электронным адресом уже существует!",
      }));
    } else if (code === "auth/weak-password") {
      this.setState((state) => ({
        errorPassword: "Слишком простой пароль",
        errorPasswordConfirm: "Слишком простой пароль",
      }));
    }
  }

  // подтверждение формы
  async handleSubmitForm(e) {
    e.preventDefault();
    // если функция validate вернула true, тогда продолжаем регать юзера
    if (this.validate()) {
      // регистрируем нового юзера в firebase
      const result = await register(
        this.formData.email,
        this.formData.password
      );
      // если что-то пошло не так - выводим ошибки рядом с полями заполнения данных
      if (typeof result !== "object") {
        this.showErrorMessage(result);
      }
    }
  }

  handleEmailChange(e) {
    this.formData.email = e.target.value;
  }

  handlePasswordChange(e) {
    this.formData.password = e.target.value;
  }

  handlePasswordConfirmChange(e) {
    this.formData.passwordConfirm = e.target.value;
  }

  clearFormData() {
    this.formData = {
      email: "",
      password: "",
      passwordConfirm: "",
    };
  }

  render() {
    if (this.props.currentUser) {
      return <Navigate to="/" replace />;
    } else
      return (
        <section>
          <h1>Регистрация</h1>
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
            <div className="field">
              <label className="label">Повторите пароль</label>
              <div className="control">
                <input
                  type="password"
                  className="input"
                  onChange={this.handlePasswordConfirmChange}
                />
              </div>
              {this.state.errorPasswordConfirm && (
                <p className="help is-danger">
                  {this.state.errorPasswordConfirm}
                </p>
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
                  value="Зарегистрироваться"
                />
              </div>
            </div>
          </form>
        </section>
      );
  }
}
