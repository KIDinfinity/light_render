import { useEffect, useMemo } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import useGetEwsVersions from 'process/NewBusiness/EWS/_hooks/useGetEwsVersions';
import { NAMESPACE } from 'process/NewBusiness/EWS/activity.config';

export default () => {
  const versions = useGetEwsVersions();
  const dispatch = useDispatch();
  const initVersion = useMemo(() => {
    const firstVersion = lodash
      .chain(versions)
      .maxBy((item: any) => {
        return item.version;
      })
      .get('id')
      .value();
    return firstVersion;
  }, [versions]);
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/setEwsSelectedEwsVersion`,
      payload: {
        selectedEwsVersion: initVersion,
      },
    });
  }, [initVersion]);
};
