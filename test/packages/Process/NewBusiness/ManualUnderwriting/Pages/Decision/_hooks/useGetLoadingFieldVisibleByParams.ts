import { useMemo } from 'react';
import lodash from 'lodash';
import useGetCoverageLoadingRule from './useGetCoverageLoadingRule';
import { Visible } from 'basic/components/Form';

export default ({ coverageId, fieldConfig, key, value }: any) => {
  const loadingRule = useGetCoverageLoadingRule({ coverageId });
  return useMemo(() => {
    if (fieldConfig?.visible === Visible.No) {
      return false;
    }
    if (fieldConfig?.visible === Visible.Yes) {
      return true;
    }
    if (fieldConfig?.visible === Visible.Conditions) {
      if (lodash.isEmpty(loadingRule)) {
        return true;
      }
      return !lodash.chain(loadingRule).get(key).isEqual(value).value();
    }
    return true;
  }, [loadingRule, fieldConfig]);
};
