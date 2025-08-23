import { useEffect } from 'react';
import { useDispatch } from 'dva';

/**
 * 定时任务刷新报表
 * params:  default 30 min
 */
export default ({ dashboardCode, frequency = 30 }: any) => {
  const dispatch = useDispatch();

  let Timer: any = null;

  const setTimer = () => {
    Timer = setTimeout(() => {
      dispatch({
        type: 'dashboardController/queryChartData',
        payload: {
          dashboardCode,
        },
      });
      setTimer();
    }, frequency * 60000);
  };

  useEffect(() => {
    setTimer();
    return () => {
      if (Timer) {
        clearTimeout(Timer);
        Timer = null;
      }
    };
  }, []);
};
