import React, { Component } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import type { FormComponentProps } from 'antd/es/form';
import type { Dispatch } from 'redux';
import moment from 'moment';
import FormSection, {
  FormItemSelect,
  FormItemInput,
  FormItemDatePicker,
} from 'basic/components/Form/FormSection';
import { Form } from 'antd';
import { LayoutSection } from './Layout';
import { formUtils } from 'basic/components/Form';

interface IProps extends FormComponentProps {
  registeForm: Function;
  unRegisterForm: Function;
  dispatch: Dispatch<any>;
  formData: any;
  form: any;
  documentId: any;
  treatmentId: any;
  CancerFlagI: any;
}

class Malignant1 extends Component<IProps> {
  static contextTypes = {
    taskNotEditable: PropTypes.bool,
  };

  render() {
    const { form, CancerFlagI, documentId, taskNotEditable } = this.props;
    return (
      <FormSection
        form={form}
        formId={`malignant_${documentId}`}
        layout={LayoutSection}
        title="venus_claim.label.malignantNeoplasm1"
      >
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          formName="cancerFlagI"
          dicts={CancerFlagI}
          labelId="venus_claim.label.cancerFlagI"
        />
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          formName="PMHDiseaseTypes"
          dicts={CancerFlagI}
          labelId="claim.malignant.PMHDiseaseTypes"
        />
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          formName="histopathologicDiagnosis"
          dicts={CancerFlagI}
          labelId="claim.malignant.histopathologicDiagnosis"
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          formName="histopathologicName"
          maxLength={100}
          labelId="claim.malignant.histopathologicName"
        />
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          formName="intraepithelialCarcinoma"
          dicts={CancerFlagI}
          labelId="claim.malignant.intraepithelialCarcinoma"
        />
        <FormItemDatePicker
          form={form}
          disabled={taskNotEditable}
          formName="histopathologicDate"
          labelId="claim.malignant.histopathologicDate"
        />
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          formName="histopathologicMethod"
          dicts={CancerFlagI}
          labelId="claim.malignant.histopathologicMethod"
        />
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          formName="notificationOfHistopathologic"
          dicts={CancerFlagI}
          labelId="claim.malignant.notificationOfHistopathologic"
        />
        <FormItemDatePicker
          form={form}
          disabled={taskNotEditable}
          formName="notificationDateOfHistopathologic"
          labelId="claim.malignant.notificationDateOfHistopathologic"
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
    CancerFlagI: dictionaryController.CancerFlagI,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, documentId, applicationNo, validating } = props;
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, [
        'histopathologicDate',
        'notificationDateOfHistopathologic',
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
        histopathologicDate: (value: any) => (value ? moment(value) : null),
        notificationDateOfHistopathologic: (value: any) => (value ? moment(value) : null),
      });
    },
  })(Malignant1)
);
