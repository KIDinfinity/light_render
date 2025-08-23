import React, { Component } from 'react';
import type { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import type { IDictionary } from '@/dtos/dicts';
import FormSection, {
  FormItemCheckbox,
  FormItemInput,
  FormItemSelect,
  FormItemPhone,
} from 'basic/components/Form/FormSection';
import { Form } from 'antd';

import { formUtils } from 'basic/components/Form';
import Layout from './Layout';

interface IProps extends FormComponentProps {
  dispatch: Dispatch;
  claimant: any;
  ContactInfoType: IDictionary[];
  formData: any;
  documentId: string;
  taskNotEditable: boolean;
}

class ClaimantInfo extends Component<IProps> {
  render() {
    const { form, ContactInfoType = [], taskNotEditable, documentId } = this.props;
    return (
      <FormSection
        form={form}
        formId={`ClaimantInfo_${documentId}`}
        layout={Layout}
        title="venus_claim.label.claimant.beneficiary"
      >
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          required
          formName="applicantName"
          maxLength={30}
          labelId="venus_claim.label.applicantName"
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          formName="applicantSpellName"
          maxLength={90}
          labelId="venus_claim.label.applicantSpellName"
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          formName="applicantPostcode"
          maxLength={20}
          required
          labelId="venus_claim.label.applicantModifiedPostCode"
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          formName="applicantAddress"
          maxLength={240}
          labelId="venus_claim.label.applicantModifiedAddress"
          name="address"
          required
        />
        <FormItemPhone
          form={form}
          disabled={taskNotEditable}
          formName="applicantPhoneNo"
          maxLength={30}
          required
          labelId="venus_claim.label.applicantModifiedPhoneNo"
        />
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          formName="applicantContactInfoType"
          labelId="venus_claim.label.applicantContactInfoType"
          dicts={ContactInfoType}
        />
        <FormItemCheckbox
          form={form}
          valueType="string"
          disabled={taskNotEditable}
          formName="applicantSMSNo"
          labelId="venus_claim.label.applicantSMSNo"
        />
      </FormSection>
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
    ContactInfoType: dictionaryController.ContactInfoType,
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

      return formUtils.mapObjectToFields(formData, {
        applicantContactInfoType: (value: any) => (value === 'null' ? '' : value),
        applicantSMSNo: (value: any) => (value === '0' ? false : value),
      });
    },
  })(ClaimantInfo)
);
