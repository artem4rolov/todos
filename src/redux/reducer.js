export default function rootReducer(state, action) {
  let newData, newUser, deedIndex;

  switch (action.type) {
    case "todos/add":
      newData = [...state.data];
      newData.push(action.payload);
      return { ...state, data: newData };
    case "todos/setDone":
      newData = [...state.data];
      deedIndex = newData.find((current) => current.key === action.payload);
      if (deedIndex > -1) {
        newData[deedIndex] = { ...newData[deedIndex], done: true };
        return { ...state, data: newData };
      }
      return state;
    case "todos/delete":
      newData = state.data.filter((current) => current.key !== action.payload);
      return { ...state, data: newData };
    case "todos/getFromFirebase":
      newData = [...action.payload];
      return { ...state, data: newData };
    case "user/switch":
      newUser = { ...action.payload };
      return { ...state, currentUser: newUser };
    default:
      return state;
  }
}
