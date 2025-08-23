import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';

function checkFail(riskToleranceLevel, fundRiskLevel) {
  if (Number(riskToleranceLevel) === 1) {
    return Number(fundRiskLevel) > 1;
  }
  if (Number(riskToleranceLevel) === 2) {
    return Number(fundRiskLevel) > 4;
  }
  if (Number(riskToleranceLevel) === 3) {
    return Number(fundRiskLevel) > 5;
  }
  if (Number(riskToleranceLevel) === 4) {
    return Number(fundRiskLevel) > 7;
  }
  if (Number(riskToleranceLevel) === 5) {
    return Number(fundRiskLevel) > 8;
  }
  return false;
}

// 判断是否超过四位小数
export const VLD_000872 = (switchInPerc, riskToleranceLevel, fundCode, allFundConfigList) => (
  rule: any,
  value: any,
  callback: Function
) => {
  // riskToleranceLevel和fundRiskLevel 如果不存在的话，就不用校验。
  const fundRiskLevel = allFundConfigList?.find((item) => item?.dictCode === fundCode)
    ?.fundRiskLevel;

  if (
    Number(switchInPerc || 0) > 0 &&
    (lodash.isNumber(riskToleranceLevel) || !lodash.isEmpty(riskToleranceLevel)) &&
    (lodash.isNumber(fundRiskLevel) || !lodash.isEmpty(fundRiskLevel)) &&
    checkFail(riskToleranceLevel, fundRiskLevel) &&
    value !== 'Y'
  ) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000889' }));
  }
  callback();
};
