import { useMemo } from 'react';
import { useSelector } from 'dva';
import { NAMESPACE } from '../activity.config';
import { getPolicyList, getPolicyForBenefitItemList } from 'basic/utils/PolicyUtils';
import { formUtils } from 'basic/components/Form';

export default () => {
  const listPolicy = getPolicyList(NAMESPACE);
  const basic =
    useSelector(({ [NAMESPACE]: modelnamespace }: any) => modelnamespace.popUpPayable?.basic) || {};
  const benefitTypeCode = formUtils.queryValue(basic?.benefitTypeCode) || '';
  const coverageKey = formUtils.queryValue(basic?.coverageKey) || '';
  const policyNo = formUtils.queryValue(basic?.policyNo) || '';
  const coreProductCode = formUtils.queryValue(basic?.coreProductCode) || '';
  return useMemo(() => {
    return getPolicyForBenefitItemList({ policyNo, listPolicy, benefitTypeCode, coverageKey });
  }, [listPolicy, policyNo, benefitTypeCode, coreProductCode]);
};
