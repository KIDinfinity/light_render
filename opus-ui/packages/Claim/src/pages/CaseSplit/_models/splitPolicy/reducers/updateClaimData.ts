import { produce } from 'immer';
import { createNormalizeDataForSplitCase } from '../../functions';

export default (state: any, { payload: { newCase, originalCase, wholeEntities } }: any) => {
  return produce(state, (draft: any) => {
    const {
      claimEntities: originClaimEntities,
      claimProcessData: originClaimProcessData,
    } = createNormalizeDataForSplitCase(originalCase, wholeEntities);

    const {
      claimEntities: targetClaimEntities,
      claimProcessData: targetClaimProcessData,
    } = createNormalizeDataForSplitCase(newCase, wholeEntities);

    draft.originClaimEntities = originClaimEntities;
    draft.originClaimProcessData = originClaimProcessData;
    draft.targetClaimEntities = targetClaimEntities;
    draft.targetClaimProcessData = targetClaimProcessData;
  });
};
