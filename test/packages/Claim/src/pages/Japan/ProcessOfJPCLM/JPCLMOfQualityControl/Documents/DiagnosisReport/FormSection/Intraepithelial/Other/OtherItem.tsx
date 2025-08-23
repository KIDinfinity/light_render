import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import type { IDictionary } from '@/dtos/dicts';
import { formUtils } from 'basic/components/Form';
import moment from 'moment';
import { Form } from 'antd';
import FormSection, {
  FormItemDatePicker,
  FormItemSelect,
  FormItemInput,
} from 'basic/components/Form/FormSection';
import { LayoutSection } from './Layout';

interface IProps {
  dispatch: Dispatch<any>;
  HospitalStatus: IDictionary[];
  formData: any;
  documentId: string;
  taskNotEditable: boolean;
  form: any;
}

class IntraepithelialOtherItem extends Component<IProps> {
  render() {
    const {
      form,
      taskNotEditable,
      documentId,
      OtherExam,
      formData: { id },
    } = this.props;
    const otherExamsForIntraepithelialNeoplasm = form.getFieldValue(
      'otherExamsForIntraepithelialNeoplasm'
    );

    return (
      <FormSection
        form={form}
        formId={`IntraepithelialOtherItem_${id}_${documentId}`}
        isHideBgColor
        isMargin={false}
        isPadding={false}
        layout={LayoutSection}
      >
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          dicts={OtherExam}
          formName="otherExamsForIntraepithelialNeoplasm"
          labelId="claim.intraepithelial.otherExamsForIntraepithelialNeoplasm"
        />
        <FormItemDatePicker
          form={form}
          disabled={taskNotEditable}
          formName="diagnosisDate"
          labelId="claim.intraepithelial.diagnosisDateFromOtherExams"
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          formName="diagnosisResult"
          maxLength={100}
          labelId="claim.intraepithelial.examResultOfOtherExams"
        />
        {otherExamsForIntraepithelialNeoplasm === '005' && (
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            formName="otherDiagnosisName"
            maxLength={100}
            labelId="claim.intraepithelial.otherDiagnosisName"
          />
        )}
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
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, ['diagnosisDate']);
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
        diagnosisDate: (value: any) => (value ? moment(value) : null),
      });
    },
  })(IntraepithelialOtherItem)
);
