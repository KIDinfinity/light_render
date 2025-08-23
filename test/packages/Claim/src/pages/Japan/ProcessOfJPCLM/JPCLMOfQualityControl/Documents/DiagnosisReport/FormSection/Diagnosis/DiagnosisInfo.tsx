import React, { Component } from 'react';
import type { FormComponentProps } from 'antd/es/form';
import type { Dispatch } from 'redux';
import { connect } from 'dva';
import moment from 'moment';
import { Form } from 'antd';
import FormSection, {
  FormItemInput,
  FormItemDatePicker,
  FormCard,
} from 'basic/components/Form/FormSection';
import { formUtils } from 'basic/components/Form';
import { LayoutSection } from './Layout';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  documentId: any;
  formData: any;
  taskNotEditable: boolean;
}

class DiagnosisMixin extends Component<IProps> {
  render() {
    const { form, taskNotEditable, documentId } = this.props;

    return (
      <FormCard>
        <FormSection
          form={form}
          formId={`DiagnosisInfo_${documentId}`}
          layout={LayoutSection}
          isPadding={false}
          isMargin={false}
          isHideBgColor
        >
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            required
            formName="injuryName"
            maxLength={100}
            labelId="venus_claim.label.injuryName"
          />
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            formName="injuryCode"
            maxLength={20}
            labelId="venus_claim.label.injuryCode"
          />
          <FormItemDatePicker
            form={form}
            disabled={taskNotEditable}
            formName="diagnosisDate"
            labelId="venus_claim.label.diagnosisDate"
          />
          <FormItemDatePicker
            form={form}
            disabled={taskNotEditable}
            formName="onsetDateOfInjury"
            labelId="venus_claim.label.onsetDateOfInjury"
          />
        </FormSection>
      </FormCard>
    );
  }
}

export default connect(
  (
    { JPCLMOfQualityController, claimEditable, formCommonController }: any,
    { documentId }: any
  ) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    validating: formCommonController.validating,
    formData:
      JPCLMOfQualityController.claimProcessData.claimEntities.bpoFormDataList[documentId].formData,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, documentId, applicationNo, validating } = props;
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, [
        'diagnosisDate',
        'onsetDateOfInjury',
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
        // info
        injuryName: (value: string | object) => value,
        injuryCode: (value: string | object) => value,
        diagnosisDate: (value: string | object) => (value ? moment(value) : null),
        onsetDateOfInjury: (value: string | object) => (value ? moment(value) : null),
      });
    },
  })(DiagnosisMixin)
);
