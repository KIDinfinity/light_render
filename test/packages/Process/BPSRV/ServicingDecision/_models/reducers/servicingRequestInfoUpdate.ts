/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import DecisionEnum from '../../../common/DecisionEnum';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { changedFields, transactionId, validating } = payload;

    draftState.entities.transactionTypesMap[transactionId] = {
      ...draftState.entities.transactionTypesMap[transactionId],
      ...changedFields,
    };

    if (!validating) {
      if (lodash.has(changedFields, 'decision')) {
        if (formUtils.queryValue(changedFields.decision) !== DecisionEnum.D) {
          delete draftState.entities.transactionTypesMap[transactionId].declineReason;
          delete draftState.entities.transactionTypesMap[transactionId].editDeclineReason;
        }

        if (formUtils.queryValue(changedFields.decision) === DecisionEnum.D) {
          lodash.forEach(
            draftState.entities.transactionTypesMap[transactionId].applyToPolicyBOList,
            (mapId: any) => {
              draftState.entities.policyInfoBOListMap[mapId] = {
                ...draftState.entities.policyInfoBOListMap[mapId],
                policyDecision: DecisionEnum.D,
              };
            }
          );
        }

        const applyTo = lodash.find(
          draftState.transactionTypeCodeMap,
          (item) =>
            item.transactionTypeCode ===
            formUtils.queryValue(
              draftState.entities.transactionTypesMap[transactionId].transactionTypeCode
            )
        )?.applyTo;

        const transactionTypeLevel =
          draftState.entities?.transactionTypesMap?.[transactionId]?.transactionTypeLevel;

        const hiddenApplyTo =
          formUtils.queryValue(applyTo) === 'N' ||
          (formUtils.queryValue(applyTo) === 'C' && transactionTypeLevel !== 'policy');

        if (
          lodash.size(draftState.processData?.policyInfo?.applyToPolicyInfoList) === 1 ||
          (hiddenApplyTo &&
            lodash.size(
              draftState.entities.transactionTypesMap[transactionId].applyToPolicyBOList
            ) === 1)
        ) {
          draftState.entities.policyInfoBOListMap[
            draftState.entities.transactionTypesMap[transactionId].applyToPolicyBOList[0]
          ].policyDecision = formUtils.queryValue(changedFields.decision);
        }
      }

      if (lodash.has(changedFields, 'declineReason')) {
        if (!['999'].includes(formUtils.queryValue(changedFields.declineReason))) {
          delete draftState.entities.transactionTypesMap[transactionId].editDeclineReason;
        }
      }
    }

    // 联动校验
    const applyToPolicyBOListToArray = lodash.reduce(
      draftState.entities.transactionTypesMap[transactionId].applyToPolicyBOList,
      (result: any, item: any) => {
        result.push(draftState.entities.policyInfoBOListMap[item]);
        return result;
      },
      []
    );
    // VLD_000623
    if (
      formUtils.queryValue(changedFields.decision) === DecisionEnum.A &&
      !lodash.some(
        applyToPolicyBOListToArray,
        (item: any) => formUtils.queryValue(item.policyDecision) === DecisionEnum.A
      )
    ) {
      draftState.entities.transactionTypesMap[transactionId].decision = {
        dirty: false,
        label: 'Decision',
        name: 'decision',
        validating: false,
        value: DecisionEnum.A,
        errors: [
          {
            field: 'decision',
            message: formatMessageApi({ Label_COM_Message: 'MSG_000549' }),
          },
        ],
      };
    }
    // VLD_000626
    if (
      formUtils.queryValue(changedFields.decision) === DecisionEnum.D &&
      lodash.some(
        applyToPolicyBOListToArray,
        (item: any) => formUtils.queryValue(item.policyDecision) !== DecisionEnum.D
      )
    ) {
      draftState.entities.transactionTypesMap[transactionId].decision = {
        dirty: false,
        label: 'Decision',
        name: 'decision',
        validating: false,
        value: DecisionEnum.D,
        errors: [
          {
            field: 'decision',
            message: formatMessageApi({ Label_COM_Message: 'MSG_000551' }),
          },
        ],
      };
    }
  });
