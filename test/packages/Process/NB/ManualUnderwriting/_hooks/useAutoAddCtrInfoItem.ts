import { useEffect, useMemo } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';
import {v4 as uuidv4 } from 'uuid';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default ({ clientId }: any) => {
  const list = useGetClientDetailList();
  const dispatch = useDispatch();
  const crtInfoList = useMemo(() => {
    return lodash
      .chain(list)
      .find((item) => item.id === clientId)
      .get('crtInfoList', [])
      .value();
  }, [list, clientId]);
  useEffect(() => {
    if (lodash.isEmpty(crtInfoList)) {
      const newItemId = uuidv4();
      dispatch({
        type: `${NAMESPACE}/addCrtInfoList`,
        payload: {
          id: clientId,
          itemId: newItemId,
          ctfType: undefined,
          ctfId: undefined,
          ctfCountryCode: undefined,
          ctfExpireDate: undefined,
          type: 'P',
        },
      });
    }
  }, [crtInfoList]);
};
