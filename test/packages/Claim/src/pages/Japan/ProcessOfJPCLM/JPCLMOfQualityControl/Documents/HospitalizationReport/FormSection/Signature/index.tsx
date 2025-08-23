import React, { Component } from 'react';
import type { FormComponentProps } from 'antd/es/form';
import moment from 'moment';
import { connect } from 'dva';
import FormSection, { FormItemInput, FormItemDatePicker } from 'basic/components/Form/FormSection';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import Layout from './Layout';

interface IProps extends FormComponentProps {
  formData: any;
  documentId: string;
  taskNotEditable: boolean;
}

class Signature extends Component<IProps> {
  render() {
    const { form, taskNotEditable, documentId } = this.props;

    return (
      <FormSection
        form={form}
        formId={`Signature_${documentId}`}
        layout={Layout}
        title="venus_claim.label.signature"
      >
        <FormItemDatePicker
          form={form}
          disabled={taskNotEditable}
          required
          formName="dateOfSignature"
          labelId="venus_claim.label.dateOfSignature"
          format="L"
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          maxLength={100}
          required
          formName="insuredNameOfSignature"
          labelId="venus_claim.label.insuredNameOfSignature"
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
        insuredNameOfSignature: (value: string | object) => value,
      });
    },
  })(Signature)
);
