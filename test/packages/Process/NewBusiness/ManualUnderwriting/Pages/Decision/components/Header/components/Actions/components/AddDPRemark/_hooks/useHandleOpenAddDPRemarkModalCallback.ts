import { useCallback } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { handleErrorMessageIgnoreXErrorNotice } from '@/utils/commonMessage';

export default ({ haveDPUwDecision }: any) => {
  const dispatch = useDispatch();
  return useCallback(() => {
    if (haveDPUwDecision) {
      dispatch({
        type: `${NAMESPACE}/setAddDPRemarkModalVisible`,
        payload: {
          addDPRemarkModalVisible: true,
        },
      });
      dispatch({
        type: `${NAMESPACE}/addDPRemarkItem`,
      });
    } else {
      handleErrorMessageIgnoreXErrorNotice({
        promptMessages: [
          {
            code: 'MSG_000789',
            content: formatMessageApi({ Label_COM_Message: 'MSG_000789' }),
          },
        ],
      });
    }
  }, [dispatch, haveDPUwDecision]);
};
