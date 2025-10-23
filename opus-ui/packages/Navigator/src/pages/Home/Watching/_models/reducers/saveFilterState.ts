export default (state: any, action: any) => {
  const {
    payload: { filterState },
  } = action;

  return {
    ...state,
    filterState,
  };
};
