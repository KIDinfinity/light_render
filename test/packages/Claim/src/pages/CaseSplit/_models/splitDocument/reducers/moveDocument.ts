import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload: { applicationNo } }: any) => {
  return produce(state, (draft: any) => {
    const originalData = lodash.cloneDeep(draft.originalData[applicationNo]);
    const newData = lodash.cloneDeep(draft.newData[applicationNo]);
    if (lodash.isEmpty(originalData)) {
      draft.originalData[applicationNo] = newData;
    } else {
      const policy = lodash.uniqBy(
        [...newData.claimData.policy, ...originalData.claimData.policy],
        'barId'
      );
      draft.originalData[applicationNo] = {
        claimData: {
          claimType: newData.claimData.claimType,
          policy,
        },
        documentData: {
          ...originalData.documentData,
          ...newData.documentData,
        },
      };
    }
    delete draft.newData[applicationNo];
  });
};
