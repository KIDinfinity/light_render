export default (state: any, action: any) => {
  const {
    payload: { permissionDataMasking },
  } = action;

  return {
    ...state,
    permissionDataMasking,
  };
};
