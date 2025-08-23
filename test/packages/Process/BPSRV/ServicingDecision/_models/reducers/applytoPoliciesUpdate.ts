/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import DecisionEnum from '../../../common/DecisionEnum';

export default (state: any, { payload, validating }: any) =>
  produce(state, (draftState: any) => {
    const { cloneListId, transactionId, changedFields } = payload;

    draftState.entities.policyInfoBOListMap[cloneListId] = {
      ...draftState.entities.policyInfoBOListMap[cloneListId],
      ...changedFields,
    };

    if (!validating) {
      if (lodash.has(changedFields, 'policySelection')) {
        if (
          draftState.processData.mainPolicyId !==
          draftState.entities.policyInfoBOListMap[cloneListId]?.policyId
        ) {
          const isSelect = formUtils.queryValue(changedFields.policySelection) === 1;

          if (isSelect) {
            draftState.entities.policyInfoBOListMap[cloneListId].policyDecision = {
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
              cloneListId
            );
          } else {
            draftState.entities.transactionTypesMap[
              transactionId
            ].applyToPolicyBOList = draftState.entities.transactionTypesMap[
              transactionId
            ].applyToPolicyBOList.filter((id: string) => id !== cloneListId);

            delete draftState.entities.policyInfoBOListMap[cloneListId].policyDecision;
          }
        }
      }

      const newDecison = (() => {
        const policyDecisionList = lodash.map(
          draftState.entities.transactionTypesMap[transactionId].applyToPolicyBOList,
          (id: string) =>
            formUtils.queryValue(draftState.entities.policyInfoBOListMap[id].policyDecision)
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
    }
  });
