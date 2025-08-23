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
          formId={`DiagnosisMixin_${documentId}`}
          layout={LayoutSection}
          isPadding={false}
          isMargin={false}
          isHideBgColor
        >
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            formName="complicationName"
            maxLength={100}
            labelId="venus_claim.label.complicationName"
          />
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            formName="complicationCode"
            maxLength={20}
            labelId="venus_claim.label.complicationCode"
          />
          <FormItemDatePicker
            form={form}
            disabled={taskNotEditable}
            formName="complicationDate"
            labelId="venus_claim.label.complicationDate"
          />
          <FormItemDatePicker
            form={form}
            disabled={taskNotEditable}
            formName="onsetDateOfComplication"
            labelId="venus_claim.label.onsetDateOfComplication"
          />
          <FormItemDatePicker
            form={form}
            disabled={taskNotEditable}
            formName="complicationStartDate"
            labelId="venus_claim.label.complicationStartDate"
          />
          <FormItemDatePicker
            form={form}
            disabled={taskNotEditable}
            formName="complicationsEndDate"
            labelId="venus_claim.label.complicationsEndDate"
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
        'complicationDate',
        'onsetDateOfComplication',
        'complicationStartDate',
        'complicationsEndDate',
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
        complicationName: (value: string | object) => value,
        complicationCode: (value: string | object) => value,
        complicationDate: (value: string | object) => (value ? moment(value) : null),
        onsetDateOfComplication: (value: string | object) => (value ? moment(value) : null),
        complicationStartDate: (value: string | object) => (value ? moment(value) : null),
        complicationsEndDate: (value: string | object) => (value ? moment(value) : null),
      });
    },
  })(DiagnosisMixin)
);
