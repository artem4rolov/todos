import { Link, Navigate } from "react-router-dom";

import store from "./redux/store";
import { selectList } from "./redux/selectors";
import { useEffect, useState } from "react";

export default function TodoList(props) {
  // получаем наше хранилище с помощью функции getState()
  const state = store.getState();
  // затем получаем список дел через специальный селектор
  const list = selectList(state);

  const handleSetDoneClick = (key) => {
    store.dispatch({ type: "todos/setDone", payload: key });
  };

  const handleDeleteDeedClick = (key) => {
    store.dispatch({ type: "todos/delete", payload: key });
  };

  // ниже странный код по принудительному обновлению компонента при изменении state в store (redux)
  const [flag, setFlag] = useState(false);

  function refresh() {
    setFlag(!flag);
  }

  useEffect(() => {
    const unsubscribe = store.subscribe(refresh);
    return () => {
      unsubscribe();
    };
  });

  // проверяем, вошел юзер или нет
  return !props.currentUser ? (
    <Navigate to="/login" replace />
  ) : (
    <section>
      <h1>Дела</h1>
      <table className="table is-hoverable is-fullwidth">
        <tbody>
          {/* {props.data.map((deed) => ( */}
          {/* вместо пропов ипользуем хранилище Redux */}
          {list.map((deed) => (
            <tr key={deed.key}>
              <td>
                <Link to={`/${deed.key}`}>
                  {deed.done && <del>{deed.title}</del>}
                  {!deed.done && deed.title}
                </Link>
              </td>
              <td>
                <button
                  className="button is-success"
                  title="Пометить как сделанное"
                  disabled={deed.done}
                  // onClick={() => props.checkDeed(deed.key)} теперь отмечает как выполненное - redux
                  onClick={() => handleSetDoneClick(deed.key)}
                >
                  &#9745;
                </button>
              </td>
              <td>
                <button
                  className="button is-danger"
                  title="Удалить"
                  // onClick={() => props.deleteDeed(deed.key)} теперь удаляет redux
                  onClick={() => handleDeleteDeedClick(deed.key)}
                >
                  &#9746;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
