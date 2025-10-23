import initState from '../state';

const clearInsured = (state: any, { payload = {} }: any) => {
  return {
    ...state,
    ...initState,
    ...payload,
  };
};
export default clearInsured;
