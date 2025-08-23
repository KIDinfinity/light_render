import React, { Component } from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import type { IDictionary } from '@/dtos/dicts';
import moment from 'moment';
import FormSection, {
  FormItemInput,
  FormItemSelect,
  FormItemDatePicker,
  FormItemNumber,
} from 'basic/components/Form/FormSection';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { VLD_000268 } from 'claim/pages/Japan/ProcessOfJPCLM/JPCLMOfQualityControl/ValidatorRules/Validators';
import Layout from './Layout';

interface IProps {
  dispatch: Dispatch;
  form: any;
  applicationType: IDictionary[];
  formData: any;
  documentId: string;
  taskNotEditable: boolean;
  currentTab: string;
  expectPolicyList: any[];
}

class BasicInformation extends Component<IProps> {
  get expectPolicyList() {
    const { expectPolicyList, currentTab } = this.props;
    return lodash
      .chain(expectPolicyList)
      .filter((item) => item.applicationNo === currentTab)
      .map((item) => item.policyId)
      .value();
  }

  render() {
    const { form, applicationType, taskNotEditable, documentId } = this.props;
    return (
      <FormSection
        form={form}
        formId={`BasicInformationrt_${documentId}`}
        layout={Layout}
        title="venus_claim.label.basicInformation"
      >
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          required
          formName="policyOwnerName"
          maxLength={30}
          labelId="venus_claim.label.policyOwnerName"
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          required
          maxLength={12}
          rules={[
            {
              validator: VLD_000268({ expectPolicyList: this.expectPolicyList }),
            },
          ]}
          formName="firstPolicyId"
          labelId="venus_claim.label.firstPolicyId"
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          maxLength={12}
          rules={[
            {
              validator: VLD_000268({ expectPolicyList: this.expectPolicyList }),
            },
          ]}
          formName="secondPolicyId"
          labelId="venus_claim.label.secondPolicyId"
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          formName="thirdPolicyId"
          rules={[
            {
              validator: VLD_000268({ expectPolicyList: this.expectPolicyList }),
            },
          ]}
          maxLength={12}
          labelId="venus_claim.label.thirdPolicyId"
        />
        <FormItemNumber
          form={form}
          disabled={taskNotEditable}
          precision={0}
          formName="premiumOfLivingNeeds"
          labelId="venus_claim.label.premiumOfLivingNeeds"
        />
        <FormItemDatePicker
          form={form}
          disabled={taskNotEditable}
          formName="editDate"
          labelId="venus_claim.label.editDate"
          format="L"
        />
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          required
          mode="multiple"
          name="claimType"
          formName="claimType"
          labelId="venus_claim.label.claimType"
          dicts={applicationType}
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
    currentTab: JPCLMOfQualityController.currentTab,
    expectPolicyList: JPCLMOfQualityController.claimProcessData.claimDatas.expectPolicyList,
    validating: formCommonController.validating,
    formData:
      JPCLMOfQualityController.claimProcessData.claimEntities.bpoFormDataList[documentId].formData,
    applicationType: dictionaryController.applicationType,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, documentId, applicationNo, validating } = props;
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, ['editDate']);
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
        injuredName: (value: string | object) => value,
        policyOwnerName: (value: string | object) => value,
        firstPolicyId: (value: string | object) => value,
        secondPolicyId: (value: string | object) => value,
        thirdPolicyId: (value: string | object) => value,
        claimType: (value: string | object) => value,
        premiumOfLivingNeeds: (value: string | object) => value,
        editDate: (value: any) => (value ? moment(value) : null),
      });
    },
  })(BasicInformation)
);
