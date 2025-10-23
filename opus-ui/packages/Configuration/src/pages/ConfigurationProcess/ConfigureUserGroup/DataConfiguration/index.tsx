import React, { useEffect } from 'react';
import { useSelector, useDispatch,connect } from 'dva';
import type { Dispatch } from 'redux';
import { Spin } from 'antd';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import classNames from 'classnames';
import TaskDefKey from 'enum/TaskDefKey';
import { Mode } from 'configuration/constant';
import Header from 'configuration/components/Header';
import FormData from './FormData';
import TableList from './TableList';
import styles from './index.less';
import WarnModal from './Modal/WarnModal';

function DataConfiguration(props: any) {
  const dispatch: Dispatch = useDispatch();
  const functionLoading = useSelector((state: any) => state.loading.effects['configureUserGroupController/getClaim']);
  const isUpdate = useSelector((state: any) => state.configureUserGroupController.isUpdate);
  const mode = useSelector((state: any) => state.configureUserGroupController?.mode);
  const functionCode = useSelector((state: any) => state.configureUserGroupController?.functionData?.functionCode);
  const functionName = useSelector((state: any) => state.configureUserGroupController?.functionData?.functionName);
  const pageTemplateType = useSelector((state: any) => state.configureUserGroupController?.functionData?.task?.pageTemplateType);
  const showWarnModal = useSelector((state: any) => state.configureUserGroupController?.showWarnModal);
  const {  previewRecord, taskDetail } = props;
  const clsString = classNames(styles.main, { [styles.isNoPadding]: Mode.Abbreviated === mode });
  useEffect(() => {
    dispatch({
      type: 'configureUserGroupController/getClaim',
      payload: {
        previewRecord,
        taskId: taskDetail?.taskId,
      },
    });
    return () => {
      dispatch({
        type: 'configureUserGroupController/clearClaim',
      });

    }
  }, []);

  return (
    <div className={styles.configuration}>
      {!functionLoading ? (
        <div className={clsString}>
          <div className={styles.formData}>
            <Header
              functionCode={functionCode}
              pageTemplateType={pageTemplateType}
              functionName={functionName}
            />
            {taskDetail?.taskDefKey === TaskDefKey.BP_DT_ACT001 && (
              <FormData taskDetail={taskDetail} />
            )}
            <div
              className={classNames(styles.tableList, {
                [styles.hide]: isUpdate && taskDetail?.taskDefKey === TaskDefKey.BP_DT_ACT001,
              })}
            >
              <TableList />
            </div>
          </div>
          {showWarnModal && <WarnModal />}
        </div>
      ) : (
        <div className={styles.emptyBox}>
          <Spin tip="Loading..." size="large" />
        </div>
      )}
    </div>
  );

}
export default connect()(setClaimEditableHoc(DataConfiguration));
