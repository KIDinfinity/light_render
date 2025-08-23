import { useCallback } from 'react';
import { useDispatch } from 'dva';
import { Action } from '@/components/AuditLog/Enum';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useLoadProposalFlagCallback from 'process/NB/ManualUnderwriting/_hooks/useLoadProposalFlagCallback';

export default ({ setLoading }: any) => {
  const dispatch = useDispatch();
  const handleLoadFlag = useLoadProposalFlagCallback();
  return useCallback(async () => {
    dispatch({
      type: 'auditLogController/logTask',
      payload: {
        action: Action.GenerateSI,
      },
    });

    setLoading(true);
    await dispatch({
      type: `${NAMESPACE}/generateSI`,
    });
    handleLoadFlag();
    setLoading(false);
  }, [dispatch, setLoading, handleLoadFlag]);
};
