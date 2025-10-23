import initState from '../state';

const initData = (state: any) => {
  return {
    ...state,
    ...initState,
  };
};
export default initData;
