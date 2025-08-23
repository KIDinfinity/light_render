import React from 'react';
import { Form, Icon } from 'antd';
import type { Dispatch } from 'dva';
import { connect, useSelector } from 'dva';
import { FormAntCard, formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section/index';
import styles from './index.less';
import UploadFile from '../UploadFile';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const Information = ({
  form,
  taskNotEditable,
  dispatch,
  sectionIndex,
  type,
}: {
  form: any;
  taskNotEditable: boolean;
  dispatch: Dispatch;
  sectionIndex: number;
  type: string;
}) => {
  const removeInformation = () => {
    dispatch({
      type: 'batchDocumentScanningController/removeUploadSection',
      payload: { sectionIndex },
    });
  };

  const claimProcessData = useSelector(
    ({ batchDocumentScanningController }: any) => batchDocumentScanningController?.claimProcessData
  );
  const claimData = claimProcessData[sectionIndex];
  const { successFlag, resultMessage } = claimData;
  const sectionEditable = successFlag === 0 || (!taskNotEditable && successFlag !== 1);
  const resultMessageJson = JSON.parse(resultMessage || '{}') || {};
  const { errMess, businessCaseNo } = resultMessageJson;
  return (
    <div className={styles.indexInformation}>
      {(successFlag === 0 || successFlag === 1) && (
        <div className={styles.msgLabel}>
          {successFlag === 1
            ? `${formatMessageApi({ Label_COM_ReportCenter: 'bs_proc_inst_id' })} ${businessCaseNo}`
            : errMess}
        </div>
      )}
      <FormAntCard key={sectionIndex}>
        {sectionIndex > 0 && sectionEditable && (
          <div className={styles.closeWrapped}>
            <Icon type="close" className={styles.closeIcon} onClick={removeInformation} />
          </div>
        )}
        <Section
          editable={sectionEditable}
          dispatch={dispatch}
          form={form}
          section="IndexingInformation"
          sectionIndex={sectionIndex}
        >
          <Fields.PolicyNo type={type} />
          <Fields.InsuredId />
          <Fields.InsuredName />
          <Fields.ClaimType />
          <Fields.ApplicationNo />
          <Fields.WakeUpSkipFlag />
        </Section>
        <UploadFile sectionIndex={sectionIndex} />
      </FormAntCard>
    </div>
  );
};

const FormComponent = connect(
  ({ claimEditable, formCommonController, batchDocumentScanningController }: any) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    validating: formCommonController.validating,
    claimProcessData: batchDocumentScanningController.claimProcessData,
    type: batchDocumentScanningController?.type,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, sectionIndex } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'batchDocumentScanningController/saveEntry',
              target: 'saveInformation',
              payload: {
                sectionIndex,
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'batchDocumentScanningController/saveFormData',
            target: 'saveInformation',
            payload: { sectionIndex, changedFields },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { claimProcessData, sectionIndex, type } = props;
      const indexInformation = claimProcessData[sectionIndex];
      return formUtils.mapObjectToFields({ ...indexInformation, type });
    },
  })(Information)
);

export default FormComponent;
