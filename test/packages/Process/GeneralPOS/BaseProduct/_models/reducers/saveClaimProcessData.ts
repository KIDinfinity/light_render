/* eslint-disable no-param-reassign */
import lodash from 'lodash';
import { isDataCapture, isDecision } from 'process/GeneralPOS/common/utils';
import { normalizeData } from '../../utils/normalizrUtils';

export default (state: any, { payload }: any) => {
  const prevEffectiveDate = lodash.get(payload, 'transactionTypes.0.effectiveDate');
  const newData = payload;
  const caseCategory = newData?.caseCategory;
  if (!lodash.isEmpty(newData?.transactionTypes)) {
    newData.transactionTypes = newData.transactionTypes.map((item) => {
      if (!lodash.isEmpty(payload?.needDuplicateCheckList)) {
        item.needDuplicateCheckList = payload?.needDuplicateCheckList;
      }
      if (!lodash.isEmpty(item?.contactInfo)) {
        item.contactInfo.applyTo = lodash
          .keys(item?.contactInfo)
          .filter((key) => /applyto.+/gi.test(key));
      }
      if (!lodash.isEmpty(item?.policyAddr)) {
        item.policyAddr.applyTo = lodash
          .keys(item?.policyAddr)
          .filter((key) => /applyto.+/gi.test(key));
      }
      return item;
    });
  }
  if (
    lodash.isEmpty(newData?.policyInfo?.policyInfoList) &&
    !lodash.isEmpty(newData?.policyInfo?.applyToPolicyInfoList)
  ) {
    newData.policyInfo.policyInfoList = newData?.policyInfo?.applyToPolicyInfoList;
  }
  const clientNameByclientId = lodash.map(newData?.policyInfo?.clientInfoList, (item) => {
    return {
      dictCode: item?.clientId,
      dictName: [item?.firstName, item?.middleName, item?.surname].join(' '),
    };
  });

  return {
    ...state,
    ...normalizeData(newData),
    originData: normalizeData(newData),
    prevEffectiveDate,
    clientNameByclientId,
    isDataCapture: isDataCapture({ caseCategory }),
    isDecision: isDecision({ caseCategory }),
  };
};
