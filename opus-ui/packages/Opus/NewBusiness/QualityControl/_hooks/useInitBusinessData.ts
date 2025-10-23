import { useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import { batch } from 'react-redux';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

import useInitAddressList from 'opus/NewBusiness/ManualUnderwriting/_hooks/useInitAddressList';

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
        type: `${NAMESPACE}/getQCHeadConfigForInit`,
        payload: {
          caseCategory: 'BP_NB_CTG003',
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
