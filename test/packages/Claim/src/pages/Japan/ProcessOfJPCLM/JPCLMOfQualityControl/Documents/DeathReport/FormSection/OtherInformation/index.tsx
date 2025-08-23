import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Form } from 'antd';
import FormSection, { FormItemSelect, FormItemDatePicker } from 'basic/components/Form/FormSection';
import type { Dispatch } from 'redux';
import Layout from './Layout';
import { formUtils } from 'basic/components/Form';

interface IProps {
  form: any;
  dispatch: Dispatch;
  documentId: any;
  DoctorSign: any;
  PastDoctor: any;
  MedicalHistory: any;
  taskNotEditable: boolean;
  LNCommentFlag: any;
}

class OtherInformation extends Component<IProps> {
  render() {
    const {
      form,
      DoctorSign,
      PastDoctor,
      taskNotEditable,
      documentId,
      DeathRelatedPMH,
    } = this.props;

    return (
      <FormSection
        form={form}
        formId={`OtherInformation_${documentId}`}
        layout={Layout}
        title="venus_claim.label.otherInformation"
      >
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          dicts={DeathRelatedPMH}
          required
          formName="PMHRelatedToDeath"
          labelId="claim.otherInformation.PMHRelatedToDeath"
        />
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          dicts={PastDoctor}
          formName="previousMedicalRecord"
          labelId="venus_claim.label.previousMedicalRecords"
        />
        <FormItemDatePicker
          form={form}
          disabled={taskNotEditable}
          formName="deathDiagnosisDate"
          labelId="claim.otherInformation.deathDiagnosisDate"
          format="L"
        />
        <FormItemSelect
          form={form}
          dicts={DoctorSign}
          disabled={taskNotEditable}
          formName="doctorSignature"
          labelId="venus_claim.label.doctorSignature"
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
    DoctorSign: dictionaryController.DoctorSign,
    PastDoctor: dictionaryController.PastDoctor,
    DeathRelatedPMH: dictionaryController.DeathRelatedPMH,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, documentId, applicationNo, validating } = props;
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, [
        'deathDiagnosisDate',
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
        deathDiagnosisDate: (value: any) => (value ? moment(value) : null),
      });
    },
  })(OtherInformation)
);
