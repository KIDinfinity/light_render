import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useGetClientNameByConfigCallback from 'process/NB/ManualUnderwriting/_hooks/useGetClientNameByConfigCallback';

export default ({ dicts }: any) => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData,
    shallowEqual
  );
  const clientInfoList = lodash.get(businessData, 'policyList[0].clientInfoList');
  const handleGetDefaultClientName = useGetClientNameByConfigCallback({
    isDefault: true,
  });
  return useMemo(() => {
    return lodash.map(dicts, (dictItem: any) => {
      const clientInfo = lodash.find(
        clientInfoList,
        (client: any) => client?.customerSeqNo === dictItem?.dictCode
      );
      const clientName = (() => {
        return handleGetDefaultClientName({
          clientInfo,
        });
      })();
      return {
        dictCode: dictItem?.dictCode,
        dictName: clientName || null,
      };
    });
  }, [dicts, clientInfoList, handleGetDefaultClientName]);
};
