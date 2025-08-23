import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { EPayTo } from '../_dto/Enums';
import { getBeneficiaryName } from '.';
/**
 * 根据policyNo.去C360那边获取人的姓名
 * @param claimData
 * @param policyNo
 * @param payTo
 */
const getBeneficiaries = (c360BeneficiaryInfo?: any, policyNo?: string, payTo?: string) => {
  if (lodash.isEmpty(c360BeneficiaryInfo)) return [];

  const { claimInsuredIdDO = {}, policyBeneficiaryList = [], policyOwnerList = [] } =
    c360BeneficiaryInfo || {};

  const beneficiaryVO = {
    [EPayTo.Insured]: lodash.chain([claimInsuredIdDO]).compact().value(),
    [EPayTo.Policyholder]: lodash
      .chain(policyOwnerList)
      .filter((policyOwner: any) => policyOwner?.policyId === formUtils.queryValue(policyNo))
      .compact()
      .value(),
    [EPayTo.Beneficiary]: lodash
      .chain(policyBeneficiaryList)
      .filter((policyOwner: any) => policyOwner?.policyId === formUtils.queryValue(policyNo))
      .compact()
      .value(),
  };

  return lodash
    .chain(beneficiaryVO[formUtils.queryValue(payTo) as string])
    .map((beneficiary: any) => ({
      dictCode: beneficiary?.clientId || beneficiary?.insuredId,
      dictName: getBeneficiaryName(beneficiary?.firstName, beneficiary?.surname),
    }))
    .filter((dict: any) => !!dict.dictName)
    .compact()
    .uniqBy('dictCode')
    .value();
};

export default getBeneficiaries;
