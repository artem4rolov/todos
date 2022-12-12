import { Component } from "react";
import { HashRouter, Routes, Route, NavLink } from "react-router-dom";

import TodoAdd from "./TodoAdd";
import TodoList from "./TodoList";

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
    this.state = { data: initialData, showMobileMenu: false };
    this.deleteDeed = this.deleteDeed.bind(this);
    this.checkDeed = this.checkDeed.bind(this);
    this.addDeed = this.addDeed.bind(this);
    this.showMobileMenu = this.showMobileMenu.bind(this);
  }

  showMobileMenu(e) {
    e.preventDefault();
    this.setState((state) => ({
      showMobileMenu: !state.showMobileMenu,
    }));
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
              Todos
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
              <NavLink
                to="/add"
                className={({ isActive }) =>
                  "navbar-item" + (isActive ? " is-active" : "")
                }
              >
                Создать дело
              </NavLink>
            </div>
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
          </Routes>
        </main>
      </HashRouter>
    );
  }
}
