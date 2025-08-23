import lodash from 'lodash';
import { SwitchEnum } from 'claim/pages/utils/claim';
import { v4 as uuid } from 'uuid';
import { formUtils } from 'basic/components/Form';
import { tenant } from '@/components/Tenant';
import { PolicyBenefit, Beneficiary } from '../_dto/Consts';
import { EPayToType } from '../_dto/Enums';
/**
 * 生成新的policy benefit数据
 * @param claimData 理赔对象
 * @param policyInfo 包含policyNo信息的数据
 */
const policyBenefitAssembly = (claimData: any = {}, policyInfo: any) => {
  const { claimNo, c360BeneficiaryInfo, claimDecision } = claimData;
  const manualAdd = SwitchEnum.YES;
  const systemCurrency = tenant.currency();

  const policyBenefit = { ...PolicyBenefit, claimNo, manualAdd };
  const benefitciary = { ...Beneficiary, claimNo, manualAdd };
  const {
    policyNo: policyId,
    policyHolder: policyHolderExist,
    policyType: policyTypeExist,
    policyCurrency,
  } = policyInfo;
  const { policyAllocateInfoList, policyOwnerList } = c360BeneficiaryInfo || {};

  const policyOwner = lodash.find(policyOwnerList, { policyId });
  const policyAllocat = lodash.find(policyAllocateInfoList, { policyId });
  const { policyHolder: policyHolderC360, policyType: policyTypeC360 } = policyAllocat || {};

  const policyHolder = policyHolderExist || policyHolderC360;
  const policyType = policyTypeExist || policyTypeC360;

  policyBenefit.id = uuid();
  policyBenefit.policyCurrency = formUtils.queryValue(policyCurrency) || systemCurrency;

  benefitciary.id = uuid();
  benefitciary.payoutCurrency =
    formUtils.queryValue(claimDecision.payoutCurrency) || systemCurrency;
  benefitciary.policyCurrency = policyBenefit.policyCurrency;

  policyBenefit.beneficiaryList = [benefitciary];

  return {
    ...policyBenefit,
    policyNo: policyId,
    payToType: EPayToType.PayToCustomer,
    policyHolder,
    policyType,
    clientId: policyOwner?.clientId,
  };
};

export default policyBenefitAssembly;
