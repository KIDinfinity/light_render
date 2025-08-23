/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { DecisionEnum, TransactionTypeEnum } from 'process/GeneralPOS/common/Enum';
import { findSubTypeCodeByTransactionType } from 'process/GeneralPOS/common/utils';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { changedFields, transactionId, validating } = payload;

    if (!validating) {
      if (
        formUtils.queryValue(
          draftState.entities.transactionTypesMap[transactionId]?.transactionTypeCode
        ) === TransactionTypeEnum.SRV011
      ) {
        const id = Object.values(draftState.entities.transactionTypesMap)?.find(
          (item) => formUtils.queryValue(item?.transactionTypeCode) === TransactionTypeEnum.SRV001
        )?.id;

        draftState.processData.transactionTypes = draftState.processData.transactionTypes?.filter(
          (item: string) => item !== id
        );
        delete draftState.entities.transactionTypesMap[id];
      }
    }

    draftState.entities.transactionTypesMap[transactionId] = {
      ...draftState.entities.transactionTypesMap[transactionId],
      ...changedFields,
    };

    if (!validating && lodash.hasIn(changedFields, 'transactionTypeCode')) {
      const transactionTypeCodeMap = draftState.transactionTypeCodeMap;
      const cftFlag =
        transactionTypeCodeMap?.[formUtils.queryValue(changedFields.transactionTypes)]?.[0]
          ?.cftFlag;
      draftState.processData.cftFlag = cftFlag;
      const transactionMapById = draftState.entities.transactionTypesMap[transactionId];
      const newData = {
        id: transactionMapById?.id,
        isManualAdd: transactionMapById?.isManualAdd,
        ...changedFields,
      };
      if (transactionMapById?.branchReceivedDate) {
        newData.branchReceivedDate = transactionMapById?.branchReceivedDate;
      }
      if (transactionMapById?.requestDate) {
        newData.requestDate = transactionMapById?.requestDate;
      }
      if (transactionMapById?.hoReceivedDate) {
        newData.hoReceivedDate = transactionMapById?.hoReceivedDate;
      }
      draftState.entities.transactionTypesMap[transactionId] = newData;
    }

    if (
      lodash.isEmpty(draftState.entities.transactionTypesMap[transactionId]?.subTransactionTypeCode)
    ) {
      draftState.entities.transactionTypesMap[transactionId] = {
        ...draftState.entities.transactionTypesMap[transactionId],
        subTransactionTypeCode: findSubTypeCodeByTransactionType(
          draftState.transactionTypeCodeMap,
          formUtils.queryValue(
            draftState.entities.transactionTypesMap[transactionId].transactionTypeCode
          ),
          undefined,
          undefined
        ),
      };
    }
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

        const applyTo =
          draftState.transactionTypeCodeMap?.[formUtils.queryValue(changedFields.decision)]?.[0]
            ?.applyTo;

        const transactionTypeLevel =
          draftState.entities?.transactionTypesMap?.[transactionId]?.transactionTypeLevel;

        const hiddenApplyTo =
          formUtils.queryValue(applyTo) === 'N' ||
          (formUtils.queryValue(applyTo) === 'C' && transactionTypeLevel !== 'policy');

        if (
          lodash.size(draftState.processData?.policyInfo?.policyInfoList) === 1 ||
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

      // lapse info
      const mapId = `${transactionId}____${draftState.entities.transactionTypesMap[transactionId]?.policyId}`;
      if (mapId && draftState.entities.policyInfoBOListMap?.[mapId]) {
        if (lodash.has(changedFields, 'lapseDuration')) {
          draftState.entities.policyInfoBOListMap[mapId].lapseDuration = formUtils.queryValue(
            changedFields.lapseDuration
          );
        }

        if (lodash.has(changedFields, 'lapseDate')) {
          draftState.entities.policyInfoBOListMap[mapId].lapseDate = formUtils.queryValue(
            changedFields.lapseDate
          );
        }
      }

      if (lodash.has(changedFields, 'declineReason')) {
        if (!['999'].includes(formUtils.queryValue(changedFields.declineReason))) {
          delete draftState.entities.transactionTypesMap[transactionId].editDeclineReason;
        }
      }
    }
  });
