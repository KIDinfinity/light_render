import defautlState from '../state';

const clearClaimProcessData = (state: any, action: any) => {
  return {
    ...state,
    ...defautlState,
  };
};

export default clearClaimProcessData;
