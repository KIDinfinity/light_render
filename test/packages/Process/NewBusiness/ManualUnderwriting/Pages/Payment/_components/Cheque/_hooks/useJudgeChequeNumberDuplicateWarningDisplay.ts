import { useMemo } from 'react';
import lodash from 'lodash';
export default ({ policyId, chequeInfoList }: any) => {
  return useMemo(() => {
    return (
      lodash
        .chain(chequeInfoList)
        .find((item: any) => item.policyId === policyId)
        .get('verifyInd', '')
        .value() !== 'Y' &&
      lodash
        .chain(chequeInfoList)
        .filter((item: any) => item.policyId !== policyId)
        .some((item: any) => item.verifyInd == 'Y')
        .value()
    );
  }, [policyId, chequeInfoList]);
};
