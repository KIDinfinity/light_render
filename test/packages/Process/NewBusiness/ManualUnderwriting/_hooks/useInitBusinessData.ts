import { useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import { batch } from 'react-redux';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import useInitAddressList from './useInitAddressList';

export default ({ businessData, taskDetail }: any) => {
  const dispatch = useDispatch();
  const initState = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.initState
  );

  useEffect(() => {
    batch(() => {
      dispatch({
        type: `${NAMESPACE}/saveProcessData`,
        payload: {
          businessData,
          taskDetail,
        },
      });
      dispatch({
        type: `${NAMESPACE}/getHeadConfigForInit`,
        payload: {
          caseCategory: taskDetail?.caseCategory || businessData?.caseCategory,
          taskDetail,
        },
      });
    });
    return () => {
      dispatch({
        type: `${NAMESPACE}/resetBizData`,
      });
    };
  }, []);

  useInitAddressList(initState);

  useEffect(() => {
    if (initState) {
      dispatch({
        type: `${NAMESPACE}/getIdleConfitForInit`,
        payload: {
          applicationNo: businessData?.applicationNo,
          clientInfoList: businessData?.clientInfoList,
        },
      });
    }
  }, [initState]);
};
