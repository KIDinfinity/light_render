import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { formUtils } from 'basic/components/Form';
import moment from 'moment';
import { Form } from 'antd';
import FormSection, { FormItemDatePicker } from 'basic/components/Form/FormSection';
import { LayoutSection } from './Layout';

interface IProps {
  dispatch: Dispatch<any>;
  formData: any;
  documentId: string;
  taskNotEditable: boolean;
  form: any;
}

class TreatmentItem extends Component<IProps> {
  render() {
    const {
      form,
      formData: { id },
      taskNotEditable,
      documentId,
      index,
    } = this.props;
    return (
      <FormSection
        form={form}
        formId={`TreatmentItem_${id}_${documentId}`}
        isHideBgColor
        isMargin={false}
        isPadding={false}
        layout={LayoutSection}
      >
        <FormItemDatePicker
          form={form}
          required={index === 0}
          disabled={taskNotEditable}
          formName="dateOfTreatment"
          labelId={index === 0 ? 'claim.treatment.dateOfTreatment' : ''}
          format="L"
        />
      </FormSection>
    );
  }
}

export default connect(({ claimEditable, formCommonController }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  validating: formCommonController.validating,
}))(
  Form.create<IProps>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, documentId, applicationNo, formData, keyName, validating } = props;
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, ['dateOfTreatment']);
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfQualityController/saveFormDataEntry',
              target: 'JPCLMOfQualityController/saveFormDataItemAuto',
              payload: {
                changedFields: finalChangedFields,
                documentId,
                applicationNo,
                id: formData.id,
                keyName,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfQualityController/saveFormDataLatest',
            target: 'saveFormDataItemAuto',
            payload: {
              changedFields: finalChangedFields,
              documentId,
              applicationNo,
              id: formData.id,
              keyName,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { formData } = props;
      return formUtils.mapObjectToFields(formData, {
        dateOfTreatment: (value: any) => (value ? moment(value) : null),
      });
    },
  })(TreatmentItem)
);
