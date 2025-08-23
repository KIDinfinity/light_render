import { produce }  from 'immer';
import { createNormalizeData } from '@/utils/claimUtils';
import { wholeEntities } from '../dto/EntriesModel';

const originClaimProcessData = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { businessData } = action.payload;
    const result = createNormalizeData(businessData, wholeEntities);
    draftState.originClaimProcessData = {
      ...result,
    };
  });
  return { ...nextState };
};

export default originClaimProcessData;
