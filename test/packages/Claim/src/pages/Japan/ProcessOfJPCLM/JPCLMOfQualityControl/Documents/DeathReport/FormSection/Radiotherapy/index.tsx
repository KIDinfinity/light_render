import React, { Component } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import FormSection, {
  FormItemDatePicker,
  FormItemInput,
  FormItemSelect,
} from 'basic/components/Form/FormSection';
import type { Dispatch } from 'redux';
import moment from 'moment';
import { formUtils } from 'basic/components/Form';
import {
  VLD_000095_Start,
  VLD_000095_End,
} from 'claim/pages/Japan/ProcessOfJPCLM/JPCLMOfQualityControl/ValidatorRules/Validators';
import Layout from './Layout';

interface IProps {
  dispatch: Dispatch;
  documentId: any;
  treatmentId: any;
  otherProcedureItem: any;
  form: any;
  RadioType: any;
  RadioThermoFlag: any;
  formData: any;
  taskNotEditable: boolean;
}

class Radiotherapy extends Component<IProps> {
  render() {
    const { form, RadioType, RadioThermoFlag, taskNotEditable, documentId } = this.props;

    const toDate = form.getFieldValue('toDate');
    const fromDate = form.getFieldValue('fromDate');

    return (
      <FormSection
        form={form}
        formId={`Radiotherapy_${documentId}`}
        layout={Layout}
        title="venus_claim.label.radiotherapyThermotheraphy"
      >
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          dicts={RadioThermoFlag}
          formName="radioThermotherapyFlag"
          labelId="venus_claim.label.radioThermotherapyFlag"
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          formName="partOfBody"
          maxLength={100}
          labelId="venus_claim.label.partOfBody"
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          formName="dose"
          maxLength={100}
          labelId="venus_claim.label.dose"
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          maxLength={100}
          formName="mCode"
          labelId="venus_claim.label.mCode"
        />
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          dicts={RadioType}
          formName="radiationType"
          labelId="claim.radiotherapy.radiationType"
          name="radiationType"
        />
        <FormItemDatePicker
          form={form}
          disabled={taskNotEditable}
          formName="fromDate"
          labelId="claim.radiotherapy.fromDate"
          rules={[
            {
              validator: VLD_000095_Start({ checkValue: toDate }),
            },
          ]}
        />
        <FormItemDatePicker
          form={form}
          disabled={taskNotEditable}
          formName="toDate"
          labelId="claim.radiotherapy.endDate"
          rules={[
            {
              validator: VLD_000095_End({ checkValue: fromDate }),
            },
          ]}
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
    RadioType: dictionaryController.RadioType,
    RadioThermoFlag: dictionaryController.RadioThermoFlag,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, documentId, applicationNo, validating } = props;
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, [
        'fromDate',
        'toDate',
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
        radioThermotherapyFlag: (value: any) => value,
        partOfBody: (value: any) => value,
        dose: (value: any) => value,
        mCode: (value: any) => value,
        radiationType: (value: any) => value,
        fromDate: (value: any) => (value ? moment(value) : null),
        toDate: (value: any) => (value ? moment(value) : null),
      });
    },
  })(Radiotherapy)
);
