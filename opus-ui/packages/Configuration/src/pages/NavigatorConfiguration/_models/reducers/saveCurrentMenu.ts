export default (state: any, action: any) => {
  const { currentMenu } = action.payload;
  return {
    ...state,
    currentMenu,
  };
};
