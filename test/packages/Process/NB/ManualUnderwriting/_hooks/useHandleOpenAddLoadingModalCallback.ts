import { useCallback } from 'react';
import lodash from 'lodash';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { handleErrorMessageIgnoreXErrorNotice } from '@/utils/commonMessage';
import { tenant } from '@/components/Tenant';
import { LS, LSKey } from '@/utils/cache';

export default ({ haveNonStandardUwDecision }: any) => {
  const dispatch = useDispatch();
  const businessData = useSelector(
    (state: any) => state?.manualUnderwriting?.businessData,
    shallowEqual
  );
  return useCallback(() => {
    if (haveNonStandardUwDecision) {
      const currentUser = LS.getItem(LSKey.CURRENTUSER);
      const userId = lodash.get(currentUser, 'userId', '');
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
  }, [dispatch, haveNonStandardUwDecision, businessData]);
};
