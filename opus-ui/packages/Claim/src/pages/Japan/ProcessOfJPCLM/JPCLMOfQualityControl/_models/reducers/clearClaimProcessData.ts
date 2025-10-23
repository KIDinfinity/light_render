import defaultState from '../state';

const clearClaimProcessData = (state: any) => {
  return {
    ...state,
    ...defaultState,
  };
};

export default clearClaimProcessData;
