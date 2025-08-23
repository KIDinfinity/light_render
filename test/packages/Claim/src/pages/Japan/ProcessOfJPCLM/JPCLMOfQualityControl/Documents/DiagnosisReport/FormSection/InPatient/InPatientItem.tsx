import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import type { IDictionary } from '@/dtos/dicts';
import { formUtils } from 'basic/components/Form';
import moment from 'moment';
import { Form } from 'antd';
import FormSection, { FormItemDatePicker, FormItemSelect } from 'basic/components/Form/FormSection';
import {
  VLD_000018_Start,
  VLD_000018_End,
} from 'claim/pages/Japan/ProcessOfJPCLM/JPCLMOfQualityControl/ValidatorRules/Validators';
import { LayoutSection } from './Layout';

interface IProps {
  dispatch: Dispatch<any>;
  HospitalStatus: IDictionary[];
  formData: any;
  documentId: string;
  taskNotEditable: boolean;
  form: any;
}

class InPatientItem extends Component<IProps> {
  render() {
    const {
      form,
      taskNotEditable,
      documentId,
      HospitalStatus,
      formData: { id },
    } = this.props;
    const dateOfAdmission = form.getFieldValue('dateOfAdmission');
    const dateOfDischarge = form.getFieldValue('dateOfDischarge');

    return (
      <FormSection
        form={form}
        formId={`InPatientItem_${id}_${documentId}`}
        isHideBgColor
        isMargin={false}
        isPadding={false}
        layout={LayoutSection}
      >
        <FormItemDatePicker
          form={form}
          disabled={taskNotEditable}
          formName="dateOfAdmission"
          labelId="claim.inPatient.dateOfAdmission"
          rules={[
            {
              validator: VLD_000018_Start({ checkValue: dateOfDischarge }),
            },
          ]}
        />
        <FormItemDatePicker
          form={form}
          disabled={taskNotEditable}
          formName="dateOfDischarge"
          labelId="claim.inPatient.dateOfDischarge"
          rules={[
            {
              validator: VLD_000018_End({ checkValue: dateOfAdmission }),
            },
          ]}
        />
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          dicts={HospitalStatus}
          formName="treatmentStatus"
          labelId="venus_claim.label.firstTreatmentStatus"
        />
      </FormSection>
    );
  }
}

export default connect(({ claimEditable, formCommonController, dictionaryController }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  validating: formCommonController.validating,
  HospitalStatus: dictionaryController.HospitalStatus,
}))(
  Form.create<IProps>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, documentId, applicationNo, formData, keyName, validating } = props;
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, [
        'dateOfAdmission',
        'dateOfDischarge',
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
        dateOfAdmission: (value: any) => (value ? moment(value) : null),
        dateOfDischarge: (value: any) => (value ? moment(value) : null),
        treatmentStatus: (value: any) => value,
      });
    },
  })(InPatientItem)
);
