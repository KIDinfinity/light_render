import { useEffect } from 'react';
import { useSelector, useDispatch,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { messageModal } from '@/utils/commonMessage';

interface IProps {
  setCurrentStep: Function;
}
export default ({ setCurrentStep }: IProps) => {
  const hasAddOrRemoveClient = useSelector(
    (state: any) => state?.manualUnderwriting?.hasAddOrRemoveClient,
    shallowEqual
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (hasAddOrRemoveClient) {
      messageModal(
        {
          typeCode: 'Label_COM_WarningMessage',
          dictCode: 'MSG_000584',
        },
        {
          onOk: () => {
            setCurrentStep(1, false);
            dispatch({
              type: `${NAMESPACE}/saveHasAddOrRemoveClient`,
              payload: {
                hasAddOrRemoveClient: false,
              },
            });
            // // 清除被删除的clientName
            dispatch({
              type: `${NAMESPACE}/deleteUnExitClientName`,
            });
          },
        }
      );
    }
  }, [hasAddOrRemoveClient]);
};
