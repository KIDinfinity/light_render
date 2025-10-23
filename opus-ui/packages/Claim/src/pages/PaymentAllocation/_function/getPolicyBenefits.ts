import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import { ClaimDecision } from 'claim/pages/utils/claim';
import policyBenefitAssembly from './policyBenefitAssembly';

/**
 * 根据claimData生成对应的policy benefit数据集合
 * @param claimData 理赔对象
 */
const getPolicyBenefits = (claimData: any) => {
  if (lodash.isEmpty(claimData)) return [];
  const { claimPayableList } = claimData;

  if (!lodash.isEmpty(claimPayableList)) {
    return lodash
      .chain(formUtils.cleanValidateData(claimPayableList))
      .compact()
      .filter((claimPayable: any) => {
        const approve = claimPayable.claimDecision === ClaimDecision.approve;
        // 若是philipines环境 则只需要满足 claim payable是approval的就行
        return tenant.region({
          [Region.PH]: approve,
          notMatch: approve && claimPayable.payableAmount > 0,
        });
      })
      .map((claimPayable: any) => {
        const policyInfo = {
          policyNo: formUtils.queryValue(claimPayable.policyNo),
          policyCurrency: claimPayable.policyCurrency,
        };
        return policyBenefitAssembly(claimData, policyInfo);
      })
      .value();
  }
  return [];
};

export default getPolicyBenefits;
