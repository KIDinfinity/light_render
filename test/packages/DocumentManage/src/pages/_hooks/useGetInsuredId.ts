import { useEffect } from 'react';
import { useSelector, useDispatch,  } from 'dva';

export default (taskDetail: any) => {
  const dispatch = useDispatch();
  const insuredId = useSelector(
    (state: any) => state?.documentScanningController?.claimProcessData?.indexInformation?.insuredId,
  );

  useEffect(() => {
    if (insuredId) {
      dispatch({
        type: 'insured360/saveTaskInfo',
        payload: {
          taskDetail,
        },
      });
    }
  }, [insuredId]);
};
