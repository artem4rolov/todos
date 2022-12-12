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
    this.state = { data: initialData };
    this.deleteDeed = this.deleteDeed.bind(this);
    this.checkDeed = this.checkDeed.bind(this);
    this.addDeed = this.addDeed.bind(this);
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
            {/* кнопка TODOS */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                "navbar-item is-uppercase" + (isActive ? " is-active" : "")
              }
            >
              Todos
            </NavLink>
          </div>
          {/* кнопка СОЗДАТЬ ДЕЛО */}
          <div className="navbar-menu">
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
