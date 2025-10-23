import { produce } from 'immer';
import fieldFun from 'claimBasicProduct/reducers/saveClaimant/fieldFun';
import lodash from 'lodash';

const saveClaimant =
  (config: any = {}) =>
  (state: any, action: any) => {
    const { changedFields } = action.payload;
    return produce(state, (draft: any) => {
      const draftState = draft;
      draftState.businessData.claimant = {
        ...draftState.businessData.claimant,
        ...changedFields,
      };

      if (draftState.businessData.claimant?.id) delete draftState.businessData.claimant.id;
      if (lodash.size(changedFields) === 1) {
        fieldFun({ state, draftState, changedFields, config });
      }
    });
  };

export default saveClaimant({
  relationshipWithInsuredForJPNonSupport: true,
});
