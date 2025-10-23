import { initialState } from '../state';

export default (state: any, action: any) => {
  return {
    ...state,
    ...initialState,
  };
};
