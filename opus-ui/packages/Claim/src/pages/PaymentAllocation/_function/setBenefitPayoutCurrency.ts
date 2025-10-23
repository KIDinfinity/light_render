import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';
import type { PayeeModal, PolicyBenefitModal, BeneficiaryModal } from '../_dto/Models';
import { ECommonExchangeRate } from '../_dto/Enums';
import getPaymentMethodIn from './getPaymentMethodIn';
/**
 *
 * @param policyBenefitList policy benefit数据
 * @param payeeItem policy benefit 关联到的payee
 */
const setBenefitPayoutCurrency = (
  policyBenefitList: PolicyBenefitModal[],
  payeeItem: PayeeModal
) => {
  if (lodash.isEmpty(policyBenefitList) || lodash.isEmpty(payeeItem)) return policyBenefitList;
  const systemCurrency = tenant.currency();

  let payoutCurrency = payeeItem.payoutCurrency || systemCurrency;
  const paymentMethod = formUtils.queryValue(payeeItem.paymentMethod);

  if (!payeeItem.payoutCurrency && getPaymentMethodIn({ paymentMethod })) {
    tenant.region({
      [Region.HK]: () => {
        payoutCurrency = ECommonExchangeRate.HongKong;
      },
      [Region.JP]: () => {
        payoutCurrency = ECommonExchangeRate.Japan;
      },
      [Region.TH]: () => {
        payoutCurrency = ECommonExchangeRate.Thailand;
      },
      [Region.ID]: () => {
        payoutCurrency = ECommonExchangeRate.Thailand;
      },
    });
  }

  return lodash.map(policyBenefitList, (policyBenefit: PolicyBenefitModal) => {
    const policyBenefitTemp = { ...policyBenefit };
    const { beneficiaryList } = policyBenefitTemp;
    const beneficiaries: BeneficiaryModal[] = lodash
      .chain(beneficiaryList)
      .compact()
      .map((beneficiaryItem: BeneficiaryModal) => {
        const beneficiary = { ...beneficiaryItem };
        if (formUtils.queryValue(beneficiary.payeeId) === formUtils.queryValue(payeeItem?.id)) {
          beneficiary.payoutCurrency = payoutCurrency;
        }
        return beneficiary;
      })
      .value();

    policyBenefitTemp.beneficiaryList = beneficiaries;

    return policyBenefitTemp;
  });
};

export default setBenefitPayoutCurrency;
