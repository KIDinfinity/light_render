import React, { Component } from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { formUtils } from 'basic/components/Form';
import moment from 'moment';
import { Form } from 'antd';
import FormSection, { FormItemDatePicker } from 'basic/components/Form/FormSection';
import {
  VLD_000219,
  VLD_000018_Start,
  VLD_000018_End,
} from 'claim/pages/Japan/ProcessOfJPCLM/JPCLMOfQualityControl/ValidatorRules/Validators';
import { LayoutMedicine } from './Layout';

interface IProps {
  dispatch: Dispatch<any>;
  formData: any;
  documentId: string;
  taskNotEditable: boolean;
  form: any;
}

class MedicineItem extends Component<IProps> {
  render() {
    const {
      form,
      taskNotEditable,
      documentId,
      cancerTreatmentHospitalized,
      formData: { id },
    } = this.props;
    const startDateOfCancerHospitalization = form.getFieldValue('startDateOfCancerHospitalization');
    const endDateOfCancerHospitalization = form.getFieldValue('endDateOfCancerHospitalization');

    return (
      <FormSection
        form={form}
        formId={`MedicineItem_${id}_${documentId}`}
        isHideBgColor
        isMargin={false}
        isPadding={false}
        layout={LayoutMedicine}
      >
        <FormItemDatePicker
          form={form}
          required={VLD_000219({ checkValue: cancerTreatmentHospitalized })}
          disabled={taskNotEditable}
          formName="startDateOfCancerHospitalization"
          labelId="claim.medicine.startDateOfPalliativeCare"
          rules={[
            {
              validator: VLD_000018_Start({ checkValue: endDateOfCancerHospitalization }),
            },
          ]}
        />
        <FormItemDatePicker
          form={form}
          required={VLD_000219({ checkValue: cancerTreatmentHospitalized })}
          disabled={taskNotEditable}
          formName="endDateOfCancerHospitalization"
          labelId="claim.medicine.endDateOfPalliativeCare"
          rules={[
            {
              validator: VLD_000018_End({ checkValue: startDateOfCancerHospitalization }),
            },
          ]}
        />
      </FormSection>
    );
  }
}

export default connect(
  ({ claimEditable, formCommonController, JPCLMOfQualityController }: any, { documentId }) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    validating: formCommonController.validating,
    cancerTreatmentHospitalized: formUtils.queryValue(
      lodash.get(
        JPCLMOfQualityController,
        `claimProcessData.claimEntities.bpoFormDataList.${documentId}.formData.cancerTreatmentHospitalized`,
        ''
      )
    ),
  })
)(
  Form.create<IProps>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, documentId, applicationNo, formData, keyName, validating } = props;
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, [
        'startDateOfCancerHospitalization',
        'endDateOfCancerHospitalization',
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
        endDateOfCancerHospitalization: (value: any) => (value ? moment(value) : null),
        startDateOfCancerHospitalization: (value: any) => (value ? moment(value) : null),
      });
    },
  })(MedicineItem)
);
