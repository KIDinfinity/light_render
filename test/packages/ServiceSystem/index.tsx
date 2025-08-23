import React, { useState, useEffect } from 'react';
import lodash from 'lodash';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'dva';
import { Button } from 'antd';
import { NAMESPACE } from './activity.config';
import { Status } from './Enum';
import Steps from './Steps';
import UserList from './UserList';
import CaseList from './CaseList';
import { queryData } from '@/services/dcSnapshotService';
import { safeParseUtil } from '@/utils/utils';
import NoPermissionException from '@/auth/Exceptions/NoPermission';
import { saveSnashot } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import { OptionNode } from './Enum';
import styles from './index.less';

export default () => {
  const dispatch = useDispatch();
  const [stepActive, setStepActive] = useState<string>('');
  const [confirmArray, setConfirmArray] = useState<string[]>([]);

  const userId = useSelector(({ user }: any) => user.currentUser.userId);
  const systemStatus = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.systemStatus
  );
  const operationSupport = useSelector((state: any) => state.user.currentUser.operationSupport);
  const downInfo =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.downInfo) || {};

  const saveSnapshot = ({ stepActive, confirmArray }: any) => {
    saveSnashot({
      taskDetail: userId,
      dataForSubmit: {
        stepActive,
        confirmArray: confirmArray || [],
        downInfo,
      },
      optionType: EOptionType.Save,
    });
  };
  const getSnapshot = async () => {
    const snapShot = await queryData({
      dataType: 'mainPage',
      taskId: `operation-${userId}`,
    });

    const snapShotData = safeParseUtil(lodash.get(snapShot, 'resultData.dataValue', '{}'));
    if (!lodash.isEmpty(snapShotData)) {
      setStepActive(snapShotData?.stepActive);
      setConfirmArray(snapShotData?.confirmArray);

      dispatch({
        type: `${NAMESPACE}/saveDownInfo`,
        payload: {
          ...snapShotData?.downInfo,
        },
      });
    }
  };

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getSystemStatus`,
    });
    getSnapshot();
  }, []);

  useEffect(() => {
    if (systemStatus === Status.Down) {
      setStepActive(OptionNode.ResumeService);
    }
  }, [systemStatus]);

  return (
    <>
      {operationSupport === 'Y' ? (
        <div className={styles.serviceSystem}>
          <p className={styles.title}>
            System status：
            <span
              className={classNames(styles.status, systemStatus === Status.Down && styles.done)}
            >
              {lodash.upperFirst(systemStatus)}
            </span>
          </p>
          <div className={styles.process}>
            <Steps
              stepActive={stepActive}
              saveSnapshot={saveSnapshot}
              setStepActive={setStepActive}
              confirmArray={confirmArray}
              setConfirmArray={setConfirmArray}
            />

            {systemStatus === Status.Down ? (
              <div className={styles.resumeBtn}>
                <Button
                  type="primary"
                  onClick={async () => {
                    await dispatch({
                      type: `${NAMESPACE}/setNotice`,
                      payload: {
                        title: OptionNode.ResumeService,
                      },
                    });
                    setStepActive(OptionNode.ScanOnlineUser);
                    saveSnapshot({ stepActive: OptionNode.ScanOnlineUser, confirmArray: [] });
                  }}
                >
                  Resume Create Case Service
                </Button>
              </div>
            ) : (
              <div className={styles.center}>
                {(stepActive === OptionNode.ScanOnlineUser ||
                  stepActive === OptionNode.SendNoticeToOnlineUse ||
                  stepActive === OptionNode.ForceKickOut) && <UserList stepActive={stepActive} />}
                {(stepActive === OptionNode.ScanOnlineCase ||
                  stepActive === OptionNode.StopCreateCaseService) && <CaseList />}
              </div>
            )}
          </div>
        </div>
      ) : (
        <NoPermissionException />
      )}
    </>
  );
};
