import React, { useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'dva';
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
  const functionLoading: boolean = useSelector(
    (state: any) => state.loading.effects['configureRoleController/getClaim']
  );
  const isUpdate: any = useSelector((state: any) => state.configureRoleController.isUpdate);
  const mode: any = useSelector((state: any) => state.configureRoleController?.mode);
  const functionCode: any = useSelector(
    (state: any) => state.configureRoleController?.functionData?.functionCode
  );
  const functionName: any = useSelector(
    (state: any) => state.configureRoleController?.functionData?.functionName
  );
  const pageTemplateType: any = useSelector(
    (state: any) => state.configureRoleController?.functionData?.task?.pageTemplateType
  );
  const { previewRecord, taskDetail } = props;
  const clsString = classNames(styles.main, { [styles.isNoPadding]: Mode.Abbreviated === mode });

  useEffect(() => {
    dispatch({
      type: 'configureRoleController/getClaim',
      payload: {
        previewRecord,
        taskId: taskDetail?.taskId,
      },
    });
    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: ['Dropdown_CFG_UserStatus'],
    });
    return () => {
      dispatch({
        type: 'configureRoleController/clearClaim',
      });
    };
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
            {taskDetail?.taskDefKey === TaskDefKey.BP_DT_ACT001 && <FormData />}
            <div
              className={classNames(styles.tableList, {
                [styles.hide]: isUpdate && taskDetail?.taskDefKey === TaskDefKey.BP_DT_ACT001,
              })}
            >
              <TableList />
            </div>
          </div>
          <WarnModal />
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
