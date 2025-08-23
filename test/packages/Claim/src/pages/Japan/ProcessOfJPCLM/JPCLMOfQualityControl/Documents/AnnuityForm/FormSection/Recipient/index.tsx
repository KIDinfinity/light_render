import React, { Component } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { formUtils } from 'basic/components/Form';

import FormSection, { FormItemInput } from 'basic/components/Form/FormSection';
import Layout from './Layout';

interface IProps {
  dispatch: Dispatch;
  form?: any;
  formData: any;
  documentId: string;
  applicationNo: string;
  taskNotEditable: boolean;
}

class Recipient extends Component<IProps> {
  render() {
    const { form, taskNotEditable, documentId } = this.props;
    return (
      <FormSection
        form={form}
        formId={`Recipient_${documentId}`}
        layout={Layout}
        title="claim.title.recipient"
      >
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          required
          formName="beneficiaryName"
          maxLength={30}
          labelId="claim.recipient.beneficiaryName"
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          required
          formName="beneficiaryNameSpelling"
          maxLength={90}
          labelId="claim.recipient.beneficiarySpellName"
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          formName="beneficiaryPostCode"
          maxLength={100}
          labelId="claim.recipient.beneficiaryPostCode"
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          formName="beneficiaryAddress"
          maxLength={240}
          labelId="claim.recipient.beneficiaryAddress"
        />
      </FormSection>
    );
  }
}

export default connect(
  (
    { JPCLMOfQualityController, claimEditable, formCommonController }: any,
    { documentId }: any
  ) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    validating: formCommonController.validating,
    formData:
      JPCLMOfQualityController.claimProcessData.claimEntities.bpoFormDataList[documentId].formData,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, documentId, applicationNo, validating } = props;
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, []);
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
      return formUtils.mapObjectToFields(formData);
    },
  })(Recipient)
);
