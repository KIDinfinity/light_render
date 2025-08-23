import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import type { IDictionary } from '@/dtos/dicts';
import { formUtils } from 'basic/components/Form';
import moment from 'moment';
import { Form } from 'antd';
import FormSection, { FormItemDatePicker, FormItemSelect } from 'basic/components/Form/FormSection';
import { LayoutSection } from './Layout';

interface IProps {
  dispatch: Dispatch<any>;
  HospitalStatus: IDictionary[];
  formData: any;
  documentId: string;
  taskNotEditable: boolean;
  form: any;
}

class MaliganntOtherItem extends Component<IProps> {
  render() {
    const {
      form,
      taskNotEditable,
      documentId,
      OtherExam,
      formData: { id },
    } = this.props;
    return (
      <FormSection
        form={form}
        formId={`MaliganntHospitalizationItem_${id}_${documentId}`}
        isHideBgColor
        isMargin={false}
        isPadding={false}
        layout={LayoutSection}
      >
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          dicts={OtherExam}
          formName="otherExaminationOfHistopathologic"
          labelId="venus_claim.label.otherExaminationOfHistopathologic"
        />
        <FormItemDatePicker
          form={form}
          disabled={taskNotEditable}
          formName="otherExaminationDateOfHistopathologic"
          labelId="venus_claim.label.otherExaminationDateOfHistopathologic"
        />
      </FormSection>
    );
  }
}

export default connect(({ claimEditable, formCommonController, dictionaryController }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  validating: formCommonController.validating,
  OtherExam: dictionaryController.OtherExam,
}))(
  Form.create<IProps>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, documentId, applicationNo, formData, keyName, validating } = props;
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, [
        'otherExaminationDateOfHistopathologic',
      ]);
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
        otherExaminationDateOfHistopathologic: (value: any) => (value ? moment(value) : null),
      });
    },
  })(MaliganntOtherItem)
);
