import { useCallback } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { handleErrorMessageIgnoreXErrorNotice } from '@/utils/commonMessage';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default (haveNorNSProduct: boolean = false) => {
  const dispatch = useDispatch();
  return useCallback(async () => {
    if (!haveNorNSProduct) {
      handleErrorMessageIgnoreXErrorNotice({
        promptMessages: [
          {
            code: 'MSG_000795',
            content: formatMessageApi({ Label_COM_Message: 'MSG_000795' }),
          },
        ],
      });
      return;
    }
    await dispatch({
      type: `${NAMESPACE}/addPopExclusionList`,
    });
    await dispatch({
      type: `${NAMESPACE}/setProductSection`,
      payload: {
        changedFields: {
          name: '',
          productName: '',
        },
      },
    });
    await dispatch({
      type: `${NAMESPACE}/setIsAddProductExclusion`,
      payload: {
        isAddProductExclusion: true,
      },
    });
    await dispatch({
      type: `${NAMESPACE}/saveShowPopUpDecision`,
      payload: {
        isShowPopUpDecision: true,
      },
    });
  }, [haveNorNSProduct]);
};
