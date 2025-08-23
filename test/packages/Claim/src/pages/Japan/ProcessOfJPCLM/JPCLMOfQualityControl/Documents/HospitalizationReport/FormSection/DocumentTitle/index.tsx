import React, { Component } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import FormSection, {
  FormItemSelect,
  FormItemInput,
  FormItemDatePicker,
} from 'basic/components/Form/FormSection';
import { formUtils } from 'basic/components/Form';
import { VLD_000259 } from 'claim/pages/Japan/ProcessOfJPCLM/JPCLMOfQualityControl/ValidatorRules/Validators';
import { documentUtils } from 'claim/pages/Japan/ProcessOfJPCLM/JPCLMOfQualityControl/Utils';
import moment from 'moment';

import Layout from './Layout';

interface IProps {
  dispatch: Dispatch;
  form?: any;
  formData: any;
  documentId: string;
  applicationNo: string;
  taskNotEditable: boolean;
  dictsOfGender: any;
}

class DocumentTitle extends Component<IProps> {
  render() {
    const { form, taskNotEditable, documentId, dictsOfGender, bpoFormDataList } = this.props;
    const insuredNameList = documentUtils.getNameArray(bpoFormDataList, documentId);
    return (
      <FormSection
        form={form}
        formId={`DocumentTitle_${documentId}`}
        layout={Layout}
        isHideBgColor
        isMargin={false}
        isPadding={false}
      >
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          required
          formName="injuredName"
          rules={[
            {
              validator: VLD_000259({ checkValue: insuredNameList }),
            },
          ]}
          maxLength={30}
          labelId="venus_claim.label.injuredName"
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          required
          formName="injuredSpellName"
          maxLength={30}
          labelId="venus_claim.label.injuredSpellName"
        />
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          required
          formName="injuredGender"
          labelId="venus_claim.label.gender"
          dicts={dictsOfGender}
        />
        <FormItemDatePicker
          form={form}
          disabled={taskNotEditable}
          required
          formName="injuredDateOfBirth"
          labelId="venus_claim.label.injuredDateOfBirth"
          format="L"
        />
        <FormItemDatePicker
          form={form}
          disabled={taskNotEditable}
          formName="receivedDate"
          required
          labelId="venus_claim.label.receivedDate"
          format="L"
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
    bpoFormDataList: JPCLMOfQualityController.claimProcessData.claimEntities.bpoFormDataList,
    dictsOfGender: dictionaryController.Gender,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, documentId, applicationNo, validating } = props;
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, [
        'receivedDate',
        'injuredDateOfBirth',
      ]);
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
        injuredSpellName: (value: string | object) => value,
        injuredGender: (value: string | object) => value,
        injuredDateOfBirth: (value: any) => (value ? moment(value) : null),
        receivedDate: (value: any) => (value ? moment(value) : null),
      });
    },
  })(DocumentTitle)
);
