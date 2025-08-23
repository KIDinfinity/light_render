import CustomerRoleType from 'process/NewBusiness/Enum/CustomerRole';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useGetClientNameByConfigCallback from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetClientNameByConfigCallback';
import { useMemo } from 'react';

export default (readOnly: boolean) => {
  const clientInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => readOnly ? modelnamepsace?.processData?.clientInfoList : modelnamepsace.modalData?.processData?.clientInfoList,
    shallowEqual
  );

  const clientMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => readOnly? modelnamepsace?.entities?.clientMap: modelnamepsace.modalData?.entities?.clientMap,
    shallowEqual
  );
  const handleGetDefaultClientName = useGetClientNameByConfigCallback({
    isDefault: true,
  });

  return useMemo(
    () =>
      lodash
        .chain(clientInfoList)
        .map((id: any) => {
          return { ...clientMap?.[id]?.personalInfo, id };
        })
        .filter((client: any) =>
          lodash.some(
            formUtils.queryValue(client.customerRole),
            (role: any) => role === CustomerRoleType.LegalRepresentative
          )
        )
        .map((client: any) => {
          const clientName = (() => {
            return handleGetDefaultClientName({
              clientInfo: client,
            });
          })();
          return { dictName: clientName, dictCode: client.id };
        })
        .value(),
    [handleGetDefaultClientName, clientMap, clientInfoList]
  );
};
