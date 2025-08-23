/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import DecisionEnum from '../../../common/DecisionEnum';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId, hiddenApplyTo } = payload;

    const mainPolicyId = draftState.processData?.mainPolicyId;

    const hasMainPolicyIdInMap =
      draftState.processData?.policyInfo?.applyToPolicyInfoList?.findIndex(
        (item: any) => item?.policyId === mainPolicyId
      ) > -1;

    if (!draftState.entities.transactionTypesMap[transactionId].applyToPolicyBOList) {
      draftState.entities.transactionTypesMap[transactionId].applyToPolicyBOList = [];
    }

    const policyId = draftState.processData?.policyInfo?.applyToPolicyInfoList?.[0]?.policyId;

    // 单保单情况未添加到BOList时进行添加并赋予默认值
    if (
      ((hasMainPolicyIdInMap &&
        lodash.size(draftState.processData?.policyInfo?.applyToPolicyInfoList) === 1) ||
        hiddenApplyTo) &&
      policyId
    ) {
      draftState.entities.transactionTypesMap[transactionId].applyToPolicyBOList = [
        `${transactionId}____${policyId}`,
      ];

      draftState.entities.policyInfoBOListMap[`${transactionId}____${policyId}`].policyDecision =
        draftState.entities.policyInfoBOListMap[`${transactionId}____${policyId}`]
          ?.policyDecision ||
        draftState.entities.transactionTypesMap[transactionId]?.decision ||
        DecisionEnum.TBC;
    }

    // 多保单情况下默认选中跟mainPolicyNo一样的policy
    if (
      hasMainPolicyIdInMap &&
      lodash.size(draftState.processData?.policyInfo?.applyToPolicyInfoList) > 1 &&
      !draftState.entities.transactionTypesMap[transactionId].applyToPolicyBOList.includes(
        `${transactionId}____${mainPolicyId}`
      ) &&
      !hiddenApplyTo
    ) {
      draftState.entities.transactionTypesMap[transactionId].applyToPolicyBOList.push(
        `${transactionId}____${mainPolicyId}`
      );

      draftState.entities.policyInfoBOListMap[
        `${transactionId}____${mainPolicyId}`
      ].policyDecision = draftState.entities.transactionTypesMap[transactionId]?.decision || {
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
    }
  });
