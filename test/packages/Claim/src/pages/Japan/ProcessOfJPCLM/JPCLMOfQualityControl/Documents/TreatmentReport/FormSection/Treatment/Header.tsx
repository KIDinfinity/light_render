import React, { Component } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { formUtils } from 'basic/components/Form';

import FormSection, { FormItemInput, FormItemSelect } from 'basic/components/Form/FormSection';
import { LayoutHeader } from './Layout';

interface IProps {
  dispatch: Dispatch;
  form?: any;
  formData: any;
  documentId: string;
  applicationNo: string;
  taskNotEditable: boolean;
  MedicalInst: any;
}

class Treatment extends Component<IProps> {
  render() {
    const { form, taskNotEditable, MedicalInst, documentId } = this.props;
    return (
      <FormSection
        form={form}
        formId={`Treatment_${documentId}`}
        layout={LayoutHeader}
        isHideBgColor
        isMargin={false}
        isPadding={false}
      >
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          required
          formName="diagnosisName"
          maxLength={100}
          labelId="claim.treatment.diagnosisName"
        />
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          formName="hospitalisationProvider"
          labelId="claim.treatment.hospitalisationProvider"
          dicts={MedicalInst}
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
    MedicalInst: dictionaryController.MedicalInst,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, documentId, applicationNo, validating } = props;
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, ['dateOfTreatment']);
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
      return formUtils.mapObjectToFields(formData);
    },
  })(Treatment)
);
