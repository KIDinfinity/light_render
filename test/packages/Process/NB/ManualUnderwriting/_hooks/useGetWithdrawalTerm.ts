import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default ({ policyList }: any) => {
  return (
    lodash
      .chain(policyList?.coverageList)
      .find(
        (coverageItem) =>
          formUtils.queryValue(coverageItem?.isMain) === 'Y' &&
          formUtils.queryValue(coverageItem?.productCode) === 'UL07'
      )
      .get('withdrawalTerm')
      .value() || ''
  );
};
