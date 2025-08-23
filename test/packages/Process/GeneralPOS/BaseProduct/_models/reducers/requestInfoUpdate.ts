/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { DecisionEnum } from 'process/GeneralPOS/common/Enum';
export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { changedFields, validating } = payload;

    const [transactionId] = Object.keys(draftState.entities.transactionTypesMap || {});

    if (lodash.hasIn(changedFields, 'decision') && !validating) {
      const cleanDecision = formUtils.queryValue(changedFields.decision);
      draftState.processData.decision = changedFields.decision;
      lodash.set(draftState, 'processData.showReAssess.show', cleanDecision !== DecisionEnum.D);

      if (cleanDecision !== DecisionEnum.D) {
        delete draftState.entities.transactionTypesMap[transactionId].declineReason;
        delete draftState.entities.transactionTypesMap[transactionId].editDeclineReason;
      }

      // 清除校验信息
      if (cleanDecision === DecisionEnum.D) {
        draftState.entities.transactionTypesMap = formUtils.cleanValidateData(
          draftState.entities.transactionTypesMap
        );
      }

      // 清除校验
      if (draftState.entities.transactionTypesMap[transactionId]?.duplicatePolicy?.paymentStatus) {
        draftState.entities.transactionTypesMap[transactionId].duplicatePolicy.paymentStatus =
          formUtils.queryValue(
            draftState.entities.transactionTypesMap[transactionId].duplicatePolicy.paymentStatus
          );
      }
    }

    draftState.entities.transactionTypesMap[transactionId] = {
      ...draftState.entities.transactionTypesMap[transactionId],
      ...changedFields,
    };
  });
