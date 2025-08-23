import React, { Component } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { formUtils } from 'basic/components/Form';
import FormSection, { FormItemInput, FormItemNumber } from 'basic/components/Form/FormSection';
import Layout from './Layout';

interface IProps {
  dispatch: Dispatch;
  form?: any;
  formData: any;
  documentId: string;
  applicationNo: string;
  taskNotEditable: boolean;
  causeOfDeath: any;
  DeathType: any;
  DeathfromProcedure: any;
}

class BasicInfomation extends Component<IProps> {
  render() {
    const { form, taskNotEditable, documentId } = this.props;
    return (
      <FormSection
        form={form}
        formId={`BasicInfomation_${documentId}`}
        layout={Layout}
        title="venus_claim.label.basicInformation"
      >
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          formName="policyOwnerName"
          maxLength={30}
          labelId="venus_claim.label.policyOwnerName"
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          maxLength={12}
          formName="policyId"
          labelId="venus_claim.label.policyId"
        />
        <FormItemNumber
          form={form}
          precision={0}
          disabled={taskNotEditable}
          formName="deathBenefit"
          labelId="venus_claim.label.deathBenefit"
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
  })(BasicInfomation)
);
