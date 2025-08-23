import lodash from 'lodash';
import { add } from '@/utils/precisionUtils';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000617 = ({
  id,
  claimBenefitBalanceList,
  coverageKey,
  listMap,
  limitDefinitionType = 'limit',
  fieldName = 'payableAmount',
}: any) => (rule: any, value: any, callback: Function) => {
  const target = listMap?.[id] || {};

  if (Number(formUtils?.queryValue(target?.systemCalculationAmount)) === Number(value)) {
    callback();
    return;
  }

  const curClaimBenefitBalanceList = claimBenefitBalanceList || [];

  const minRemainAmountBalance = lodash
    .chain(curClaimBenefitBalanceList)
    .filter(
      (item: any) =>
        item?.limitUnit === 'Amount' && item?.limitDefinitionType === limitDefinitionType
    )
    .map((item) => ({
      ...item,
      groupByKey: `${item?.policyNo}${item?.benefitTypeCode}${item?.benefitItemCode}${item?.coverageKey}${item?.policyYear}`,
    }))
    .groupBy('groupByKey')
    .map((groups) => lodash.minBy(groups, 'remainAmount'))
    .reduce((result, item) => ({ ...result, [item?.groupByKey]: item }), {})
    .value();

  const {
    policyNo,
    benefitTypeCode,
    benefitItemCode,
    policyYear,
    invoiceId,
  } = lodash.pick(formUtils.cleanValidateData(target), [
    'policyNo',
    'benefitTypeCode',
    'benefitItemCode',
    'policyYear',
    'invoiceId',
  ]);

  const targetKey = `${policyNo}${benefitTypeCode}${benefitItemCode}${coverageKey}${policyYear}`;
  const summaryAmount = add(
    lodash
      .chain(listMap)
      .filter(
        (item) =>
          formUtils?.queryValue(item?.policyNo) === policyNo &&
          formUtils?.queryValue(item?.benefitTypeCode) === benefitTypeCode &&
          formUtils?.queryValue(item?.benefitItemCode) === benefitItemCode &&
          formUtils?.queryValue(item?.policyYear) === policyYear &&
          formUtils?.queryValue(item?.id) !== id &&
          (minRemainAmountBalance?.[targetKey]?.timeFrame === 'per_visit'
            ? item?.invoiceId === invoiceId
            : true)
      )
      .map((item) => ({ ...item, [fieldName]: formUtils.queryValue(item?.[fieldName]) }))
      .sumBy(fieldName)
      .value(),
    value
  );

  if (minRemainAmountBalance?.[targetKey]?.remainAmount < summaryAmount) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000540' }));
    return;
  }
  callback();
};
