import { produce } from 'immer';
import fieldFun from './fieldFun';

export default (config: any = {}) =>
  (state: any, action: any) => {
    const { changedFields, validating } = action.payload;
    return produce(state, (draft: any) => {
      const draftState = draft;
      draftState.claimProcessData.claimant = {
        ...draftState.claimProcessData.claimant,
        ...changedFields,
      };

      if (draftState.claimProcessData.claimant?.id) delete draftState.claimProcessData.claimant.id;

      if (!validating) {
        fieldFun({ state, draftState, changedFields, config });
      }
    });
  };
