import { Link } from "react-router-dom";

import TodoDetails from "./TodoDetail";

export default function TodoList(props) {
  return (
    <section>
      <h1>Дела</h1>
      <table className="table is-hoverable is-fullwidth">
        <tbody>
          {props.data.map((deed) => (
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
                  onClick={() => props.checkDeed(deed.key)}
                >
                  &#9745;
                </button>
              </td>
              <td>
                <button
                  className="button is-danger"
                  title="Удалить"
                  onClick={() => props.deleteDeed(deed.key)}
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
