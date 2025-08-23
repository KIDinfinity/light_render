import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import type { IDictionary } from '@/dtos/dicts';
import FormSection, {
  FormItemCheckbox,
  FormItemInput,
  FormItemSelect,
} from 'basic/components/Form/FormSection';
import { Form } from 'antd';

import { formUtils } from 'basic/components/Form';
import Layout from './Layout';

interface IProps {
  dispatch: Dispatch<any>;
  RepCategory: IDictionary[];
  formData: any;
  documentId: string;
  taskNotEditable: boolean;
}

class ProxyRequest extends Component<IProps> {
  render() {
    const { form, RepCategory, taskNotEditable, documentId } = this.props;

    return (
      <FormSection
        form={form}
        formId={`ProxyRequest_${documentId}`}
        layout={Layout}
        title="venus_claim.label.representative"
      >
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          formName="proxyName"
          maxLength={30}
          labelId="venus_claim.label.proxyName"
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          formName="proxySpellName"
          maxLength={90}
          labelId="venus_claim.label.proxySpellName"
        />
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          formName="proxyCategory"
          labelId="venus_claim.label.proxyCategory"
          dicts={RepCategory}
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          formName="proxyRelationshipWithInsured"
          maxLength={30}
          labelId="venus_claim.label.proxyRelationshipWithInsured"
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          formName="insuredSignatureForProxy"
          maxLength={30}
          labelId="venus_claim.label.insuredSignatureForProxy"
        />
        <FormItemCheckbox
          form={form}
          disabled={taskNotEditable}
          formName="proxyApprovalSign"
          labelId="venus_claim.label.proxyApprovalSign"
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          formName="proxyReason"
          maxLength={240}
          labelId="venus_claim.label.proxyReason"
          name="proxyReason"
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
    RepCategory: dictionaryController.RepCategory,
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
  })(ProxyRequest)
);
