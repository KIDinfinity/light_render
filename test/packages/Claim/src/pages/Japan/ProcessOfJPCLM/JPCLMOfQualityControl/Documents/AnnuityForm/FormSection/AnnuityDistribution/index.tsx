import React, { Component } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { formUtils } from 'basic/components/Form';
import FormSection, { FormItemSelect, FormItemNumber } from 'basic/components/Form/FormSection';
import {
  VLD_000221,
  VLD_000222,
  VLD_000241,
} from 'claim/pages/Japan/ProcessOfJPCLM/JPCLMOfQualityControl/ValidatorRules/Validators';
import Layout from './Layout';

interface IProps {
  dispatch: Dispatch;
  form?: any;
  formData: any;
  documentId: string;
  applicationNo: string;
  taskNotEditable: boolean;
  PreferredDistMethod: any;
  AnnuityPeriod: any;
}

class AnnuityDistribution extends Component<IProps> {
  render() {
    const {
      form,
      taskNotEditable,
      documentId,
      PreferredDistMethod,
      AnnuityPeriod,
      formData: { documentTypeCode },
    } = this.props;
    const preferredDistributionMethod = form.getFieldValue('preferredDistributionMethod');

    return (
      <FormSection
        form={form}
        formId={`annuityDistribution_${documentId}`}
        layout={Layout}
        title="claim.title.annuityDistribution"
      >
        <FormItemSelect
          form={form}
          disabled={taskNotEditable}
          required={VLD_000221({ checkValue: documentTypeCode })}
          formName="preferredDistributionMethod"
          dicts={PreferredDistMethod}
          labelId="claim.annuityDistribution.preferredDistributionMethod"
        />
        <FormItemSelect
          form={form}
          required={VLD_000222({ checkValue: preferredDistributionMethod })}
          disabled={taskNotEditable}
          formName="deferralPeriod"
          dicts={AnnuityPeriod}
          labelId="claim.deathBenefitPayment.deferralPeriod"
        />
        <FormItemNumber
          form={form}
          required={VLD_000241({ checkValue: preferredDistributionMethod })}
          disabled={taskNotEditable}
          precision={0}
          formName="postDeferralMonthlyAnnuity"
          labelId="claim.annuityDistribution.postDeferralMonthlyAnnuity"
        />
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
    PreferredDistMethod: dictionaryController.PreferredDistMethod,
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
  })(AnnuityDistribution)
);
