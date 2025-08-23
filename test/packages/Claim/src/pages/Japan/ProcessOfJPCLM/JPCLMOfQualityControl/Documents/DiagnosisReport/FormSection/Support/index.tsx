import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import type { FormComponentProps } from 'antd/es/form';
import type { Dispatch } from 'redux';
import FormSection, { FormItemSelect, FormItemDatePicker } from 'basic/components/Form/FormSection';
import { Form } from 'antd';
import { LayoutSection } from './Layout';
import { formUtils } from 'basic/components/Form';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  formData: any;
  documentId: any;
  treatmentId: any;
  otherProcedureItem: any;
  SupportNeedLv: any;
  NursingFlag: any;
  taskNotEditable: boolean;
}

class Support extends Component<IProps> {
  render() {
    const { form, SupportNeedLv, NursingFlag, taskNotEditable, documentId } = this.props;

    return (
      <FormSection
        form={form}
        formId={`Support_${documentId}`}
        layout={LayoutSection}
        title="venus_claim.label.nursingSupportNeed"
      >
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          dicts={NursingFlag}
          formName="nursingFlag"
          labelId="venus_claim.label.nursingFlag"
        />
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          dicts={SupportNeedLv}
          formName="standardOfRequiringNursingIdentification"
          labelId="venus_claim.label.standardOfRequiringNursingIdentification"
        />
        <FormItemDatePicker
          form={form}
          disabled={taskNotEditable}
          formName="dateOfRequiringNursingIdentification"
          labelId="venus_claim.label.dateOfRequiringNursingIdentification"
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
    SupportNeedLv: dictionaryController.SupportNeedLv,
    NursingFlag: dictionaryController.NursingFlag,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, documentId, applicationNo, validating } = props;
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, [
        'dateOfRequiringNursingIdentification',
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
        nursingFlag: (value: any) => value,
        standardOfRequiringNursingIdentification: (value: any) => value,
        dateOfRequiringNursingIdentification: (value: any) => (value ? moment(value) : null),
      });
    },
  })(Support)
);
