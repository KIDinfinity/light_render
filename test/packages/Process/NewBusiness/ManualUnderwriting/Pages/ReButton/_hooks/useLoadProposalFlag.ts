import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default () => {
  const dispatch = useDispatch();
  const applicationNo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessData?.applicationNo,
    shallowEqual
  );
  const handleLoadData = useCallback(() => {
    dispatch({
      type: `${NAMESPACE}/loadProposalFlags`,
      payload: {
        applicationNo,
      },
    });
  }, [dispatch, applicationNo]);

  useEffect(() => {
    handleLoadData();
    return () => {
      dispatch({
        type: `${NAMESPACE}/saveProposalFlags`,
        payload: {
          needPremRecal: '',
          newSiRequired: '',
          needResendCol: '',
        },
      });
    };
  }, [applicationNo]);
};
