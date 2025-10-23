import React, { useEffect } from 'react';
import { NAMESPACE } from 'process/MedicalRequestFlow/activity.config';
import MedicalClass from './MedicalClass';
import Appointment from './Appointment';
import { useDispatch } from 'dva';

const MedicalRequestFlow = ({ businessData, taskDetail }: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      await dispatch({ type: `${NAMESPACE}/getBusinessData`, payload: { taskDetail } });
      await dispatch({
        type: `${NAMESPACE}/initialData`,
        payload: {
          businessData,
          taskDetail,
        },
      });
      dispatch({
        type: `${NAMESPACE}/initialButtonValidate`,
        payload: {
          businessData,
        },
      });
      dispatch({
        type: `${NAMESPACE}/getShowHospitalCategorySelect`,
      });
    })();
  }, [businessData, taskDetail]);
  return (
    <>
      <MedicalClass taskDetail={taskDetail} />
      <Appointment />
    </>
  );
};
export default MedicalRequestFlow;
