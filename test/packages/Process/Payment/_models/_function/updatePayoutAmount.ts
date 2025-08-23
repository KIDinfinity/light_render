import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { add } from '@/utils/precisionUtils';
import { tenant, Region } from '@/components/Tenant';
import type { PayeeModal, PolicyBenefitModal, BeneficiaryModal } from '../_dto/Models';
import getEchangeRateAmount from './getEchangeRateAmount';
import { EPayTo } from '../_dto/Enums';

/**
 * 根据指定的setPayout值设置payout amount还是payment amount
 * @param itemPayee payee对象
 * @param outputAmount 金额统计对象
 * @param setPayout 是否设置payout amount
 */
const setPayoutAmount = (itemPayee: any, outputAmount: any, setPayout?: boolean) => {
  // eslint-disable-next-line no-param-reassign
  itemPayee.payoutAmount = setPayout ? +Number(outputAmount.payoutAmount).toFixed(2) : null;
  // eslint-disable-next-line no-param-reassign
  itemPayee.paymentAmount = !setPayout ? outputAmount.paymentAmount : null;

  return itemPayee;
};

/**
 * 统计受益人的benefitAmount(payment amount)或beneficiary的payout amount到payee的payment amount
 * @param policyBenefits
 * @param payeeList
 */
const updatePayoutAmount = (
  policyBenefits: PolicyBenefitModal[],
  payeeList?: PayeeModal[],
  exchangeRateList?: any
) => {
  return lodash
    .chain(payeeList)
    .compact()
    .map((itemPayee: PayeeModal) => {
      const outputAmount = lodash
        .chain(policyBenefits)
        .compact()
        .reduce(
          (result, itemBenefit: PolicyBenefitModal) => {
            const { payTo, beneficiaryList } = itemBenefit;
            const isBeneficiary = formUtils.queryValue(payTo) === EPayTo.Beneficiary;
            let amounts = { payoutAmount: 0, paymentAmount: 0 };
            amounts = lodash
              .chain(beneficiaryList)
              .compact()
              .filter(
                (itemBeneficiary: BeneficiaryModal) =>
                  formUtils.queryValue(itemBeneficiary.payeeId) &&
                  formUtils.queryValue(itemBeneficiary.payeeId) ===
                    formUtils.queryValue(itemPayee.id)
              )
              .reduce(
                (allAmount, itemBeneficiary: BeneficiaryModal) => {
                  const { amount }: any = getEchangeRateAmount({
                    exchangeRateList,
                    amount: formUtils.queryValue(itemBeneficiary.payoutAmount),
                    fromCurrency: formUtils.queryValue(itemBeneficiary.payoutCurrency),
                    toCurrency: formUtils.queryValue(itemPayee.payoutCurrency),
                  });

                  // eslint-disable-next-line no-param-reassign
                  allAmount.paymentAmount = add(
                    formUtils.queryValue(
                      isBeneficiary
                        ? itemBeneficiary.beneficiaryAmount
                        : itemBeneficiary.benefitAmount
                    ) as number,
                    allAmount.paymentAmount
                  );
                  // eslint-disable-next-line no-param-reassign
                  allAmount.payoutAmount = add(amount, allAmount.payoutAmount);

                  return allAmount;
                },
                { payoutAmount: 0, paymentAmount: 0 }
              )
              .value();
            // eslint-disable-next-line no-param-reassign
            result.paymentAmount = add(result.paymentAmount, amounts.paymentAmount);
            // eslint-disable-next-line no-param-reassign
            result.payoutAmount = add(result.payoutAmount, amounts.payoutAmount);

            return result;
          },
          { payoutAmount: 0, paymentAmount: 0 }
        )
        .value();

      itemPayee = tenant.region({
        [Region.JP]: () => setPayoutAmount(itemPayee, outputAmount, true),
        [Region.HK]: () => setPayoutAmount(itemPayee, outputAmount, true),
        [Region.TH]: () => setPayoutAmount(itemPayee, outputAmount, true),
        [Region.ID]: () => setPayoutAmount(itemPayee, outputAmount, true),
        [Region.PH]: () => setPayoutAmount(itemPayee, outputAmount, true),
        notMatch: () => setPayoutAmount(itemPayee, outputAmount, false),
      });

      return itemPayee;
    })
    .value();
};

export default updatePayoutAmount;
