import React, { Component } from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { formUtils } from 'basic/components/Form';
import moment from 'moment';

import { Form } from 'antd';
import FormSection, { FormItemDatePicker } from 'basic/components/Form/FormSection';
import { VLD_000216 } from 'claim/pages/Japan/ProcessOfJPCLM/JPCLMOfQualityControl/ValidatorRules/Validators';
import { LayoutSection } from './Layout';

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
      formData: { id },
      taskNotEditable,
      documentId,
      index,
      cancerMedicine,
    } = this.props;
    return (
      <FormSection
        form={form}
        formId={`DateItem1_${id}_${documentId}`}
        isHideBgColor
        isMargin={false}
        isPadding={false}
        layout={LayoutSection}
      >
        <FormItemDatePicker
          form={form}
          required={VLD_000216({ checkValue: cancerMedicine }) && index === 0}
          disabled={taskNotEditable}
          formName="dateOfCancerMedicineTreatment"
          labelId={index === 0 ? 'claim.medicine.dateOfCancerMedicineTreatment' : ''}
        />
      </FormSection>
    );
  }
}

export default connect(
  (
    { claimEditable, formCommonController, JPCLMOfQualityController }: any,
    { documentId }: any
  ) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    validating: formCommonController.validating,
    cancerMedicine: formUtils.queryValue(
      lodash.get(
        JPCLMOfQualityController,
        `claimProcessData.claimEntities.bpoFormDataList.${documentId}.formData.cancerMedicine`,
        ''
      )
    ),
  })
)(
  Form.create<IProps>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, documentId, applicationNo, formData, keyName, validating } = props;
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, [
        'dateOfCancerMedicineTreatment',
      ]);
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
        dateOfCancerMedicineTreatment: (value: any) => (value ? moment(value) : null),
      });
    },
  })(MedicineItem)
);
