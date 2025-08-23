import React, { Component } from 'react';
import { connect } from 'dva';
import type { FormComponentProps } from 'antd/es/form';
import type { Dispatch } from 'redux';
import FormSection, { FormItemSelect } from 'basic/components/Form/FormSection';
import { Form } from 'antd';
import { LayoutSection } from './Layout';
import { formUtils } from 'basic/components/Form';

interface IProps extends FormComponentProps {
  registeForm: Function;
  unRegisterForm: Function;
  dispatch: Dispatch<any>;
  formData: any;
  documentId: any;
  treatmentId: any;
  otherProcedureItem: any;
  SequelaeOfStroke: any;
  StrokeFlag: any;
  taskNotEditable: boolean;
}

class Stroke extends Component<IProps> {
  render() {
    const { form, SequelaeOfStroke, StrokeFlag, taskNotEditable, documentId } = this.props;

    return (
      <FormSection
        form={form}
        formId={`Stroke_${documentId}`}
        layout={LayoutSection}
        title="venus_claim.label.stroke"
      >
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          formName="strokeFlag"
          dicts={StrokeFlag}
          labelId="venus_claim.label.strokeFlag"
        />
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          formName="sequelaeOfStroke"
          dicts={SequelaeOfStroke}
          labelId="venus_claim.label.sequelaeOfStroke"
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
    SequelaeOfStroke: dictionaryController.SequelaeOfStroke,
    StrokeFlag: dictionaryController.StrokeFlag,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, documentId, applicationNo, validating } = props;
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, []);
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
  })(Stroke)
);
