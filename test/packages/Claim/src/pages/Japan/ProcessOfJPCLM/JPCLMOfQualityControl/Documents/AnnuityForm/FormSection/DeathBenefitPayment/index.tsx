import React, { Component } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { formUtils } from 'basic/components/Form';
import FormSection, {
  FormLayout,
  FormItemSelect,
  FormItemNumber,
} from 'basic/components/Form/FormSection';
import { VLD_000220 } from 'claim/pages/Japan/ProcessOfJPCLM/JPCLMOfQualityControl/ValidatorRules/Validators';
import Layout, { jsonLayout } from './Layout';

interface IProps {
  dispatch: Dispatch;
  form?: any;
  formData: any;
  documentId: string;
  applicationNo: string;
  taskNotEditable: boolean;
}

class DeathBenefitPayment extends Component<IProps> {
  render() {
    const {
      form,
      taskNotEditable,
      documentId,
      DistributionMethod,
      AnnuityPeriod,
      formData: { documentTypeCode },
    } = this.props;
    const distributionMethod = form.getFieldValue('distributionMethod');

    return (
      <FormSection
        form={form}
        formId={`DeathBenefitPayment_${documentId}`}
        layout={Layout}
        title="claim.title.deathBenefitPayment"
      >
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          required={VLD_000220({ checkValue: documentTypeCode })}
          formName="distributionMethod"
          dicts={DistributionMethod}
          labelId="claim.deathBenefitPayment.distributionMethod"
        />
        {distributionMethod === '01' && (
          <FormItemSelect
            form={form}
            required
            disabled={taskNotEditable}
            formName="fullBenefitAnnuityPeriod"
            dicts={AnnuityPeriod}
            labelId="claim.deathBenefitPayment.fullBenefitAnnuityPeriod"
          />
        )}
        {distributionMethod === '02' && (
          <FormLayout name="Form02" json={jsonLayout}>
            <FormItemNumber
              form={form}
              required
              disabled={taskNotEditable}
              formName="sumForAnnuity"
              precision={0}
              labelId="claim.deathBenefitPayment.sumForAnnuity"
            />
            <FormItemSelect
              form={form}
              disabled={taskNotEditable}
              required
              formName="remainingBenefitAnnuityPeriod"
              dicts={AnnuityPeriod}
              labelId="claim.deathBenefitPayment.remainingBenefitAnnuityPeriod"
            />
          </FormLayout>
        )}
        {distributionMethod === '03' && (
          <FormItemSelect
            form={form}
            required
            disabled={taskNotEditable}
            formName="periodForTheAnnuityPortion"
            dicts={AnnuityPeriod}
            labelId="claim.deathBenefitPayment.periodForTheAnnuityPortion"
          />
        )}
      </FormSection>
    );
  }
}

export default connect(
  (
    { JPCLMOfQualityController, dictionaryController, claimEditable, formCommonController }: any,
    { documentId }: any
  ) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    validating: formCommonController.validating,
    DistributionMethod: dictionaryController.DistributionMethod,
    AnnuityPeriod: dictionaryController.AnnuityPeriod,
    formData:
      JPCLMOfQualityController.claimProcessData.claimEntities.bpoFormDataList[documentId].formData,
  })
)(
  Form.create({
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
  })(DeathBenefitPayment)
);
