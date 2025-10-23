export default (state: any = {}, action: any) => {
  return { ...state, ...action.payload };
};
