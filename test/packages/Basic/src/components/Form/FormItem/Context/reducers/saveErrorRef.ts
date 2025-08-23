import lodash from 'lodash';

export default (state: any, action: any): any => {
  const { errorRefs } = state;
  const { ref, errorRefId } = action.payload;

  if (!lodash.has(errorRefs, errorRefId)) {
    errorRefs[errorRefId] = ref
  }

  return {
    ...state,
    errorRefs,
  };
};
