/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { OperationTypeEnum } from 'process/GeneralPOS/common/Enum';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const {
      transactionId,
      changedFields,
      type,
      validating = false,
      clientSeq,
      recoverItem = {},
    } = payload;
    const originClientInfoList = draftState?.processData?.policyInfo?.clientInfoList;
    const transactionPath = `entities.transactionTypesMap[${transactionId}]`;
    const changeCustomerInfoList = lodash.get(state, `${transactionPath}.changeCustomerInfoList`);
    const clientInfoList = lodash.get(state, `${transactionPath}.clientInfoList`); //后端要求多增加一个clientinfo传过去
    switch (type) {
      case OperationTypeEnum.ADD: {
        const clientSeq = new Date().getTime();
        const clientId = formUtils.queryValue(changedFields?.clientName);
        const item = lodash.find(
          originClientInfoList,
          (item) => clientId === formUtils.queryValue(item?.clientId)
        );
        draftState.entities.transactionTypesMap[transactionId].changeCustomerInfoList.push({
          clientSeq,
          clientName: item?.wholeName,
          firstName: item?.firstName,
          maritalStatus: item?.maritalStatus,
          middleName: item?.middleName,
          surname: item?.surname,
          title: item?.title,
          clientId,
          identityType: item?.identityType,
          identityNo: item?.identityNo,
        });
        lodash.set(
          draftState,
          `entities.transactionTypesMap[${transactionId}].clientInfoList`,
          draftState.entities.transactionTypesMap[transactionId].changeCustomerInfoList
        );
        break;
      }

      case OperationTypeEnum.DELETE: {
        draftState.entities.transactionTypesMap[
          transactionId
        ].changeCustomerInfoList = changeCustomerInfoList.filter(
          (item) => formUtils.queryValue(item.clientSeq) !== clientSeq
        );
        lodash.set(
          draftState,
          `entities.transactionTypesMap[${transactionId}].clientInfoList`,
          draftState.entities.transactionTypesMap[transactionId].changeCustomerInfoList
        );
        break;
      }
      case OperationTypeEnum.UPDATE: {
        draftState.entities.transactionTypesMap[transactionId].changeCustomerInfoList = lodash.map(
          changeCustomerInfoList,
          (item) => {
            if (clientSeq === formUtils.queryValue(item?.clientSeq)) {
              return {
                ...item,
                ...changedFields,
              };
            } else {
              return item;
            }
          }
        );
        draftState.entities.transactionTypesMap[transactionId].clientInfoList = lodash.map(
          clientInfoList,
          (item) => {
            if (clientSeq === formUtils.queryValue(item?.clientSeq)) {
              return {
                ...item,
                ...changedFields,
              };
            } else {
              return item;
            }
          }
        );
        break;
      }
      case OperationTypeEnum.COVER: {
        draftState.entities.transactionTypesMap[transactionId].changeCustomerInfoList = lodash.map(
          changeCustomerInfoList,
          (item) => {
            if (clientSeq === formUtils.queryValue(item?.clientSeq)) {
              return {
                ...item,
                ...recoverItem,
              };
            } else {
              return item;
            }
          }
        );
        draftState.entities.transactionTypesMap[transactionId].clientInfoList = lodash.map(
          clientInfoList,
          (item) => {
            if (clientSeq === formUtils.queryValue(item?.clientSeq)) {
              return {
                ...item,
                ...recoverItem,
              };
            } else {
              return item;
            }
          }
        );
        break;
      }
    }
  });
