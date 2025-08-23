import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { formUtils } from 'basic/components/Form';
import { Form } from 'antd';
import FormSection, { FormItemSelect } from 'basic/components/Form/FormSection';
import { VLD_000219 } from 'claim/pages/Japan/ProcessOfJPCLM/JPCLMOfQualityControl/ValidatorRules/Validators';
import { LayoutHeader } from './Layout';

interface IProps {
  dispatch: Dispatch<any>;
  PainkillerforCancer: any;
  CalcuTypeforPalliative: any;
  PalliativeCare: any;
  formData: any;
  documentId: string;
  taskNotEditable: boolean;
  form: any;
}

class MedicineHeader4 extends Component<IProps> {
  render() {
    const {
      form,
      taskNotEditable,
      documentId,
      PalliativeCare,
      CalcuTypeforPalliative,
    } = this.props;
    const cancerTreatmentHospitalized = form.getFieldValue('cancerTreatmentHospitalized');
    return (
      <FormSection
        form={form}
        formId={`MedicineHeader4_${documentId}`}
        isHideBgColor
        isPadding={false}
        layout={LayoutHeader}
      >
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          formName="cancerTreatmentHospitalized"
          dicts={PalliativeCare}
          labelId="claim.medicine.cancerTreatmentHospitalized"
        />
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          formName="calculationType"
          required={VLD_000219({ checkValue: cancerTreatmentHospitalized })}
          dicts={CalcuTypeforPalliative}
          labelId="claim.medicine.calculationType"
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
    PalliativeCare: dictionaryController.PalliativeCare,
    CalcuTypeforPalliative: dictionaryController.CalcuTypeforPalliative,
    formData:
      JPCLMOfQualityController.claimProcessData.claimEntities.bpoFormDataList[documentId].formData,
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
  })(MedicineHeader4)
);
