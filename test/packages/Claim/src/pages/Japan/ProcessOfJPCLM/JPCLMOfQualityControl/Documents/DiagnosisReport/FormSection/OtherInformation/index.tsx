import React, { Component } from 'react';
import lodash from 'lodash';
import moment from 'moment';
import { connect } from 'dva';
import type { FormComponentProps } from 'antd/es/form';
import type { Dispatch } from 'redux';
import { getDiagnosisInsurance } from 'claim/pages/Japan/ProcessOfJPCLM/JPCLMOfQualityControl/Utils/getDropDownList';
import FormSection, { FormItemSelect, FormItemDatePicker } from 'basic/components/Form/FormSection';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { VLD_000215 } from 'claim/pages/Japan/ProcessOfJPCLM/JPCLMOfQualityControl/ValidatorRules/Validators';
import { LayoutSection } from './Layout';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  documentId: any;
  DoctorSign: any;
  ApplyForInsurance: any;
  PastDoctor: any;
  MedicalHistory: any;
  taskNotEditable: boolean;
  LNCommentFlag: any;
}

class OtherInformation extends Component<IProps> {
  render() {
    const {
      form,
      DoctorSign,
      PastDoctor,
      MedicalHistory,
      taskNotEditable,
      LNCommentFlag,
      EligibleforLN,
      documentId,
      documentTypeCode,
      ApplyForInsurance,
    } = this.props;

    return (
      <FormSection
        form={form}
        formId={`OtherInformation_${documentId}`}
        layout={LayoutSection}
        title="venus_claim.label.otherInformation"
      >
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          dicts={PastDoctor}
          formName="previousMedicalRecords"
          labelId="venus_claim.label.previousMedicalRecords"
        />
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          formName="PMH"
          dicts={MedicalHistory}
          labelId="venus_claim.label.PMH"
        />
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          formName="livingNeedsCommentFlag"
          dicts={LNCommentFlag}
          labelId="venus_claim.label.livingNeedsCommentFlag"
        />
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          formName="MeetTheDemand"
          required={VLD_000215({ checkValue: documentTypeCode })}
          dicts={EligibleforLN}
          labelId="claim.otherInformation.MeetTheDemand"
        />
        <FormItemDatePicker
          form={form}
          disabled={taskNotEditable}
          formName="lifeRestIdentificationDate"
          labelId="claim.otherInformation.lifeRestIdentificationDate"
        />
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          dicts={ApplyForInsurance}
          formName="abilityToApplyForInsurance"
          labelId="venus_claim.label.abilityToApplyForInsurance"
        />
        <FormItemSelect
          form={form}
          dicts={DoctorSign}
          disabled={taskNotEditable}
          formName="doctorSignature"
          labelId="venus_claim.label.doctorSignature"
        />
      </FormSection>
    );
  }
}

export default connect(
  (
    { JPCLMOfQualityController, claimEditable, formCommonController, dictionaryController }: any,
    { documentId }: any
  ) => {
    const documentTypeCode = lodash.get(
      JPCLMOfQualityController,
      `claimProcessData.claimEntities.bpoFormDataList.${documentId}.formData.documentTypeCode`
    );
    const ApplyForInsurance = lodash.get(
      dictionaryController,
      getDiagnosisInsurance(documentTypeCode)
    );

    return {
      formData:
        JPCLMOfQualityController.claimProcessData.claimEntities.bpoFormDataList[documentId]
          .formData,
      DoctorSign: dictionaryController.DoctorSign,
      DisabilityLv: dictionaryController.DisabilityLv,
      PastDoctor: dictionaryController.PastDoctor,
      LNCommentFlag: dictionaryController.LNCommentFlag,
      MedicalHistory: dictionaryController.MedicalHistory,
      EligibleforLN: dictionaryController.EligibleforLN,
      taskNotEditable: claimEditable.taskNotEditable,
      validating: formCommonController.validating,
      documentTypeCode,
      ApplyForInsurance,
      dictionaryController,
    };
  }
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, documentId, applicationNo, validating } = props;
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, [
        'lifeRestIdentificationDate',
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
        lifeRestIdentificationDate: (value: any) => (value ? moment(value) : null),
      });
    },
  })(OtherInformation)
);
