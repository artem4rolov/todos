export const selectItem = (state, key) => {
  key = +key;
  return state.data.find((current) => current.key === key);
};

export const selectList = (state) => {
  return state.data;
};

export const selectUser = (state) => {
  return state.currentUser;
};
