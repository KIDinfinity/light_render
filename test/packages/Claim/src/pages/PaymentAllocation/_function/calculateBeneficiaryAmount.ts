import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { multiply, divide } from '@/utils/precisionUtils';
import { tenant, Region } from '@/components/Tenant';
import type { BeneficiaryModal } from '../_dto/Models';
import { EPayTo } from '../_dto/Enums';
/**
 * 计算beneficiary相关受益金额
 * @param beneficiary 受益人对象
 * @param benefitAmount 受益金额
 */
const calculateBeneficiaryAmount = (beneficiary: BeneficiaryModal, benefitAmount?: number) => {
  const benefitAmountTemp = formUtils.queryValue(benefitAmount);
  if (lodash.isEmpty(beneficiary) || !lodash.isNumber(benefitAmountTemp)) return beneficiary;

  const beneficiaryTemp = { ...beneficiary };
  const { payTo } = beneficiaryTemp;
  const beneficiaryPercentage = formUtils.queryValue(beneficiaryTemp.beneficiaryPercentage);
  const payoutExchangeRate = formUtils.queryValue(beneficiaryTemp.payoutExchangeRate);
  const isBeneficiary = formUtils.queryValue(payTo) === EPayTo.Beneficiary;

  lodash.set(
    beneficiaryTemp,
    'beneficiaryPercentage',
    !lodash.isNumber(beneficiaryPercentage) ? 100 : beneficiaryPercentage
  );

  const setDefaultExchangeRate = () =>
    lodash.set(
      beneficiaryTemp,
      'payoutExchangeRate',
      !lodash.isNumber(payoutExchangeRate) ? 1 : payoutExchangeRate
    );

  tenant.region({
    [Region.HK]: setDefaultExchangeRate,
    [Region.JP]: setDefaultExchangeRate,
    [Region.TH]: setDefaultExchangeRate,
    [Region.ID]: setDefaultExchangeRate,
  });

  beneficiaryTemp.benefitAmount = benefitAmountTemp;

  if (lodash.isNumber(beneficiaryTemp?.beneficiaryPercentage)) {
    beneficiaryTemp.beneficiaryAmount = multiply(
      benefitAmountTemp,
      divide(beneficiaryTemp?.beneficiaryPercentage, 100)
    );
  }

  if (lodash.isNumber(beneficiaryTemp?.payoutExchangeRate)) {
    if (isBeneficiary) {
      beneficiaryTemp.payoutAmount = +Number(
        multiply(beneficiaryTemp.beneficiaryAmount as number, beneficiaryTemp?.payoutExchangeRate)
      ).toFixed(2);
    } else {
      beneficiaryTemp.payoutAmount = +Number(
        multiply(beneficiaryTemp.benefitAmount as number, beneficiaryTemp?.payoutExchangeRate)
      ).toFixed(2);
    }
  }

  return beneficiaryTemp;
};

export default calculateBeneficiaryAmount;
