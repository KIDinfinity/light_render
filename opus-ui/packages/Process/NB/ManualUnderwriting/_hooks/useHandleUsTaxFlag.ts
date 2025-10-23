import { useCallback } from 'react';
import lodash from 'lodash';
import { NAMESPACE } from '../activity.config';
import { useDispatch, useSelector } from 'dva';
import { v4 as uuidv4 } from 'uuid';
import { formUtils } from 'basic/components/Form';
import useGetContextClientId from 'process/NB/ManualUnderwriting/Client/ClientProvider/hooks/useGetContextClientId.ts';
import { tenant, Region } from '@/components/Tenant';

export default () => {
  const clientId = useGetContextClientId();
  const clientInfoList = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => {
    return modelnamepsace.businessData?.policyList[0].clientInfoList || [];
  });
  const index = lodash.findIndex(clientInfoList, (item: any) => item?.id === clientId);
  const crtInfoList = lodash.get(clientInfoList, `[${index}].crtInfoList`, []) || [];
  const dispatch = useDispatch();
  const newItemId = uuidv4();

  return useCallback(
    (value: any) => {
      if (
        value === 'Y' &&
        crtInfoList.every((item: any) => {
          return formUtils.queryValue(item.ctfCountryCode) !== 'USA';
        })
      ) {
        tenant.region({
          [Region.MY]: () => {
            dispatch({
              type: `${NAMESPACE}/addTnCrtInfoList`,
              payload: {
                id: clientId,
                clientId: clientId,
                itemId: newItemId,
                ctfCountryCode: 'USA',
                ctfId: undefined,
                reasonflag: undefined,
                reason: undefined,
                ctfType: 'TN',
                type: 'S',
              },
            });
          },
          notMatch: null,
        });
      }
    },
    [clientId, crtInfoList]
  );
};
