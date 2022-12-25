import { legacy_createStore } from "redux";
import rootReducer from "./reducer.js";

const initialData = {
  data: [],
  currentUser: undefined,
};

const store = legacy_createStore(rootReducer, initialData);
export default store;
