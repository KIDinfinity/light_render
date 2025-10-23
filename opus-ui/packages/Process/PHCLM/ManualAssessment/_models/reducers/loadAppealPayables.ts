import lodash from 'lodash';
import { createNormalizeData } from '@/utils/claimUtils';

export default (state, payload = {}) => {
  const { ignoreParsedMark } = payload
  const { claimAppealOriginalCase, appealJsonParsed, appeal } = state.claimProcessData

  const adjustClaimPayableList = claimAppealOriginalCase?.adjustClaimPayableList
  if(appeal && adjustClaimPayableList && (!appealJsonParsed || ignoreParsedMark)) {
    const claimPayableList = JSON.parse(adjustClaimPayableList);
    const { claimProcessData, claimEntities } = createNormalizeData({ claimPayableList }, {});
    state.claimProcessData = {
      ...state.claimProcessData,
      ...claimProcessData,
      appealJsonParsed: true,
    }

    const overrideEntities = lodash.pickBy(claimEntities, entity => !lodash.isEmpty(entity));
    state.claimEntities = {
      ...state.claimEntities,
      ...overrideEntities
    }
    return state;
  }
}

