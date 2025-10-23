/* eslint-disable no-param-reassign */
import lodash from 'lodash';
import { isDataCapture, isDecision } from 'process/GeneralPOS/common/utils';
import { normalizeData } from '../../utils/normalizrUtils';

export default (state: any, { payload }: any) => {
  const prevEffectiveDate = lodash.get(payload, 'transactionTypes.0.effectiveDate');
  const newData = payload;
  const caseCategory = newData?.caseCategory;

  return {
    ...state,
    ...normalizeData(newData),
    originData: normalizeData(newData),
    prevEffectiveDate,
    isDataCapture: isDataCapture({ caseCategory }),
    isDecision: isDecision({ caseCategory }),
  };
};
