/* eslint-disable import/no-unresolved */
import { includes, forEach } from 'lodash';
import { produce } from 'immer';
import { updateExpectDecisionForUpdateClaimPayable } from '../functions/expectDecisionFunc';

const saveIncidentPayableGroupItem = (state, action) => {
  const { changedFields, incidentPayableList } = action.payload;
  const nextState = produce(state, (draftState) => {
    const { claimProcessData, claimEntities } = draftState;
    const { paymentAssessmentResult } = changedFields;
    const { name, value } = paymentAssessmentResult || {};
    // 修改支付结果
    if (name === 'paymentAssessmentResult') {
      if (includes(value, '-')) {
        const splitValue = value.split('-');
        const [paymentAcceptedResult, assessmentResult] = splitValue;
        forEach(incidentPayableList, (payableId) => {
          claimEntities.claimPayableListMap[
            payableId
          ].paymentAcceptedResult = paymentAcceptedResult;
          claimEntities.claimPayableListMap[payableId].assessmentResult = assessmentResult;
          claimEntities.claimPayableListMap[
            payableId
          ].paymentAssessmentResult = paymentAssessmentResult;
          updateExpectDecisionForUpdateClaimPayable(
            claimProcessData,
            claimEntities,
            claimEntities.claimPayableListMap[payableId]
          );
        });
      } else {
        forEach(incidentPayableList, (payableId) => {
          claimEntities.claimPayableListMap[payableId].paymentAcceptedResult = value;
          claimEntities.claimPayableListMap[payableId].assessmentResult = null;
          claimEntities.claimPayableListMap[
            payableId
          ].paymentAssessmentResult = paymentAssessmentResult;
          updateExpectDecisionForUpdateClaimPayable(
            claimProcessData,
            claimEntities,
            claimEntities.claimPayableListMap[payableId]
          );
        });
      }
    }
    // }
  });
  return { ...nextState };
};

export default saveIncidentPayableGroupItem;
