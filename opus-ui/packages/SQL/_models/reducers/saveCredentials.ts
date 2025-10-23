export default (state, { payload }: any) => {
  const { username, password } = payload;
  state.gitAccount = { username, password };
  return state;
};
