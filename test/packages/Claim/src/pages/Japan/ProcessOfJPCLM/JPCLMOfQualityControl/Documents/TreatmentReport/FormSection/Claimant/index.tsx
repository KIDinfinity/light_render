import React, { Component } from 'react';
import moment from 'moment';
import { Form } from 'antd';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { formUtils } from 'basic/components/Form';

import FormSection, { FormItemInput, FormItemDatePicker } from 'basic/components/Form/FormSection';
import Layout from './Layout';

interface IProps {
  dispatch: Dispatch;
  form?: any;
  formData: any;
  documentId: string;
  applicationNo: string;
  taskNotEditable: boolean;
}

class Claimant extends Component<IProps> {
  render() {
    const { form, taskNotEditable, documentId } = this.props;
    return (
      <FormSection
        form={form}
        formId={`Claimant_${documentId}`}
        layout={Layout}
        title="claim.title.claimantSignature"
      >
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          required
          formName="insuredNameOfSignature"
          maxLength={30}
          labelId="claim.claimant.insuredNameOfSignature"
        />
        <FormItemDatePicker
          form={form}
          disabled={taskNotEditable}
          formName="dateOfSignature"
          required
          labelId="claim.treatment.dateOfSignature"
          format="L"
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
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, ['dateOfSignature']);
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
        dateOfSignature: (value: any) => (value ? moment(value) : null),
      });
    },
  })(Claimant)
);
