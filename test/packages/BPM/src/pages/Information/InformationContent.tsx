import React, { useEffect, useState } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import AddInformationList from './complex/AddInformationList';
import InformationHistory from './complex/InformationHistory';
import useGetAddInformationSnapshot from 'bpm/pages/Information/_hooks/useGetAddInformationSnapshot';

export default function InformationContent({ authInfoEditable, taskDetail, authInfoVisible }: any) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'authController/saveInfoPermissions',
      payload: {
        authInfoEditable,
        authInfoVisible,
      },
    });
  }, [authInfoVisible, authInfoEditable]);
  const [processData, setProcessData] = useState(taskDetail);
  useEffect(() => {
    (async () => {
      if (taskDetail) {
        const result = lodash.pick(taskDetail, [
          'caseCategory',
          'taskDefKey',
          'businessNo',
          'processInstanceId',
          'withdraw',
          'taskId',
        ]);
        setProcessData(result);
      }
    })();
  }, [taskDetail]);
  useEffect(() => {
    if (processData?.processInstanceId) {
      dispatch({
        type: 'navigatorInformationController/getTriggerPointData',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processData?.processInstanceId]);
  useGetAddInformationSnapshot();
  return (
    <>
      <AddInformationList authInfoEditable={authInfoEditable} processData={processData} />
      <InformationHistory authInfoVisible={authInfoVisible} />
    </>
  );
}
