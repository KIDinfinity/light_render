import { useCallback } from 'react';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { useDispatch, useSelector } from 'dva';

import { formUtils } from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';

export default (clientId) => {
  const crtInfoIdList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.modalData.entities?.clientMap?.[clientId]?.crtInfoList
  );
  const crtInfoMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.modalData.entities?.crtInfoMap
  );
  const crtInfoList = crtInfoIdList?.map((id: string) => crtInfoMap[id]);
  const dispatch = useDispatch();

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
              type: `${NAMESPACE}/addFinancialInfo`,
              payload: {
                id: clientId,
                changedFields: {
                  ctfCountryCode: 'USA',
                },
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
