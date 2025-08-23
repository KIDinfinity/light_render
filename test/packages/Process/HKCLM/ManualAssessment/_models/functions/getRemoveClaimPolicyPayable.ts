import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default ({ claimPayableListMap, policyNo }: any) => {
  const benefitTypeCodeList =
    lodash
      .chain(formUtils.cleanValidateData(lodash.values(claimPayableListMap) || []))
      .filter({ policyNo })
      .map('benefitTypeCode')
      .uniq()
      .compact()
      .value() || [];

  return lodash.isEmpty(benefitTypeCodeList);
};
