import { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/PremiumSettlement/activity.config';

export default () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) => modelNamespace.businessData,
    shallowEqual
  );
  return useMemo(() => {
    const date = lodash.get(businessData, 'policyList[0].ntuDate');
    const value = formUtils.queryValue(date);
    if (lodash.isNumber(value)) {
      return value;
    }
    if (!lodash.isNaN(Date.parse(value))) {
      return value;
    }
    return '';
  }, [businessData]);
};
