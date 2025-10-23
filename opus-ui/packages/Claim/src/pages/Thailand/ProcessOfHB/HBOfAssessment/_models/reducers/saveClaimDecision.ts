import { produce } from 'immer';

const saveClaimDecision = (state: any, action: any) => {
  const { changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    Object.keys(changedFields).forEach((changedFieldName) => {
      if (changedFieldName === 'adjustAmount' || changedFieldName === 'adjustReason') {
        draftState.claimHospitalBillAdjust[changedFieldName] = {
          ...changedFields[changedFieldName],
        };
        delete changedFields[changedFieldName];
      }
    });

    draftState.claimProcessData.claimDecision = {
      ...(state.claimProcessData.claimDecision || {}),
      ...changedFields,
    };
  });
  return { ...nextState };
};

export default saveClaimDecision;
