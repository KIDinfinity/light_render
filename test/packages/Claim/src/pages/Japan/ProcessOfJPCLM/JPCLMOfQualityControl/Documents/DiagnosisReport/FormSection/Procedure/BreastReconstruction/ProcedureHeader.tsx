import React, { Component } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import FormSection, { FormItemSelect } from 'basic/components/Form/FormSection';
import { LayoutSection } from './Layout';

interface IProps {
  taskNotEditable: boolean;
  BreastReconstruction: any;
  form: any;
}

class ProcedureHeader extends Component<IProps> {
  render() {
    const { form, taskNotEditable, BreastReconstruction, documentId } = this.props;
    return (
      <FormSection
        form={form}
        formId={`ProcedureHeader3_${documentId}`}
        isHideBgColor
        isPadding={false}
        layout={LayoutSection}
      >
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          formName="breastReconstruction"
          dicts={BreastReconstruction}
          labelId="claim.procedure.breastReconstruction"
        />
      </FormSection>
    );
  }
}

export default connect(
  (
    { claimEditable, formCommonController, dictionaryController, JPCLMOfQualityController }: any,
    { documentId }: any
  ) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    validating: formCommonController.validating,
    formData:
      JPCLMOfQualityController.claimProcessData.claimEntities.bpoFormDataList[documentId].formData,
    BreastReconstruction: dictionaryController.BreastReconstruction,
  })
)(
  Form.create<IProps>({
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
  })(ProcedureHeader)
);
