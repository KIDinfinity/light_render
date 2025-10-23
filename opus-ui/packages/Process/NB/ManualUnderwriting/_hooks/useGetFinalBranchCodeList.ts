import { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import useGetAgentInfoById from 'process/NB/ManualUnderwriting/_hooks/useGetAgentInfoById';

export default ({ branchCodeList, id }: any) => {
  const agentItem = useGetAgentInfoById({ id });
  return useMemo(() => {
    const branchCodeSet = new Set();
    const bankChannel = formUtils.queryValue(lodash.get(agentItem, 'bankNo'));
    lodash.map(branchCodeList, (item: any) => {
      branchCodeSet.add({
        bankCode: lodash.get(item, 'bankCode'),
        dictCode: lodash.get(item, 'branchCode'),
        dictName: lodash.get(item, 'branchName'),
      });
    });
    const list =
      lodash.filter(
        Array.from(branchCodeSet),
        (branchCodeItem: any) => lodash.get(branchCodeItem, 'bankCode') === bankChannel
      ) || [];
    return list;
  }, [branchCodeList, agentItem]);
};
