import { produce } from 'immer';
import fieldFun from './fieldFun';

export default (config: any = {}) => (state: any, action: any) => {
  const { changedFields } = action.payload;
  return produce(state, (draftState: any) => {
    draftState.claimProcessData.claimant = {
      ...draftState.claimProcessData.claimant,
      ...changedFields,
    };
    fieldFun({ state, draftState, changedFields, config });
  });
};
