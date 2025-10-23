import lodash from 'lodash';

const saveClaimProcessData = (state: any, { payload }: any) => {
  const claimData = payload?.businessData || {};
  const taskNotEditable = payload?.taskNotEditable;
  const claimAppealInfo = claimData?.claimAppealInfo || {};
  let extraData = {};

  if (taskNotEditable) {
    const caseNo = lodash.get(claimData, 'claimAppealRelateCaseInfo.caseNo');
    extraData = {
      originalCase: claimData,
      selectedCase: caseNo,
    };
  }

  return {
    ...state,
    claimAppealInfo,
    ...extraData,
  };
};

export default saveClaimProcessData;
