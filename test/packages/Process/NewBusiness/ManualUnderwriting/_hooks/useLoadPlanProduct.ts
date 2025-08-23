import { useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default () => {
  const dispatch = useDispatch();

  const caseType = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.planInfoData?.caseType,
    shallowEqual
  );

  useEffect(() => {
    if (!caseType) {
      return;
    }
    dispatch({
      type: `${NAMESPACE}/loadPlanProduct`,
      payload: {
        contractType: caseType,
      },
    });
  }, [caseType]);
};
