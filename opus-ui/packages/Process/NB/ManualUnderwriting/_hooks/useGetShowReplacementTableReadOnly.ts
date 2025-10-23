import lodash from 'lodash';
import { useMemo } from 'react';
import { formUtils } from 'basic/components/Form';
import useGetReplacementInfoList from 'process/NB/ManualUnderwriting/_hooks/useGetReplacementInfoList';

export default () => {
  const replacementInfoData = useGetReplacementInfoList();
  return useMemo(() => {
    return lodash.some(
      formUtils.formatFlattenValue(formUtils.cleanValidateData(replacementInfoData)),
      (item) => {
        const keys = [
          'replacedPolicyId',
          'planName',
          'policyType',
          'sumAssured',
          'insurerName',
          'insuranceCompanyName',
          'reasonForPolicyReplacement',
        ];
        return lodash
          .chain(item)
          .pick(keys)
          .values()
          .some((value) => !!value)
          .value();
      }
    );
  }, [replacementInfoData]);
};
