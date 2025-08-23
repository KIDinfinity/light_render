import React, { Component } from 'react';
import { colorsPond } from '@/utils/constant';
import { Form } from 'antd';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import FormSection, { FormItemDatePicker } from 'basic/components/Form/FormSection';
import { formUtils } from 'basic/components/Form';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

import Layout from './Layout';

interface IProps {
  dispatch: Dispatch;
  form?: any;
  formData: any;
  documentId: string;
  applicationNo: string;
  taskNotEditable: boolean;
  dictsOfGender: any;
  indexKey: number;
}

class DocumentTitle extends Component<IProps> {
  get RequestedBy() {
    const { formData } = this.props;
    const { requestedBy } = formData;
    return formatMessageApi({ Label_DOC_Document: requestedBy });
  }

  get DocumentId() {
    const {
      formData: { bpmDocumentId },
    } = this.props;
    return bpmDocumentId;
  }

  render() {
    const { form, taskNotEditable, documentId, indexKey } = this.props;
    return (
      <div className={styles.document} style={{ background: `${colorsPond[indexKey]}` }}>
        <div className={styles.title}>
          <div className={styles.left} title={this.DocumentId}>
            {this.DocumentId}
          </div>
          <div className={styles.right} title={this.RequestedBy}>
            {this.RequestedBy}
          </div>
        </div>
        <FormSection
          form={form}
          formId={`DocumentTitle_${documentId}`}
          layout={Layout}
          isHideBgColor
          isMargin={false}
          isPadding={false}
        >
          <FormItemDatePicker
            form={form}
            disabled={taskNotEditable}
            formName="receivedDate"
            required
            labelId="venus_claim.label.receivedDate"
            format="L"
          />
        </FormSection>
      </div>
    );
  }
}
export default connect(
  (
    { JPCLMOfQualityController, claimEditable, formCommonController, dictionaryController }: any,
    { documentId }: any
  ) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    validating: formCommonController.validating,
    formData:
      JPCLMOfQualityController.claimProcessData.claimEntities.bpoFormDataList[documentId].formData,
    dictsOfGender: dictionaryController.Gender,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, documentId, applicationNo, validating } = props;
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, ['receivedDate']);
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfQualityController/saveFormDataEntry',
              target: 'JPCLMOfQualityController/saveFormData',
              payload: {
                changedFields: finalChangedFields,
                documentId,
                applicationNo,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfQualityController/saveFormDataLatest',
            target: 'saveFormData',
            payload: {
              changedFields: finalChangedFields,
              documentId,
              applicationNo,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { formData } = props;

      return formUtils.mapObjectToFields(formData, {
        receivedDate: (value: any) => (value ? moment(value) : null),
        insuredName: (value) => value,
      });
    },
  })(DocumentTitle)
);
