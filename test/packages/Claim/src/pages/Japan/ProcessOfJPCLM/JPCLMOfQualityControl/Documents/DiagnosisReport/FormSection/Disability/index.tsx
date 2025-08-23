import React, { Component } from 'react';
import { connect } from 'dva';
import type { FormComponentProps } from 'antd/es/form';
import type { Dispatch } from 'redux';
import FormSection, { FormItemSelect, FormItemDatePicker } from 'basic/components/Form/FormSection';
import moment from 'moment';
import { Form } from 'antd';
import { LayoutSection } from './Layout';
import { formUtils } from 'basic/components/Form';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  claimant: any;
  documentId: any;
  treatmentId: any;
  formData: any;
  DisabilityLv: any;
  DisabilityFlag: any;
  taskNotEditable: boolean;
}

class Disability extends Component<IProps> {
  render() {
    const { form, DisabilityLv, DisabilityFlag, taskNotEditable, documentId } = this.props;

    return (
      <FormSection
        form={form}
        formId={`Disability_${documentId}`}
        layout={LayoutSection}
        title="venus_claim.label.disability"
      >
        <FormItemSelect
          form={form}
          dicts={DisabilityFlag}
          disabled={taskNotEditable}
          formName="disabilityFlag"
          labelId="venus_claim.label.disabilityFlag"
        />
        <FormItemSelect
          form={form}
          dicts={DisabilityLv}
          disabled={taskNotEditable}
          formName="disabilityDegree"
          labelId="venus_claim.label.disabilityDegree"
        />
        <FormItemDatePicker
          form={form}
          disabled={taskNotEditable}
          formName="disabilityDegreeDate"
          labelId="venus_claim.label.disabilityDegreeDate"
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
    DisabilityLv: dictionaryController.DisabilityLv,
    DisabilityFlag: dictionaryController.DisabilityFlag,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, documentId, applicationNo, validating } = props;
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, [
        'disabilityDegreeDate',
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
        disabilityFlag: (value: any) => value,
        disabilityDegree: (value: any) => value,
        disabilityDegreeDate: (value: any) => (value ? moment(value) : null),
      });
    },
  })(Disability)
);
