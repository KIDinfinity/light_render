import { produce } from 'immer';
import { createNormalizeDataForSplitCase } from '../../functions';

export default (state: any, { payload: { claimData, wholeEntities } }: any) => {
  return produce(state, (draft: any) => {
    const {
      claimEntities: originClaimEntities,
      claimProcessData: originClaimProcessData,
    } = createNormalizeDataForSplitCase(claimData, wholeEntities);

    const targetClaimData = { ...claimData, incidentList: [] };
    const {
      claimEntities: targetClaimEntities,
      claimProcessData: targetClaimProcessData,
    } = createNormalizeDataForSplitCase(targetClaimData, wholeEntities);

    draft.originClaimEntities = originClaimEntities;
    draft.originClaimProcessData = originClaimProcessData;
    draft.targetClaimEntities = targetClaimEntities;
    draft.targetClaimProcessData = targetClaimProcessData;
    draft.splitByIncidentIds = []
  });
};
