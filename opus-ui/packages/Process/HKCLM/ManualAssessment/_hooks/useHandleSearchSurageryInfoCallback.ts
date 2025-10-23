import { useEffect } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/HKCLM/ManualAssessment/activity.config';

export default ({  isAdjustment, originServiceItemId }: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!!isAdjustment) {
      dispatch({
        type: `${NAMESPACE}/getSearchSurgeryInfoByClaimNo`,
        payload: {
          originServiceItemId,
        },
      });
    }
  }, [ isAdjustment, originServiceItemId]);
};
