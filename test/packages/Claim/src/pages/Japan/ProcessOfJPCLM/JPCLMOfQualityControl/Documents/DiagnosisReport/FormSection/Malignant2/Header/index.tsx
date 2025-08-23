import React, { Component } from 'react';
import { connect } from 'dva';
import {
  VLD_000087,
  VLD_000173,
} from 'claim/pages/Japan/ProcessOfJPCLM/JPCLMOfQualityControl/ValidatorRules/Validators';
import type { FormComponentProps } from 'antd/es/form';
import type { Dispatch } from 'redux';
import moment from 'moment';
import FormSection, {
  FormItemSelect,
  FormItemDatePicker,
  FormItemInput,
} from 'basic/components/Form/FormSection';
import { Form } from 'antd';
import { LayoutSection } from './Layout';
import { formUtils } from 'basic/components/Form';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  formData: any;
  form: any;
  documentId: any;
  treatmentId: any;
  HistoExam: any;
  MNType: any;
  DepthColorectalCancer: any;
  NotifInsured: any;
  CancerFlagII: any;
  taskNotEditable: boolean;
}

class Malignant2 extends Component<IProps> {
  handleDelete = () => {
    const { dispatch, treatmentId, documentId } = this.props;
    dispatch({
      type: 'JPCLMOfQualityController/removeOtherProcedureItem',
      payload: {
        treatmentId,
        documentId,
      },
    });
  };

  render() {
    const {
      form,
      HistoExam,
      MNType,
      DepthColorectalCancer,
      NotifInsured,
      CancerFlagII,
      taskNotEditable,
      documentId,
    } = this.props;

    const histopathologicExamination = form.getFieldValue('histopathologicExamination');
    const notificationOfSelfHistopathologic = form.getFieldValue(
      'notificationOfSelfHistopathologic'
    );
    return (
      <FormSection
        form={form}
        formId={`Malignant2_${documentId}`}
        layout={LayoutSection}
        isPadding={false}
        isHideBgColor
      >
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          formName="cancerFlag2nd"
          dicts={CancerFlagII}
          labelId="venus_claim.label.cancerFlag2nd"
        />
        <FormItemSelect
          form={form}
          dicts={HistoExam}
          disabled={taskNotEditable}
          formName="histopathologicExamination"
          labelId="venus_claim.label.histopathologicExamination"
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          required={VLD_000087({ checkValue: histopathologicExamination })}
          formName="histopathologicDiagnosisName"
          maxLength={100}
          labelId="venus_claim.label.histopathologicDiagnosisName"
        />
        <FormItemDatePicker
          form={form}
          required={VLD_000087({ checkValue: histopathologicExamination })}
          disabled={taskNotEditable}
          formName="histopathologicDiagnosisDate"
          labelId="venus_claim.label.histopathologyDiagnosisDate"
        />
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          dicts={MNType}
          formName="malignantNeoplasmTypeOfHistopathologic"
          labelId="venus_claim.label.malignantNeoplasmTypeOfHistopathologic"
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          formName="TNNTypeTOfHistopathologic"
          labelId="venus_claim.label.TNNTypeTOfHistopathologic"
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          formName="TNNTypeNOfHistopathologic"
          labelId="venus_claim.label.TNNTypeNOfHistopathologic"
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          formName="TNNTypeMOfHistopathologic"
          labelId="venus_claim.label.TNNTypeMOfHistopathologic"
        />
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          dicts={DepthColorectalCancer}
          formName="depthOfHistopathologicColorectalCancer"
          labelId="venus_claim.label.depthOfHistopathologicColorectalCancer"
        />

        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          dicts={NotifInsured}
          formName="notificationOfSelfHistopathologic"
          labelId="venus_claim.label.notificationOfSelfHistopathologic"
        />
        <FormItemDatePicker
          form={form}
          disabled={taskNotEditable}
          required={VLD_000173({ checkValue: notificationOfSelfHistopathologic })}
          formName="notificationDateOfSelfHistopathologic"
          labelId="venus_claim.label.notificationDateOfSelfHistopathologic"
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          required={VLD_000173({ checkValue: notificationOfSelfHistopathologic })}
          formName="notificationNameOfSelfHistopathologic"
          maxLength={100}
          labelId="venus_claim.label.notificationNameOfSelfHistopathologic"
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
    HistoExam: dictionaryController.HistoExam,
    OtherExam: dictionaryController.OtherExam,
    MNType: dictionaryController.MNType,
    NotifInsured: dictionaryController.NotifInsured,
    DepthColorectalCancer: dictionaryController.DepthColorectalCancer,
    CancerFlagII: dictionaryController.CancerFlagII,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, documentId, applicationNo, validating } = props;
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, [
        'histopathologicDiagnosisDate',
        'notificationDateOfSelfHistopathologic',
        'notificationDateOfFamilyHistopathologic',
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
        histopathologicExamination: (value: any) => value,
        histopathologicDiagnosisName: (value: any) => value,
        histopathologicDiagnosisDate: (value: any) => (value ? moment(value) : null),
        malignantNeoplasmTypeOfHistopathologic: (value: any) => value,
        TNNTypeTOfHistopathologic: (value: any) => value,
        TNNTypeNOfHistopathologic: (value: any) => value,
        TNNTypeMOfHistopathologic: (value: any) => value,
        depthOfHistopathologicColorectalCancer: (value: any) => value,
        notificationOfSelfHistopathologic: (value: any) => value,
        notificationDateOfSelfHistopathologic: (value: any) => (value ? moment(value) : null),
        notificationNameOfSelfHistopathologic: (value: any) => value,
        notificationInsiderOfFamilyHistopathologic: (value: any) => value,
        notificationDateOfFamilyHistopathologic: (value: any) => (value ? moment(value) : null),
        notificationNameOfFamilyHistopathologic: (value: any) => value,
      });
    },
  })(Malignant2)
);
