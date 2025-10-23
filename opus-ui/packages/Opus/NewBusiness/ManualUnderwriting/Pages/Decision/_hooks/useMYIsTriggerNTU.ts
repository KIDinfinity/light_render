import { useMemo } from 'react';
import { tenant, Region } from '@/components/Tenant';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

export default () => {
  const notWait = useSelector(({ processTask }: any) => processTask.getTask?.notWait, shallowEqual);
  const isMYTriggerNTU = useMemo(() => {
    return tenant.region() === Region.MY && notWait;
  }, [notWait]);
  return isMYTriggerNTU;
};
