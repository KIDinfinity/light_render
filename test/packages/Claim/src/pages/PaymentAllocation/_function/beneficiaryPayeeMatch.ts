import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import type { PolicyBenefitModal, PayeeModal, BeneficiaryModal } from '../_dto/Models';
import { EPayTo, EPayToType, ECommonExchangeRate } from '../_dto/Enums';
import { nameIsEqual, setBenefitPayoutCurrency, setBeneficiaryVal, getBeneficiaryName } from '.';
import getPaymentMethodIn from './getPaymentMethodIn';
/**
 * beneficiary与payee对象进行关联
 *
 * 1.如果只有一个payee，则自动将该payee关联到所有的beneficiary
 * 2.如果大于一个payee，则根据payee对象的payee name和beneficiary对象的beneficiary name进行匹配，
 *   若匹配到，则自动关联
 * 3.当前beneficiary存在的时候，且通过policyNo,payableType,以及payTo匹配到旧的beneficiary时，
 *   自动同步旧的relationshipWithInsured，relationshipWithPayee到当前beneficiary对象
 *
 * @param claimData
 * @param policyBenefitList
 */
const beneficiaryPayeeMatch = (
  claimData: any = {},
  policyBenefitList?: PolicyBenefitModal[] | any[]
) => {
  const { payeeList, policyBenefitList: policyBenefitListOld } = claimData;

  const tempPolicyBenefits: any = lodash.map(
    policyBenefitList,
    (policyBenefit: PolicyBenefitModal) => {
      const policyBenefitItem = { ...policyBenefit };

      const isMedicalProvider = policyBenefitItem.payTo === EPayTo.MedicalProvider;

      policyBenefitItem.payToType = isMedicalProvider
        ? EPayToType.PayToHospital
        : EPayToType.PayToCustomer;

      const beneficiariesTemp: BeneficiaryModal[] = lodash
        .chain(policyBenefitItem?.beneficiaryList)
        .compact()
        .map((beneficiaryItem: BeneficiaryModal) => {
          let beneficiaryTemp = { ...beneficiaryItem };
          const { payTo, clientId, firstName, surname } = beneficiaryTemp;

          if (!lodash.isEmpty(payeeList)) {
            const payees: PayeeModal[] = lodash.compact(payeeList);
            if (
              lodash.size(payees) === 1 &&
              (formUtils.queryValue(payees[0]?.firstName) ||
                formUtils.queryValue(payees[0]?.surname))
            ) {
              beneficiaryTemp.payeeId = payees[0]?.id;
              beneficiaryTemp.payoutCurrency =
                payees[0]?.payoutCurrency || beneficiaryTemp.payoutCurrency;
            }

            if (lodash.size(payees) > 1) {
              const payeeMatched: PayeeModal = lodash
                .chain(payeeList)
                .filter((payee: PayeeModal) =>
                  nameIsEqual(
                    getBeneficiaryName(firstName, surname),
                    getBeneficiaryName(payee?.firstName, payee?.surname)
                  )
                )
                .compact()
                .first()
                .value();

              if (
                !lodash.isEmpty(payeeMatched) &&
                (formUtils.queryValue(payeeMatched?.firstName) ||
                  formUtils.queryValue(payeeMatched?.surname)) &&
                !beneficiaryTemp.payeeId
              ) {
                beneficiaryTemp.payeeId = payeeMatched?.id;
                beneficiaryTemp.payoutCurrency =
                  payeeMatched?.payoutCurrency || beneficiaryTemp.payoutCurrency;
              }
            }

            beneficiaryTemp = setBeneficiaryVal(payees, beneficiaryTemp);
          }

          if (!lodash.isEmpty(beneficiaryTemp)) {
            const beneficiaryOld: BeneficiaryModal = lodash.find(
              policyBenefitListOld.beneficiaryList,
              {
                clientId,
                payTo,
              }
            );

            if (!lodash.isEmpty(beneficiaryTemp) && !lodash.isEmpty(beneficiaryOld)) {
              const { firstName: firstNameO, surname: surnameO } = beneficiaryOld;
              if (
                nameIsEqual(
                  getBeneficiaryName(firstName, surname),
                  getBeneficiaryName(firstNameO, surnameO)
                )
              ) {
                beneficiaryTemp.relationshipWithInsured =
                  beneficiaryTemp.relationshipWithInsured ||
                  beneficiaryOld?.relationshipWithInsured;
                beneficiaryTemp.relationshipWithPayee =
                  beneficiaryTemp.relationshipWithPayee || beneficiaryOld?.relationshipWithPayee;
              }
            }
          }

          return beneficiaryTemp;
        })
        .value();

      policyBenefitItem.beneficiaryList = beneficiariesTemp;

      return policyBenefitItem;
    }
  );

  const tempPayeeList: any[] = lodash
    .chain(payeeList)
    .compact()
    .map((payee: PayeeModal) => {
      const payeeTemp = { ...payee };
      const paymentMethodVal = payeeTemp?.paymentMethod;
      // 同步payoutCurrency值到beneficiary对象
      const setPayoutCurrency = (payeeTemp: any) =>
        setBenefitPayoutCurrency(tempPolicyBenefits, payeeTemp);

      if (getPaymentMethodIn({ paymentMethod: paymentMethodVal })) {
        tenant.region({
          [Region.HK]: () => {
            // 香港环境，当payment method是7-11时，payoutCurrency默认设置为HKD
            payeeTemp.payoutCurrency = ECommonExchangeRate.HongKong;
            setPayoutCurrency(payeeTemp);
          },
          [Region.JP]: () => {
            // 日本环境，当payment method是7-11时，payoutCurrency默认设置为HKD
            payeeTemp.payoutCurrency = ECommonExchangeRate.Japan;
            setPayoutCurrency(payeeTemp);
          },
          [Region.TH]: () => {
            // 泰国环境，当payment method是7-11时，payoutCurrency默认设置为HKD
            payeeTemp.payoutCurrency = ECommonExchangeRate.Thailand;
            setPayoutCurrency(payeeTemp);
          },
          [Region.ID]: () => {
            // 泰国环境，当payment method是7-11时，payoutCurrency默认设置为HKD
            payeeTemp.payoutCurrency = ECommonExchangeRate.Thailand;
            setPayoutCurrency(payeeTemp);
          },
        });
      }

      return payeeTemp;
    })
    .value();

  return { ...claimData, policyBenefitList: tempPolicyBenefits, payeeList: tempPayeeList };
};

export default beneficiaryPayeeMatch;
