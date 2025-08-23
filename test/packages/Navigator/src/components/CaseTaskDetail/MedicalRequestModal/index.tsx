import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { Modal as AntModal } from 'antd';
import { Mode } from 'configuration/constant';
import MedicalRequestFlow from 'process/MedicalRequestFlow/Entry';
import Sider from 'bpm/pages/OWBEntrance/Sider/Sider';
import Arrow from './Arrow';
import actionConfig from 'process/MedicalRequestFlow/actionConfig';
import styles from './index.less';
import { useGetTaskDetailCallback } from 'bpm/pages/OWBEntrance/_hooks';
import lodash from 'lodash';

const MedicalRequestModal = () => {
  const dispatch = useDispatch();
  const medicalRequestModalDisplay = useSelector(
    ({ processTask }: any) => processTask?.medicalRequestModalDisplay,
    shallowEqual
  );
  const [businessData, setBusinessData] = useState({});
  const [taskDetail, setTaskDetail] = useState({});
  const mode = useSelector((state: any) => state.medicalRequestFlow.mode);
  const subTaskId: any = useSelector((state: any) => state.processTask?.subTaskId);
  const getData = useGetTaskDetailCallback({
    taskDetail: { ...taskDetail, taskId: subTaskId },
  });

  const buttonList = [];
  const onClose = async () => {
    dispatch({
      type: `processTask/toogleMedicalRequestModal`,
      payload: {
        medicalRequestModalDisplay: false,
      },
    });
  };
  useEffect(() => {
    (async () => {
      if (subTaskId && medicalRequestModalDisplay) {
        const { businessData: data, activityButtonList, noPremission, ...detail } = await getData(
          false
        );
        setBusinessData(data);
        setTaskDetail(detail);
      }
    })();
    return () => {
      setBusinessData({});
      setTaskDetail({});
    };
  }, [subTaskId, getData, medicalRequestModalDisplay]);
  return (
    <>
      <AntModal
        className={styles.taskModal}
        visible={!!medicalRequestModalDisplay}
        width={600}
        footer={false}
        style={{ height: '500px' }}
        onCancel={onClose}
        maskStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.65)' }}
      >
        <div className={styles.modal}>
          <div className={styles.left}>
            <Sider buttonList={buttonList} actionConfig={actionConfig} />
          </div>
          <div className={styles.right}>
            <div className={styles.head}>
              <span className={styles.title}>Medical Checkup</span>
            </div>
            <div className={styles.medicalRequestFlow}>
              {!lodash.isEmpty(businessData) && !lodash.isEmpty(taskDetail) && (
                <MedicalRequestFlow businessData={businessData} taskDetail={taskDetail} />
              )}
            </div>
          </div>
        </div>

        {mode === Mode.Expansion ? (
          <div className={styles.container}>
            <Arrow mode={mode} type="medicalRequestFlow" taskDetail={taskDetail} />
          </div>
        ) : (
          <></>
        )}
      </AntModal>
    </>
  );
};

export default MedicalRequestModal;
