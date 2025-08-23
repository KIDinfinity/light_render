import { useMemo } from 'react';
import { useSelector } from 'dva';

export default ({}: any) => {
  const activityHistoryPanel = useSelector(
    (state: any) => state?.navigatorInformationController?.activityHistoryPanel
  );
  const result = useMemo(() => {
    return !!activityHistoryPanel?.length;
  }, [activityHistoryPanel]);
  return result;
};
