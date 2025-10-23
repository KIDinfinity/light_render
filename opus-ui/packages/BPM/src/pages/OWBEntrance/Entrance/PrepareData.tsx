import React, { useState, useEffect, useContext } from 'react';
import lodash from 'lodash';
import { batch } from 'react-redux';

import PageLoading from '@/components/PageLoading';
import { useGetTaskDetailCallback, useGetTaskVersionCallback } from 'bpm/pages/OWBEntrance/_hooks';
import context from '../Context/context';
import { useDispatch, useSelector } from 'dva';
import NoPremission from '@/pages/Exception/NoPremission';

const PrepareData = React.memo(
  ({ remoteTaskDetail, taskDetail, buttonList, dispatch, children }: any) => {
    const [loading, setLoading] = useState(false);
    const [noPremissionShow403, setnoPremissionShow403] = useState(false);
    const [businessData, setBusinessData] = useState({});
    const getData = useGetTaskDetailCallback({ taskDetail: remoteTaskDetail });
    const getTaskVersion = useGetTaskVersionCallback({ taskId: remoteTaskDetail?.taskId });
    const forceUpdateFlag = useSelector(({ task }: any) => task?.forceUpdateFlag);

    const reduxDispatch = useDispatch();
    const initData = async (skipSnapshot = false) => {
      if (remoteTaskDetail?.taskId) {
        setLoading(true);
        const {
          businessData: data,
          activityButtonList,
          noPremission,
          ...detail
        } = await getData(skipSnapshot);
        getTaskVersion();

        if (noPremission) {
          reduxDispatch({
            type: 'authController/saveNoPermissionCases',
            payload: {
              caseNo:
                remoteTaskDetail?.caseNo ||
                remoteTaskDetail?.procInstId ||
                remoteTaskDetail?.processInstanceId,
              result: true,
            },
          });
          setnoPremissionShow403(true);
        }
        batch(() => {
          dispatch({
            type: 'setButtonList',
            payload: {
              buttonList: activityButtonList,
            },
          });
          dispatch({
            type: 'setTaskDetail',
            payload: { taskDetail: detail },
          });
        });

        setBusinessData(data || {});
        setLoading(false);
        (window as any).taskDetail = {
          ...((window as any).taskDetail || {}),
          companyCode: data?.laCompanyCode || '2',
        };
      }
    };
    const manualUpdateBusinessData = async () => {
      const { businessData: data } = await getData(true);

      if (data) {
        setBusinessData(data);
      }
    };
    useEffect(() => {
      initData();
      return () => {
        dispatch({ type: 'setTaskDetail', payload: { taskDetail: {} } });
        setBusinessData({});
        dispatch({
          type: 'setButtonList',
          payload: {
            buttonList: [],
          },
        });
      };
    }, [remoteTaskDetail]);
    useEffect(() => {
      if (forceUpdateFlag === 'Y') {
        manualUpdateBusinessData();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceUpdateFlag]);
    let c: any = null;
    if (loading) {
      c = <PageLoading />;
    } else if (noPremissionShow403) {
      c = <NoPremission />;
    } else if (lodash.isArray(buttonList) && lodash.isPlainObject(businessData)) {
      c = React.cloneElement(children, {
        taskDetail,
        buttonList,
        businessData,
        dispatch,
        initData,
        taskId: remoteTaskDetail?.taskId,
      });
    }

    return <>{c}</>;
  }
);

export default ({ taskDetail: remoteTaskDetail, children }: any) => {
  const {
    state: { buttonList, taskDetail },
    dispatch,
  } = useContext(context);
  return (
    <PrepareData
      remoteTaskDetail={remoteTaskDetail}
      taskDetail={taskDetail}
      buttonList={buttonList}
      dispatch={dispatch}
    >
      {children}
    </PrepareData>
  );
};
