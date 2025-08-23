import React, { Component } from 'react';
import { Form } from 'antd';
import type { Dispatch } from 'redux';
import FormSection, { FormItemDatePicker, FormItemSelect } from 'basic/components/Form/FormSection';
import { formUtils } from 'basic/components/Form';
import moment from 'moment';
import { connect } from 'dva';
import Layout from './Layout';

interface IProps {
  form: any;
  dispatch: Dispatch<any>;
  formData: any;
  documentId: string;
  taskNotEditable: boolean;
  ThirdAdmissionYN: any;
}

class InPatientInfo extends Component<IProps> {
  render() {
    const { form, taskNotEditable, documentId, ThirdAdmissionYN } = this.props;

    return (
      <FormSection
        form={form}
        formId={`InPatientInfo_${documentId}`}
        isHideBgColor
        isMargin={false}
        isPadding={false}
        layout={Layout}
      >
        <FormItemDatePicker
          form={form}
          disabled={taskNotEditable}
          formName="diagnosisStartDate"
          labelId="venus_claim.label.diagnosisStartDate"
        />
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          formName="thirdAdmission"
          labelId="claim.inPatient.thirdAdmission"
          dicts={ThirdAdmissionYN}
        />
      </FormSection>
    );
  }
}

export default connect(
  (
    { dictionaryController, claimEditable, formCommonController, JPCLMOfQualityController }: any,
    { documentId }: any
  ) => ({
    ThirdAdmissionYN: dictionaryController.ThirdAdmissionYN,
    taskNotEditable: claimEditable.taskNotEditable,
    validating: formCommonController.validating,
    formData:
      JPCLMOfQualityController.claimProcessData.claimEntities.bpoFormDataList[documentId].formData,
  })
)(
  Form.create<IProps>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, documentId, applicationNo, validating } = props;
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, [
        'diagnosisStartDate',
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
        diagnosisStartDate: (value: any) => (value ? moment(value) : null),
      });
    },
  })(InPatientInfo)
);
