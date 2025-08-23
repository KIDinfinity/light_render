import React, { Component } from 'react';
import { connect } from 'dva';
import type { FormComponentProps } from 'antd/es/form';
import type { Dispatch } from 'redux';
import moment from 'moment';
import {
  VLD_000181,
  VLD_000018_Start,
  VLD_000018_End,
} from 'claim/pages/Japan/ProcessOfJPCLM/JPCLMOfQualityControl/ValidatorRules/Validators';
import FormSection, {
  FormItemDatePicker,
  FormItemInput,
  FormItemSelect,
  FormItemNumber,
} from 'basic/components/Form/FormSection';
import { Form } from 'antd';

import { formUtils } from 'basic/components/Form';
import { LayoutSection } from './Layout';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  claimant: any;
  formData: any;
  AdvancedTreatment: any;
  AdvTreatmentFlag: any;
  documentId: string;
  taskNotEditable: boolean;
}

class Advanced extends Component<IProps> {
  render() {
    const { form, AdvancedTreatment, AdvTreatmentFlag, taskNotEditable, documentId } = this.props;

    const advancedMedical = form.getFieldValue('advancedMedical');
    const endDateOfAdvancedMedical = form.getFieldValue('endDateOfAdvancedMedical');
    const startDateOfAdvancedMedical = form.getFieldValue('startDateOfAdvancedMedical');
    return (
      <FormSection
        form={form}
        formId={`Advanced_${documentId}`}
        layout={LayoutSection}
        title="venus_claim.label.advancedTreatmen"
      >
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          formName="advancedTreatmentFlag"
          labelId="venus_claim.label.advancedTreatmentFlag"
          dicts={AdvTreatmentFlag}
        />
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          formName="advancedMedical"
          labelId="venus_claim.label.advancedMedical"
          dicts={AdvancedTreatment}
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          required={VLD_000181({ checkValue: advancedMedical })}
          formName="advancedMedicalType"
          labelId="venus_claim.label.advancedMedicalType"
        />
        <FormItemDatePicker
          form={form}
          disabled={taskNotEditable}
          required={VLD_000181({ checkValue: advancedMedical })}
          formName="startDateOfAdvancedMedical"
          labelId="venus_claim.label.startDateOfAdvancedMedical"
          rules={[
            {
              validator: VLD_000018_Start({ checkValue: endDateOfAdvancedMedical }),
            },
          ]}
        />
        <FormItemDatePicker
          form={form}
          disabled={taskNotEditable}
          required={VLD_000181({ checkValue: advancedMedical })}
          formName="endDateOfAdvancedMedical"
          labelId="venus_claim.label.endDateOfAdvancedMedical"
          rules={[
            {
              validator: VLD_000018_End({ checkValue: startDateOfAdvancedMedical }),
            },
          ]}
        />
        <FormItemNumber
          form={form}
          disabled={taskNotEditable}
          required={VLD_000181({ checkValue: advancedMedical })}
          precision={0}
          formName="expense"
          labelId="venus_claim.label.expense"
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
    AdvancedTreatment: dictionaryController.AdvancedTreatment,
    AdvTreatmentFlag: dictionaryController.AdvTreatmentFlag,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, documentId, applicationNo, validating } = props;
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, [
        'startDateOfAdvancedMedical',
        'endDateOfAdvancedMedical',
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
        advancedMedical: (value: any) => value,
        advancedMedicalType: (value: any) => value,
        startDateOfAdvancedMedical: (value: any) => (value ? moment(value) : null),
        endDateOfAdvancedMedical: (value: any) => (value ? moment(value) : null),
        expense: (value: any) => value,
      });
    },
  })(Advanced)
);
