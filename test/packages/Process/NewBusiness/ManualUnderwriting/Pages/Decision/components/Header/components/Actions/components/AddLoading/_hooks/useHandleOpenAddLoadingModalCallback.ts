import { useCallback } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { handleErrorMessageIgnoreXErrorNotice } from '@/utils/commonMessage';
import { tenant } from '@/components/Tenant';

export default ({ haveNonStandardUwDecision }: any) => {
  const dispatch = useDispatch();
  return useCallback(() => {
    if (haveNonStandardUwDecision) {
      tenant.region({
        notMatch: () => {
          dispatch({
            type: `${NAMESPACE}/setAddLoadingModalVisible`,
            payload: {
              addLoadingModalVisible: true,
            },
          });
          dispatch({
            type: `${NAMESPACE}/addingLoadingItem`,
          });
        },
      });
    } else {
      handleErrorMessageIgnoreXErrorNotice({
        promptMessages: [
          {
            content:
              'No Non-standard benefit level decision exists, please change at least one of the them to Non-standard.',
          },
        ],
      });
    }
  }, [dispatch, haveNonStandardUwDecision]);
};
