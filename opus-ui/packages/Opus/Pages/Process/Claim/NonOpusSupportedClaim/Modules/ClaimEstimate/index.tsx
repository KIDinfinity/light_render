import React, { useMemo } from 'react';
import { Modal, Button } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import { LS, LSKey } from '@/utils/cache';

import { NAMESPACE } from 'opus/Pages/Process/Claim/NonOpusSupportedClaim/activity.config';
import TaskStatus from 'basic/enum/TaskStatus';

import Incident from './Incident';
import Result from './Result';

import styles from './index.less';

const Main = () => {
  const dispatch = useDispatch();
  const data =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.businessData?.nonSupportClaimEstimation
    ) || {};
  const show =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEstimateShow) ||
    false;

  const { taskStatus, assignee } = useSelector(
    ({ processTask }: any) => processTask?.getTask || {}
  );

  const editable = useMemo(() => {
    return taskStatus === TaskStatus.todo && LS.getItem(LSKey.CURRENTUSER)?.userId === assignee;
  }, [taskStatus, assignee]);

  const handleCancel = () => {
    dispatch({
      type: `${NAMESPACE}/claimEstimateShowSave`,
      payload: {
        show: false,
      },
    });
  };

  return (
    <Modal
      visible={show}
      onCancel={() => {
        handleCancel();
      }}
      footer={
        <div className={styles.buttonGroup}>
          <Button
            className={styles.popUpModalButton}
            onClick={() => {
              handleCancel();
            }}
          >
            {formatMessageApi({
              Label_COM_Opus: 'cancel',
            })}
          </Button>
        </div>
      }
      width="80%"
      centered
      title={formatMessageApi({ Label_CLM_Opus: 'quickClaimEstimate' })}
      destroyOnClose
      maskClosable={false}
      className={styles.claimEstimateWrap}
    >
      <div className={styles.containerWrap}>
        <Incident data={data?.nonSupportIncident} editable={editable} />
        <Result data={data?.claimEstimationResult} editable={editable} />
      </div>
    </Modal>
  );
};

export default Main;
