import { produce } from 'immer';
import fieldFun from './fieldFun';
import moment from 'moment';

export default (config: any = {}) =>
  (state: any, action: any) => {
    const {
      changedFields,
      validating,
      userId,
      refreshIDInfo,
      idInfoRefresh = false,
    } = action.payload;
    return produce(state, (draft: any) => {
      const draftState = draft;
      if (idInfoRefresh && !validating) {
        draftState.claimProcessData.claimant = {
          ...draftState.claimProcessData.claimant,
          ...refreshIDInfo,
        };
        draftState.claimProcessData.claimant.idInfoModifyBy = 'GODP';
        draftState.claimProcessData.claimant.idInfoLastestUpdate = moment().format();
      } else {
        draftState.claimProcessData.claimant = {
          ...draftState.claimProcessData.claimant,
          ...changedFields,
        };
      }

      if (
        (changedFields?.idType ||
          changedFields?.idIssueDate ||
          changedFields?.idExpiryDate ||
          changedFields?.idNoExpiryDateFlag ||
          changedFields?.ageAdmitIndicator ||
          changedFields?.idExemptedFlag) &&
        !validating
      ) {
        draftState.claimProcessData.claimant.idInfoModifyBy = userId;
        draftState.claimProcessData.claimant.idInfoLastestUpdate = moment().format();
      }

      if (draftState.claimProcessData.claimant?.id) delete draftState.claimProcessData.claimant.id;

      if (!validating) {
        fieldFun({ state, draftState, changedFields, config });
      }
    });
  };
