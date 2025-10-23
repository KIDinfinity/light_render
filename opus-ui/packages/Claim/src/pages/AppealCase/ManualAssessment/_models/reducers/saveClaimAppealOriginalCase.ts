import lodash from 'lodash';

const saveClaimAppealOriginalCase = (state: any, { payload }: any) => {
  return {
    ...state,
    originalCase: lodash.isObject(payload) ? payload : {},
  };
};

export default saveClaimAppealOriginalCase;
