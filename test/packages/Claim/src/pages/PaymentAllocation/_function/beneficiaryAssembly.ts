import lodash from 'lodash';
import { SwitchEnum } from 'claim/pages/utils/claim';
import { v4 as uuid } from 'uuid';
import { formUtils } from 'basic/components/Form';
import { tenant } from '@/components/Tenant';
import { Beneficiary } from '../_dto/Consts';
import { EPayToType } from '../_dto/Enums';
/**
 * 生成新的beneficiary数据
 * @param claimData 理赔对象
 * @param policyBenefit policyBenefit对象数据
 */
const beneficiaryAssembly = (claimData: any = {}, policyBenefit: any) => {
  const { claimNo, c360BeneficiaryInfo, claimDecision } = claimData;
  const manualAdd = SwitchEnum.YES;
  const systemCurrency = tenant.currency();

  const benefitciary = { ...Beneficiary, claimNo, manualAdd };
  const { policyNo: policyId, policyCurrency } = policyBenefit;
  const { policyOwnerList } = c360BeneficiaryInfo || {};

  const policyOwner = lodash.find(policyOwnerList, { policyId });

  benefitciary.id = uuid();
  benefitciary.payoutCurrency =
    formUtils.queryValue(claimDecision?.payoutCurrency) || systemCurrency;

  return {
    ...benefitciary,
    payToType: EPayToType.PayToCustomer,
    clientId: policyOwner?.clientId,
    policyCurrency: policyCurrency || systemCurrency,
  };
};

export default beneficiaryAssembly;
