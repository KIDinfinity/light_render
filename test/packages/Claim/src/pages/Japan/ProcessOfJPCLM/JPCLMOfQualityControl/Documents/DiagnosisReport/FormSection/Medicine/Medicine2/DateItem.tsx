import React, { Component } from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { formUtils } from 'basic/components/Form';
import moment from 'moment';
import { Form } from 'antd';

import FormSection, { FormItemDatePicker } from 'basic/components/Form/FormSection';
import { VLD_000217 } from 'claim/pages/Japan/ProcessOfJPCLM/JPCLMOfQualityControl/ValidatorRules/Validators';
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
      hormoneMedicine,
    } = this.props;
    return (
      <FormSection
        form={form}
        formId={`DateItem2_${id}_${documentId}`}
        isHideBgColor
        isMargin={false}
        isPadding={false}
        layout={LayoutSection}
      >
        <FormItemDatePicker
          form={form}
          disabled={taskNotEditable}
          required={VLD_000217({ checkValue: hormoneMedicine }) && index === 0}
          formName="dateOfHormoneMedicineTreatment"
          labelId={index === 0 ? 'claim.medicine.dateOfHormoneMedicineTreatment' : ''}
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
    hormoneMedicine: formUtils.queryValue(
      lodash.get(
        JPCLMOfQualityController,
        `claimProcessData.claimEntities.bpoFormDataList.${documentId}.formData.hormoneMedicine`,
        ''
      )
    ),
  })
)(
  Form.create<IProps>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, documentId, applicationNo, formData, keyName, validating } = props;
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, [
        'dateOfHormoneMedicineTreatment',
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
        dateOfHormoneMedicineTreatment: (value: any) => (value ? moment(value) : null),
      });
    },
  })(MedicineItem)
);
