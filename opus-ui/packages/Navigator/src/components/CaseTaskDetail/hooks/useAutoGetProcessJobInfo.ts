import { useEffect, useContext } from 'react';
import { useSelector } from 'dva';
import context from 'bpm/pages/OWBEntrance/Context/context';
import Context from '../Context';
import getProcessJobInfo from '../getProcessJobInfo';

export default (processInstanceId: string) => {
  const { setOverdueTime }: any = useContext(Context);
  const { dispatch } = useContext(context);
  const getProcessJobInfoTimeStamp = useSelector(({ envoyController }: any) => envoyController.getProcessJobInfoTimeStamp);

  useEffect(() => {
    (async () => {
      if (processInstanceId) {
        const value = await getProcessJobInfo({
          caseNo: processInstanceId,
        });
        setOverdueTime(value);
        dispatch({
          type: 'setOverdueTime',
          payload: {
            overdueTimeRender: value,
          },
        });
      }
    })();
  }, [processInstanceId, getProcessJobInfoTimeStamp]);
};
