import { useEffect } from 'react';
import { useSelector,  useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useLoadProposalFlagCallback from 'process/NB/ManualUnderwriting/_hooks/useLoadProposalFlagCallback';

export default () => {
  const handleLoadData = useLoadProposalFlagCallback();
  const dispatch = useDispatch();
  const applicationNo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessData?.applicationNo,
    shallowEqual
  );
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
