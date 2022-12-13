import { Component } from "react";
import { HashRouter, Routes, Route, NavLink } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "./firebase";

import TodoAdd from "./TodoAdd";
import TodoList from "./TodoList";
import TodoDetail from "./TodoDetail";
import Register from "./Register";
import Login from "./Login";
import Logout from "./Logout";

const date1 = new Date(2022, 7, 19, 14, 5);
const date2 = new Date(2022, 8, 11, 12, 8);

const initialData = [
  {
    title: "Первое дело",
    desc: "Описание дела",
    image: "",
    done: false,
    createdAt: date1.toLocaleString(),
    key: date1.getTime(),
  },
  {
    title: "Второе дело",
    desc: "Описание второго дела",
    image: "",
    done: false,
    createdAt: date2.toLocaleString(),
    key: date2.getTime(),
  },
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: initialData,
      showMobileMenu: false,
      currentUser: undefined,
    };
    this.deleteDeed = this.deleteDeed.bind(this);
    this.checkDeed = this.checkDeed.bind(this);
    this.addDeed = this.addDeed.bind(this);
    this.showMobileMenu = this.showMobileMenu.bind(this);
    this.getDeed = this.getDeed.bind(this);
    this.authStateChanged = this.authStateChanged.bind(this);
  }

  authStateChanged(user) {
    this.setState((state) => ({ currentUser: user }));
  }

  componentDidMount() {
    onAuthStateChanged(getAuth(firebaseApp), this.authStateChanged);
    console.log(this.state.currentUser);
  }

  showMobileMenu(e) {
    e.preventDefault();
    this.setState((state) => ({
      showMobileMenu: !state.showMobileMenu,
    }));
  }

  getDeed(key) {
    key = +key;
    return this.state.data.find((deed) => deed.key === key);
  }

  addDeed(deedObj) {
    const newList = [...this.state.data, deedObj];
    this.setState((state) => ({
      data: newList,
    }));
  }

  deleteDeed(key) {
    const newList = this.state.data.filter((deed) => deed.key !== key);
    this.setState(({ data }) => ({
      data: newList,
    }));
  }

  checkDeed(key) {
    const deed = this.state.data.find((deed) => deed.key === key);
    if (deed) {
      deed.done = !deed.done;
    }
    this.setState((state) => ({}));
  }

  render() {
    return (
      <HashRouter>
        <nav className="navbar is-light">
          <div className="navbar-brand">
            {/* Лого */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                "navbar-item is-uppercase" + (isActive ? " is-active" : "")
              }
            >
              {this.state.currentUser ? this.state.currentUser.email : "Todos"}
            </NavLink>
            {/* Иконка меню-бургера на мобильных устройствах */}
            <a
              href="/"
              className={
                this.state.showMobileMenu
                  ? "navbar-burger is-active"
                  : "navbar-burger"
              }
              onClick={this.showMobileMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </a>
          </div>
          {/* Меню */}
          <div
            className={
              this.state.showMobileMenu
                ? "navbar-menu is-active"
                : "navbar-menu"
            }
            onClick={this.showMobileMenu}
          >
            <div className="navbar-start">
              {/* если есть пользователь в обекте this.state.currentUser */}
              {this.state.currentUser && (
                <NavLink
                  to="/add"
                  className={({ isActive }) =>
                    "navbar-item" + (isActive ? " is-active" : "")
                  }
                >
                  Создать дело
                </NavLink>
              )}
              {/* Войти */}
              {!this.state.currentUser && (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    "navbar-item" + (isActive ? " is-active" : "")
                  }
                >
                  Войти
                </NavLink>
              )}
              {/* если нет пользователя в объекте this.state.currentUser, то регистрация */}
              {!this.state.currentUser && (
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    "navbar-item" + (isActive ? " is-active" : "")
                  }
                >
                  Зарегистрироваться
                </NavLink>
              )}
            </div>
            {/* если пользователь вошел (есть данные в объекте this.state.currentUser) */}
            {this.state.currentUser && (
              <NavLink
                to="/logout"
                className={({ isActive }) =>
                  "navbar-item" + (isActive ? " is-active" : "")
                }
              >
                Выйти
              </NavLink>
            )}
          </div>
        </nav>
        <main className="content px-6 mt-6">
          <Routes>
            <Route
              path="/"
              element={
                <TodoList
                  data={this.state.data}
                  deleteDeed={this.deleteDeed}
                  checkDeed={this.checkDeed}
                />
              }
            />
            <Route path="/add" element={<TodoAdd addDeed={this.addDeed} />} />
            <Route
              path="/:key"
              element={<TodoDetail getDeed={this.getDeed} />}
            />
            <Route
              path="/register"
              element={<Register currentUser={this.state.currentUser} />}
            />
            <Route
              path="/login"
              element={<Login currentUser={this.state.currentUser} />}
            />
            <Route
              path="/logout"
              element={<Logout currentUser={this.state.currentUser} />}
            />
          </Routes>
        </main>
      </HashRouter>
    );
  }
}
