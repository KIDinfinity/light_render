import React, { Component } from 'react';
import type { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import moment from 'moment';
import FormSection, { FormItemInput, FormItemDatePicker } from 'basic/components/Form/FormSection';
import { Form } from 'antd';

import { formUtils } from 'basic/components/Form';
import Layout from './Layout';

interface IProps extends FormComponentProps {
  formData: any;
  documentId: string;
  taskNotEditable: boolean;
}

@connect(({ claimEditable, formCommonController }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  validating: formCommonController.validating,
}))
class Diagnosis extends Component<IProps> {
  render() {
    const { form, taskNotEditable, documentId } = this.props;

    return (
      <FormSection
        form={form}
        formId={`Diagnosis_${documentId}`}
        layout={Layout}
        title="venus_claim.label.diagnosisInformation"
      >
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          maxLength={100}
          required
          formName="diagnosisName"
          labelId="venus_claim.label.diagnosisName"
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          formName="causeOfDiagnosis"
          labelId="venus_claim.label.causeOfDiagnosis"
        />
        <FormItemDatePicker
          form={form}
          disabled={taskNotEditable}
          formName="dateOfOnset"
          labelId="venus_claim.label.dateOfOnset"
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
    ReporttoPolice: dictionaryController.ReporttoPolice,
    Drinking: dictionaryController.Drinking,
    MoveonSpot: dictionaryController.MoveonSpot,
    DrivingLicense: dictionaryController.DrivingLicense,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, documentId, applicationNo, validating } = props;
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, ['dateOfOnset']);
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
        diagnosisName: (value: string | object) => value,
        dateOfOnset: (value: any) => (value ? moment(value) : null),
        causeOfDiagnosis: (value: string | object) => value,
      });
    },
  })(Diagnosis)
);
