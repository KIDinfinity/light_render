import defaultState from '../state';

export default (state) => {
  return {
    ...defaultState,
    asyncBusinesssId: state.asyncBusinesssId,
    asyncVersionId: state.asyncVersionId,
  };
};
