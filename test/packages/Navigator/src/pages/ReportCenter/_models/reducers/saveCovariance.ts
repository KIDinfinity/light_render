import lodash from 'lodash';

export default (state: any, { payload }: any) => {
  const { changedFields } = payload;
  if (lodash.has(changedFields, 'summaryMethod') && lodash.size(changedFields) === 1) {
    changedFields.summaryBy = '';
  }
  return {
    ...state,
    covariance: {
      ...state.covariance,
      ...changedFields,
    },
  };
};
