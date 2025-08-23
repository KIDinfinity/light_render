import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import { Modal } from 'antd';
import type { Dispatch } from 'redux';
import VersionControl from 'configuration/components/VersionControl';
import lodash from 'lodash';
import styles from './index.less';
import Sider from './Sider';
import FormSection from './FormSection';
import { Status, Operation, FunctionCode } from '../../Enum';
import Version from './Version';

function PreviewModal() {
  const dispatch: Dispatch = useDispatch();
  const previewModal: boolean = useSelector(
    (state: any) => state.configurationController.previewModal
  );
  const previewRecord: any = useSelector(
    (state: any) => state.configurationController.previewRecord
  );
  const functionData: any = useSelector((state: any) => state.configurationController.functionData);
  const versionList: any[] = useSelector(
    (state: any) => state.configurationController?.versionList
  );
  const authorityCodeList: any[] =
    useSelector((state: any) => state.authController?.authorityCodeList) || [];
  const { operationList, functionCode, dataFieldList } = functionData;
  const isUnderAudit = useMemo(() => {
    const { cc_latest_status, page_template_type, image_id } = previewRecord;
    return (
      cc_latest_status === Status.underAuditEditor &&
      [Operation.UPDATE_Multiple, Operation.Update].includes(page_template_type) &&
      image_id
    );
  }, [previewRecord]);

  const onCancel = async () => {
    dispatch({
      type: 'configurationController/hidePreviewModal',
    });
    dispatch({
      type: 'configurationController/resetPreview',
      payload: {
        functionCode: functionData?.functionCode,
      },
    });
  };

  const afterClose = async () => {
    console.log('afterClose');
  };

  const onVersionClick = ({ record }: any) => {
    dispatch({
      type: 'configurationController/savePreviewRecord',
      payload: {
        previewRecord: record,
      },
    });

    dispatch({
      type: 'configureUserController/triggerPreview',
      payload: {
        previewRecord: record,
      },
    });
  };

  const handlGetVersionData = async () => {
    // // 调取审核中版本数据
    if (isUnderAudit) {
      if (
        lodash.includes(
          [
            FunctionCode.Fun_venus_uc_user_general_information,
            FunctionCode.Fun_venus_rbac_rbac_group,
            FunctionCode.Fun_venus_rbac_rbac_role,
            FunctionCode.Fun_venus_claim_claim_dict_medical_provider,
          ],
          functionData?.functionCode
        )
      ) {
        await dispatch({
          type: 'configurationController/getTaskData',
          payload: {
            case_no: previewRecord?.case_no,
          },
        });
      } else {
        await dispatch({
          type: 'configurationController/getDataImage',
          payload: {
            image_id: previewRecord?.image_id,
          },
        });
      }
    }
    await dispatch({
      type: 'configurationController/getVersionList',
      payload: {
        record: previewRecord,
        functionId: functionData?.id,
      },
    });
  };
  useEffect(() => {
    handlGetVersionData();
  }, [previewModal]);
  return (
    <>
      <Modal
        className={styles.previewModal}
        visible={previewModal}
        width={1200}
        footer={false}
        afterClose={afterClose}
        onCancel={onCancel}
        maskStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.65)' }}
      >
        <div className={styles.container}>
          <div className={styles.buttonGroup}>
            <Sider
              functionCode={functionCode}
              operationList={operationList}
              previewRecord={previewRecord}
            />
          </div>
          <div className={styles.content}>
            <div className={styles.versionControl}>
              <VersionControl
                versionList={versionList}
                onVersionClick={onVersionClick}
                isShow
                authorityCodeList={authorityCodeList}
              />
            </div>
            {isUnderAudit ? (
              <Version />
            ) : (
              <FormSection
                formData={previewRecord}
                dataFieldList={dataFieldList}
                functionCode={functionCode}
              />
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}
export default PreviewModal;
