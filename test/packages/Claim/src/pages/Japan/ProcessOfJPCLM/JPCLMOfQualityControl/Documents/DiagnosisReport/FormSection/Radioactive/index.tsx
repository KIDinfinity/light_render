import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import {
  VLD_000095_Start,
  VLD_000095_End,
} from 'claim/pages/Japan/ProcessOfJPCLM/JPCLMOfQualityControl/ValidatorRules/Validators';
import moment from 'moment';
import FormSection, {
  FormItemDatePicker,
  FormItemInput,
  FormItemSelect,
} from 'basic/components/Form/FormSection';
import { Form } from 'antd';
import { LayoutSection } from './Layout';
import { formUtils } from 'basic/components/Form';

interface IProps {
  dispatch: Dispatch;
  documentId: any;
  form: any;
  RadioType: any;
  RadioThermoFlag: any;
  formData: any;
  taskNotEditable: boolean;
}

class Radioactive extends Component<IProps> {
  render() {
    const { form, RadioType, RadioThermoFlag, taskNotEditable, documentId } = this.props;

    const endDateOfRadiationTherapy = form.getFieldValue('endDateOfRadiationTherapy');
    const startDateOfRadiationTherapy = form.getFieldValue('startDateOfRadiationTherapy');

    return (
      <FormSection
        form={form}
        formId={`Radioactive_${documentId}`}
        layout={LayoutSection}
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
          formName="bodyPartOfRadiationTherapy"
          maxLength={100}
          labelId="venus_claim.label.bodyPartOfRadiationTherapy"
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
          formName="radiationTherapyType"
          labelId="venus_claim.label.radiationTherapyType"
        />
        <FormItemDatePicker
          form={form}
          disabled={taskNotEditable}
          name="startDateOfRadiationTherapy"
          formName="startDateOfRadiationTherapy"
          labelId="venus_claim.label.startDateOfRadiationTherapy"
          rules={[
            {
              validator: VLD_000095_Start({ checkValue: endDateOfRadiationTherapy }),
            },
          ]}
        />
        <FormItemDatePicker
          form={form}
          disabled={taskNotEditable}
          formName="endDateOfRadiationTherapy"
          name="endDateOfRadiationTherapy"
          labelId="venus_claim.label.endDateOfRadiationTherapy"
          rules={[
            {
              validator: VLD_000095_End({ checkValue: startDateOfRadiationTherapy }),
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
        'startDateOfRadiationTherapy',
        'endDateOfRadiationTherapy',
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
        bodyPartOfRadiationTherapy: (value: any) => value,
        dose: (value: any) => value,
        mCode: (value: any) => value,
        radiationTherapyType: (value: any) => value,
        startDateOfRadiationTherapy: (value: any) => (value ? moment(value) : null),
        endDateOfRadiationTherapy: (value: any) => (value ? moment(value) : null),
      });
    },
  })(Radioactive)
);
