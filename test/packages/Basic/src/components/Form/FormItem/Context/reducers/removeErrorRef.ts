import lodash from 'lodash';

export default (state: any, action: any) => {
  const { errorRefs } = state;
  const { errorRefId } = action.payload;

  if (lodash.has(errorRefs, errorRefId)) {
    delete errorRefs[errorRefId];
  }

  return {
    ...state,
    errorRefs,
  };
};
