import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import type { PolicyBenefitModal, BeneficiaryModal } from '../_dto/Models';
import {
  // payeeAssembly,
  judgePayeeAdd,
  getPayeeDicts,
  addPayeeMapBeneficiary,
  supplementPayee,
  handleBeneficiary,
  setBeneficiaryVal,
} from '.';
import { ERelationshipWithInsured } from '../_dto/Enums';

/**
 * 给claim data进行补数据以及相关初始化处理
 * @param claimData
 * @param submitting
 */
const supplementClaimData = (claimData?: any, submitting?: boolean) => {
  if (lodash.isEmpty(claimData)) return claimData;
  const tempClaimData: any = formUtils.formatFlattenValue(formUtils.cleanValidateData(claimData));
  const { policyBenefitList, payeeList, claimDecision } = tempClaimData;
  const systemCurrency = tenant.currency();
  const tempPolicyBenefitList: any[] = lodash
    .chain(policyBenefitList)
    .compact()
    .map((policyBenefit: PolicyBenefitModal) => {
      const policyBenefitTemp = tenant.region({
        [Region.TH]: () => ({
          ...policyBenefit,
          policyType: policyBenefit?.policyType || 'I',
        }),
        [Region.ID]: () => ({
          ...policyBenefit,
          policyType: policyBenefit?.policyType || 'I',
        }),
        notMatch: () => ({ ...policyBenefit }),
      });
      const { beneficiaryList, policyNo, policyCurrency: policyCurrencyB }: any = policyBenefitTemp;
      const policyNoTemp = formUtils.queryValue(policyNo);
      policyBenefitTemp.policyCurrency = policyCurrencyB || systemCurrency;

      const beneficiaries = lodash
        .chain(beneficiaryList)
        .compact()
        .map((beneficiaryItem: BeneficiaryModal) => {
          let beneficiaryTemp: BeneficiaryModal = { ...beneficiaryItem };
          const { payoutCurrency, payTo, policyCurrency } = beneficiaryTemp;
          beneficiaryTemp.payoutCurrency =
            payoutCurrency || formUtils.queryValue(claimDecision.payoutCurrency) || systemCurrency;
          beneficiaryTemp.policyCurrency = policyCurrency || policyBenefitTemp.policyCurrency;

          const noPayeeList = lodash.isEmpty(payeeList) || !lodash.isArray(payeeList);
          // 同步c360的人的数据数据
          // if (formUtils.queryValue(payTo) && policyNoTemp) {
          //   lodash.set(
          //     beneficiaryTemp,
          //     `beneficiaryDicts.${formUtils.queryValue(payTo)}`,
          //     getBeneficiaries(claimData, policyNoTemp, payTo)
          //   );
          // }
          // 处理香港的逻辑
          beneficiaryTemp = tenant.region({
            [Region.TH]: () => ({
              ...beneficiaryTemp,
              payableType: beneficiaryTemp?.payableType || '03',
              payTo: beneficiaryTemp?.payTo || 'O',
              relationshipWithPayee: beneficiaryTemp?.relationshipWithPayee || 'S',
            }),
            [Region.ID]: () => ({
              ...beneficiaryTemp,
              payableType: beneficiaryTemp?.payableType || '03',
              payTo: beneficiaryTemp?.payTo || 'O',
              relationshipWithPayee: beneficiaryTemp?.relationshipWithPayee || 'S',
            }),
            notMatch: () => beneficiaryTemp,
          });
          beneficiaryTemp = handleBeneficiary(beneficiaryTemp, payTo);

          // payee list不存在的时候，若policy benefit的payto存在，但beneficiary的relationshipWithPayee不存在
          // 自动将beneficiary的relationshipWithPayee的值补充为self
          // 根据beneficiary对象人的相关信息生成payee
          if (
            noPayeeList &&
            formUtils.queryValue(payTo) &&
            !formUtils.queryValue(beneficiaryTemp?.relationshipWithPayee)
          ) {
            beneficiaryTemp.relationshipWithPayee = ERelationshipWithInsured.Self;
            // 判断与beneficiary的beneficiary name对应的payee是否存在。若不存在则添加一个payee
            if (judgePayeeAdd(getPayeeDicts(tempClaimData.payeeList), beneficiaryTemp)) {
              const result = addPayeeMapBeneficiary(tempClaimData, beneficiaryTemp);
              tempClaimData.payeeList = result.payeeList;
              beneficiaryTemp = { ...beneficiaryTemp, ...result.beneficiary };
            }
          }

          beneficiaryTemp = setBeneficiaryVal(tempClaimData.payeeList, beneficiaryTemp);

          return beneficiaryTemp;
        })
        .value();

      return { ...policyBenefitTemp, beneficiaryList: beneficiaries };
    })
    .value();

  tempClaimData.policyBenefitList = tempPolicyBenefitList;

  tempClaimData.payeeList = supplementPayee(tempClaimData.payeeList, submitting);

  return tempClaimData;
};

export default supplementClaimData;
