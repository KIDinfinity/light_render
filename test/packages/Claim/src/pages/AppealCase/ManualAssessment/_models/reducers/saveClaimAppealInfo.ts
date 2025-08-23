import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const saveClaimAppealInfo = (state: any, { payload }: any) => {
  const { changedFields } = payload;
  if (lodash.has(changedFields, 'claimType')) {
    changedFields.claimType = lodash.join(formUtils.queryValue(changedFields.claimType)) || null;
  }
  return {
    ...state,
    claimAppealInfo: {
      ...state.claimAppealInfo,
      ...changedFields,
    },
  };
};

export default saveClaimAppealInfo;
