import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from '../activity.config';

export default () => {
  const clientInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData.clientInfoList,
    shallowEqual
  );
  const clientMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities.clientMap,
    shallowEqual
  );
  return useMemo(() => {
    const list = [];
    clientInfoList.forEach((id: any) => {
      const clientInfo = clientMap?.[id]?.personalInfo;
      const roleList = clientMap?.[id]?.roleList;
      list.push({ ...clientInfo, id, roleList });
    });
    return list;
  }, [clientInfoList, clientMap]);
};
