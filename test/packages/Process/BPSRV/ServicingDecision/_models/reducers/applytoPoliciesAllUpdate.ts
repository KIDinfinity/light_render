/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import DecisionEnum from '../../../common/DecisionEnum';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { isSelect, transactionId } = payload;

    const mainPolicyId = draftState.processData?.mainPolicyId;

    if (isSelect) {
      draftState.processData?.policyInfo?.applyToPolicyInfoList?.forEach(({ policyId }: any) => {
        if (policyId === mainPolicyId) return;

        draftState.entities.policyInfoBOListMap[
          `${transactionId}____${policyId}`
        ].policyDecision = {
          dirty: false,
          label: 'Decision',
          name: 'decision',
          validating: false,
          value: DecisionEnum.TBC,
          errors: [
            {
              field: 'decision',
              message: formatMessageApi({ Label_COM_Message: 'MSG_000550' }),
            },
          ],
        };

        draftState.entities.transactionTypesMap[transactionId].applyToPolicyBOList.push(
          `${transactionId}____${policyId}`
        );
      });
    } else {
      lodash.forEach(
        draftState.entities.transactionTypesMap[transactionId].applyToPolicyBOList,
        (mapId: any) => {
          if (mapId.split('____')[1] !== mainPolicyId) {
            delete draftState.entities.policyInfoBOListMap[mapId].policyDecision;
          }
        }
      );

      draftState.entities.transactionTypesMap[transactionId].applyToPolicyBOList = [
        `${transactionId}____${mainPolicyId}`,
      ];
    }

    const newDecison = (() => {
      const policyDecisionList = lodash.map(
        draftState.entities.transactionTypesMap[transactionId].applyToPolicyBOList,
        (mapId: string) =>
          formUtils.queryValue(draftState.entities.policyInfoBOListMap[mapId].policyDecision)
      );

      if (policyDecisionList.includes(DecisionEnum.TBC)) {
        return DecisionEnum.TBC;
      }
      if (policyDecisionList.includes(DecisionEnum.A)) {
        return DecisionEnum.A;
      }
      return DecisionEnum.D;
    })();
    if (
      newDecison !==
      formUtils.queryValue(draftState.entities.transactionTypesMap[transactionId].decision)
    ) {
      draftState.entities.transactionTypesMap[transactionId].decision = newDecison;

      if (newDecison !== DecisionEnum.D) {
        delete draftState.entities.transactionTypesMap[transactionId].declineReason;
        delete draftState.entities.transactionTypesMap[transactionId].editDeclineReason;
      }

      if (newDecison === DecisionEnum.TBC) {
        draftState.entities.transactionTypesMap[transactionId].decision = {
          value: draftState.entities.transactionTypesMap[transactionId].decision,
          dirty: false,
          label: 'Decision',
          name: 'decision',
          validating: false,
          errors: [
            { field: 'decision', message: formatMessageApi({ Label_COM_Message: 'MSG_000550' }) },
          ],
        };
      }
    }
  });
