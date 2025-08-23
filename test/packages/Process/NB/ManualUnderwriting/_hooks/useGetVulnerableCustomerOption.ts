import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import VulnerableCustomer from 'process/NB/Enum/VulnerableCustomer';
export default ({ fieldConfig, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });

  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessData,
    shallowEqual
  );
  const vulnerableCustomerTag = formUtils.queryValue(
    lodash.chain(businessData).get('policyList[0].clientInfoList[0].vulnerableCustomerTag').value()
  );

  return useMemo(() => {
    if (vulnerableCustomerTag === 'Y') {
      return lodash.filter(dicts, (item) => item?.dictCode !== VulnerableCustomer.NotApplicable);
    } else if (vulnerableCustomerTag === 'N') {
      return lodash.filter(dicts, (item) => item?.dictCode === VulnerableCustomer.NotApplicable);
    }
  }, [dicts, vulnerableCustomerTag]);
};
