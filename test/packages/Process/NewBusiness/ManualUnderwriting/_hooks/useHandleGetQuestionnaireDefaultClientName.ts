import { useCallback } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useGetClientNameByConfigCallback from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetClientNameByConfigCallback';

export default () => {
  const clientMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.entities?.clientMap,
    shallowEqual
  );

  const handleGetDefaultClientName = useGetClientNameByConfigCallback({
    isDefault: true,
  });

  return useCallback(
    ({ identityNo, identityType, clientId, questionnaireKey }: any) => {
      const clientInfo = lodash
        .chain(clientMap)
        .find((item: any) => {
          if (questionnaireKey === 'clientId') {
            return item?.smartClientId === clientId;
          }
          if (questionnaireKey === 'identityNo') {
            return item?.identityNo === identityNo && item?.identityType === identityType;
          }
        })
        .get('personalInfo')
        .value();
      const clientName = (() => {
        return handleGetDefaultClientName({
          clientInfo,
        });
      })();
      return clientName;
    },
    [clientMap, handleGetDefaultClientName]
  );
};
