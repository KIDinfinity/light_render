import React, { Component } from 'react';
import { connect } from 'dva';
import FormSection, { FormItemDatePicker, FormItemInput } from 'basic/components/Form/FormSection';
import type { Dispatch } from 'redux';
import { formUtils } from 'basic/components/Form';
import moment from 'moment';
import { Form } from 'antd';
import { LayoutSection } from './Layout';

interface IProps {
  dispatch: Dispatch;
  documentId: any;
  form: any;
  formData: any;
  taskNotEditable: boolean;
  item: any;
  keyName: string;
}

class ProcedureListItem extends Component<IProps> {
  render() {
    const {
      form,
      formData: { id },
      taskNotEditable,
      documentId,
    } = this.props;

    return (
      <FormSection
        form={form}
        formId={`ProcedureListItem_${id}_${documentId}`}
        isHideBgColor
        isMargin={false}
        isPadding={false}
        layout={LayoutSection}
      >
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          formName="procedureName"
          maxLength={100}
          labelId="claim.procedure.surgeryName"
        />
        <FormItemDatePicker
          form={form}
          disabled={taskNotEditable}
          formName="operationDate"
          labelId="claim.procedure.surgeryDate"
          format="L"
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          formName="kjCode"
          labelId="claim.procedure.kjCode"
          maxLength={100}
        />
      </FormSection>
    );
  }
}

export default connect(({ claimEditable, formCommonController }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  validating: formCommonController.validating,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, documentId, applicationNo, keyName, formData, validating } = props;
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, ['operationDate']);
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfQualityController/saveFormDataEntry',
              target: 'JPCLMOfQualityController/saveFormDataItem',
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
            target: 'saveFormDataItem',
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
        operationDate: (value: any) => (value ? moment(value) : null),
      });
    },
  })(ProcedureListItem)
);
