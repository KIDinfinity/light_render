import React, { useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'dva';
import type { Dispatch } from 'redux';
import { Spin } from 'antd';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import classNames from 'classnames';
import VersionControl from 'configuration/components/VersionControl';
import { Mode } from 'configuration/constant';
import Header from 'configuration/components/Header';
import FormData from './FormData';
import TableList from './TableList';
import ExcelModal from './Modal/ExcelModal';
import WarnModal from './Modal/WarnModal';
import styles from './index.less';

function DataConfiguration(props: any) {
  const dispatch: Dispatch = useDispatch();
  const functionLoading: any = useSelector(
    (state: any) => state.loading.effects['dataConfigurationController/getClaim']
  );
  const functionData: any = useSelector(
    (state: any) => state.dataConfigurationController.functionData
  );
  const isUpdate: any = useSelector((state: any) => state.dataConfigurationController.isUpdate);
  const showTableList: any = useSelector(
    (state: any) => state.dataConfigurationController?.showTableList
  );
  const mode: any = useSelector((state: any) => state.dataConfigurationController?.mode);
  const versionList: any = useSelector(
    (state: any) => state.dataConfigurationController?.versionList
  );
  const taskNotEditable: any = useSelector((state: any) => state.claimEditable.taskNotEditable);
  const authorityCodeList: any =
    useSelector((state: any) => state.authController?.authorityCodeList) || [];
  const functionCode: any = useSelector(
    (state: any) => state.dataConfigurationController?.functionData?.functionCode
  );
  const functionName: any = useSelector(
    (state: any) => state.dataConfigurationController?.functionData?.functionName
  );
  const pageTemplateType: any = useSelector(
    (state: any) => state.dataConfigurationController?.functionData?.task?.pageTemplateType
  );
  const previewRecord: any = useSelector(
    (state: any) => state.configurationController?.previewRecord
  );
  const { taskDetail } = props;
  const clsString = classNames(styles.main, { [styles.isNoPadding]: Mode.Abbreviated === mode });
  const onClick = () => {
    dispatch({
      type: 'dataConfigurationController/toggleTableList',
      payload: { showTableList: !showTableList },
    });
  };

  const onVersionClick = ({ record: formData, versionList: list }: any) => {
    dispatch({
      type: 'dataConfigurationController/saveFormData',
      payload: {
        formData,
        versionList: list,
      },
    });
  };

  useEffect(() => {
    dispatch({
      type: 'dataConfigurationController/getClaim',
      payload: {
        previewRecord,
        taskId: taskDetail?.taskId,
      },
    });
    return () => {
      dispatch({
        type: 'dataConfigurationController/clearClaim',
      });
    };
  }, []);

  return (
    <div className={styles.configuration}>
      {!functionLoading ? (
        <>
          {functionData?.id && (
            <>
              <div className={clsString}>
                <div className={styles.formData}>
                  <VersionControl
                    isShow={isUpdate}
                    isEditable={!taskNotEditable}
                    versionList={versionList}
                    onVersionClick={onVersionClick}
                    authorityCodeList={authorityCodeList}
                  />
                  {/**
                    //@ts-ignore */}
                  <Header
                    functionCode={functionCode}
                    pageTemplateType={pageTemplateType}
                    functionName={functionName}
                  />
                  {/**
                    //@ts-ignore */}
                  <FormData />
                </div>
                <div
                  className={`${styles.tableList} ${showTableList && !isUpdate ? '' : styles.hide}`}
                >
                  {/**
                    //@ts-ignore */}
                  <TableList />
                </div>
              </div>
              {/**
                    //@ts-ignore */}
              <ExcelModal />
              <WarnModal />
            </>
          )}
        </>
      ) : (
        <div className={styles.emptyBox}>
          <Spin tip="Loading..." size="large" />
        </div>
      )}
    </div>
  );
}
export default connect()(setClaimEditableHoc(DataConfiguration));
