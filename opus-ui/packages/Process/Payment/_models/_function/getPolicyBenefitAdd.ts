import lodash from 'lodash';
import { SwitchEnum } from 'claim/pages/utils/claim';
/**
 * 判断policy benefit是否全部是手动添加
 * @param policyBenefitList policy benefit
 */
const getPolicyBenefitAdd = (policyBenefitList: any[]) => {
  if (lodash.isEmpty(policyBenefitList)) return false;

  return (
    !lodash
      .chain(policyBenefitList)
      .compact()
      .some((policyBenefit: any) => policyBenefit.manualAdd !== SwitchEnum.YES)
      .value()
  );
};

export default getPolicyBenefitAdd;
