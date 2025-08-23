import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default ({ agentNo }: any) => {
  const bankStaffList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.bankStaffList,
    shallowEqual
  );
  return useMemo(() => {
    return lodash
      .chain(bankStaffList)
      .map('uwProposalAgent')
      .find((item) => item.agentNo === agentNo)
      .get('bankList')
      .map((item: any) => {
        return {
          dictCode: item.bankStaffNo,
          dictName: item.bankStaffNo + '-' + item.bankStaffRefName,
        };
      })
      .value();
  }, [bankStaffList, agentNo]);
};
