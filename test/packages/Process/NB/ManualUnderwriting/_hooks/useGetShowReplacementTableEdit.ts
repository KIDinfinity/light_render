import lodash from 'lodash';
import { useMemo } from 'react';
import { formUtils } from 'basic/components/Form';
import useGetReplacementFieldInfo from 'process/NB/ManualUnderwriting/_hooks/useGetReplacementFieldInfo';
import policyReplacementFirstField from 'process/NB/ManualUnderwriting/PolicyReplacement/Detail/policyReplacementFirstField';

export default () => {
  const replacementInfoData = useGetReplacementFieldInfo();
  return useMemo(() => {
    const keys = ['policyReplacementFlag', ...policyReplacementFirstField];
    return lodash
      .chain(formUtils.formatFlattenValue(formUtils.cleanValidateData(replacementInfoData)))
      .pick(keys)
      .values()
      .some((value) => value === 'Y')
      .value();
  }, [replacementInfoData]);
};
