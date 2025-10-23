import { useEffect } from 'react';
import { useDispatch } from 'dva';

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'manualUnderwriting/setStepChange',
      payload: {
        stepsChange: {
          ClientInfo: false,
          PlanInfo: false,
          OtherInfo: false,
        },
      },
    });
  }, []);
};
