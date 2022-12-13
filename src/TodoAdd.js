import { Component } from "react";
import { Navigate } from "react-router-dom";
import { add } from "./api";

export default class TodoAdd extends Component {
  constructor(props) {
    super(props);
    this.formData = {};
    this.state = { redirect: false };
    this.clearData = this.clearData.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDesc = this.handleChangeDesc.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
  }

  clearData() {
    this.formData = {
      title: "",
      desc: "",
      image: "",
    };
  }

  async handleSubmitForm(e) {
    e.preventDefault();
    const newDeed = { ...this.formData };
    const date = new Date();
    newDeed.done = false;
    newDeed.createdAt = date.toLocaleString();
    // newDeed.key = date.getTime();
    // this.props.addDeed(newDeed);
    // добавим новое дело сначала в БД firebase, затем в state, key задаем предварительно в функции add в api.js
    const addedDeed = await add(this.props.currentUser, newDeed);
    this.props.addDeed(addedDeed);
    this.setState({ redirect: true });
  }

  handleChangeTitle(e) {
    this.formData.title = e.target.value;
  }

  handleChangeDesc(e) {
    this.formData.desc = e.target.value;
  }

  handleChangeImage(e) {
    const cFile = e.target.files;
    if (cFile.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.formData.image = fileReader.result;
      };
      fileReader.readAsDataURL(cFile[0]);
    } else {
      this.formData.image = "";
    }
  }

  render() {
    if (!this.props.currentUser) {
      return <Navigate to="/login" replace />;
    } else if (this.state.redirect) {
      return <Navigate to="/" replace />;
    } else
      return (
        <section>
          <h1>Создание нового дела</h1>
          <form onSubmit={this.handleSubmitForm}>
            <div className="field">
              <label className="label">Заголовок</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  onChange={this.handleChangeTitle}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Описание</label>
              <div className="control">
                <textarea
                  type="textarea"
                  className="input"
                  onChange={this.handleChangeDesc}
                />
              </div>
            </div>
            <div className="field">
              <div className="file">
                <label className="file-label">
                  <input
                    type="file"
                    className="file-input"
                    accept="image/*"
                    onChange={this.handleChangeImage}
                  />
                  <span className="file-cta">
                    <span className="file-label">Изображение</span>
                  </span>
                </label>
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
                  value="Создать дело"
                />
              </div>
            </div>
          </form>
        </section>
      );
  }
}
