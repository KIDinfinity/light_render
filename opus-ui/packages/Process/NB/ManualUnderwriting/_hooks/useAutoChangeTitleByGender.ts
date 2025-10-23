import { useEffect, useMemo } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash'
import Gander from 'process/NB/Enum/Gander';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useGetClientInfoList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList'
import { tenant, Region } from '@/components/Tenant';

export default ({ clientId }: any) => {
  const dispatch = useDispatch();
  const list = useGetClientInfoList()
  const gender = useMemo(() => {
    return lodash.chain(list)
      .find((item: any) => {
        return item.id === clientId
      }).
      get('gender')
      .value()
  }, [list, clientId])

  useEffect(() => {
    tenant.region({
      [Region.ID]: () => {
        const changeMap = {
          [Gander.Male]: 'BAPAK',
          [Gander.Female]: 'IBU',
        }
        dispatch({
          type: `${NAMESPACE}/changeBasicInfoFields`,
          payload: {
            id: clientId,
            changedFields: {
              title: changeMap?.[formUtils.queryValue(gender)] || ''
            }
          }
        })
      },
      notMatch: {}
    })

  }, [gender])
}
