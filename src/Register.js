import { Component } from "react";
import { Navigate } from "react-router-dom";
import { register } from "./auth";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.formData = {};
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.clearFormData = this.clearFormData.bind(this);
  }

  async handleSubmitForm(e) {
    e.preventDefault();
    const result = await register(this.formData.email, this.formData.password);
    if (typeof result !== "object") {
      console.log(result);
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
