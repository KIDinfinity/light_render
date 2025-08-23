import React, { Component } from 'react';
import lodash from 'lodash';
import type { Dispatch } from 'redux';
import { connect } from 'dva';
import { Form } from 'antd';

import FormLayout from 'basic/components/Form/FormLayout';
import { FormItemNumber, formUtils } from 'basic/components/Form';
import type { FormComponentProps } from 'antd/es/form';
import { AccidentBenefitPayableItemLayout } from '../FormLayout.json';
import { BenefitLimitCode } from '../_models/dto';
import { ESkipCalculate } from '../_models/dto/ESkipCalculate';
import { EHintWords } from '../_models/dto/EHintWords';

import styles from './AccidentBenefitPayableList.less';

const FORMID = 'accidentBenefitPayableItem';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  accidentBenefitId: string;
  treatmentPayableId: string;
  validating: boolean;
}

class AccidentBenefitPayableItem extends Component<IProps> {
  fieldContrast = {
    remainingDays: [BenefitLimitCode.AMOUNT_PER_WEEK, BenefitLimitCode.SA_PERCENTAGE_PER_WEEK],
    amountPerWeek: [BenefitLimitCode.AMOUNT_PER_WEEK],
    saPercentagePerWeek: [BenefitLimitCode.SA_PERCENTAGE_PER_WEEK],
    maxAmountPerWeek: [BenefitLimitCode.SA_PERCENTAGE_PER_WEEK],
    remainingYears: [BenefitLimitCode.SA_PERCENTAGE_PER_YEAR],
    saPercentageYear: [BenefitLimitCode.SA_PERCENTAGE_PER_YEAR],
    maxAmountPerLifetime: [BenefitLimitCode.SA_PERCENTAGE],
    saPercentagePerDisability: [BenefitLimitCode.SA_PERCENTAGE_PER_DISABILITY],
  };

  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form, accidentBenefitId } = this.props;
    dispatch({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: `${FORMID}-${accidentBenefitId}`,
      },
    });
  };

  unRegisterForm = () => {
    const { dispatch, form, accidentBenefitId } = this.props;

    dispatch({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: `${FORMID}-${accidentBenefitId}`,
      },
    });
  };

  render() {
    const { form, accidentBenefitPayableItem, claimDecision, taskNotEditable }: any = this.props;
    const benefitItemCode = form.getFieldValue('benefitItemCode');
    const { limitCode, skipCalculate }: any = accidentBenefitPayableItem;

    const isSkipCalculate = skipCalculate === ESkipCalculate.Yes;

    return (
      <div className={styles.benefit_item_wrap}>
        <Form layout="vertical">
          {!!benefitItemCode && (
            <FormLayout json={AccidentBenefitPayableItemLayout}>
              {lodash.includes(this.fieldContrast.remainingDays, limitCode) && (
                <FormItemNumber
                  form={form}
                  disabled={!isSkipCalculate}
                  precision={0}
                  formName="remainingDays"
                  labelId="app.navigator.task-detail-of-claim-assessment.label.remaining-days"
                  reminder={isSkipCalculate && EHintWords.ForReference}
                />
              )}
              {lodash.includes(this.fieldContrast.saPercentagePerWeek, limitCode) && (
                <FormItemNumber
                  form={form}
                  disabled
                  formName="saPercentagePerWeek"
                  labelId="app.navigator.task-detail-of-claim-assessment.sa-per-week"
                />
              )}
              {lodash.includes(this.fieldContrast.amountPerWeek, limitCode) && (
                <FormItemNumber
                  form={form}
                  disabled
                  formName="amountPerWeek"
                  labelId="app.navigator.task-detail-of-claim-assessment.amount-per-week"
                />
              )}
              {lodash.includes(this.fieldContrast.maxAmountPerWeek, limitCode) && (
                <FormItemNumber
                  form={form}
                  disabled
                  formName="maxAmountPerWeek"
                  labelId="app.navigator.task-detail-of-claim-assessment.amount-per-week-limit"
                />
              )}
              {lodash.includes(this.fieldContrast.remainingYears, limitCode) && (
                <FormItemNumber
                  form={form}
                  disabled={!isSkipCalculate}
                  min={0}
                  max={10}
                  precision={0}
                  formName="remainingYears"
                  labelId="venus_claim.label.remaining-years"
                  reminder={isSkipCalculate && EHintWords.ForReference}
                />
              )}
              {lodash.includes(this.fieldContrast.saPercentageYear, limitCode) && (
                <FormItemNumber
                  form={form}
                  disabled
                  min={0}
                  max={100}
                  formName="saPercentagePerYear"
                  labelId="venus_claim.label.sa-percentage-per-year"
                />
              )}
              {lodash.includes(this.fieldContrast.maxAmountPerLifetime, limitCode) && (
                <FormItemNumber
                  form={form}
                  disabled
                  formName="maxAmountPerLifetime"
                  labelId="venus-claim-label.max-amount-per-lifetime"
                />
              )}
              {lodash.includes(this.fieldContrast.saPercentagePerDisability, limitCode) && (
                <FormItemNumber
                  form={form}
                  precision={2}
                  disabled={!isSkipCalculate}
                  formName="accumulatedAmount"
                  labelId="venus-claim-label.accumulated-amount"
                  reminder={isSkipCalculate && EHintWords.ForReference}
                />
              )}
              <FormItemNumber
                form={form}
                disabled
                formName="systemCalculationAmount"
                labelId="app.claim.label.calculation-amount"
              />
              <FormItemNumber
                form={form}
                disabled={taskNotEditable || claimDecision === 'D'}
                formName="assessorOverrideAmount"
                labelId="app.claim.label.override-amount"
                min={0}
                max={10999999999.99}
              />
            </FormLayout>
          )}
        </Form>
      </div>
    );
  }
}

const FormWrap = Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating, accidentBenefitId, treatmentPayableId } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'PHCLMOfClaimAssessmentController/saveEntry',
            target: 'saveAccidentBenefitPayableItem',
            payload: {
              changedFields,
              id: accidentBenefitId,
              treatmentPayableId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'PHCLMOfClaimAssessmentController/saveFormData',
          target: 'saveAccidentBenefitPayableItem',
          payload: {
            changedFields,
            id: accidentBenefitId,
            treatmentPayableId,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { accidentBenefitPayableItem }: any = props;
    return formUtils.mapObjectToFields(accidentBenefitPayableItem, {
      benefitItemCode: (value: any) => value,
      remainingDays: (value: any) => value,
      saPercentagePerWeek: (value: any) => value,
      maxAmountPerWeek: (value: any) => value,
      amountPerWeek: (value: any) => value,
      systemCalculationAmount: (value: any) => value,
      assessorOverrideAmount: (value: any) => value,
      remainingYears: (value: any) => value,
      saPercentagePerYear: (value: any) => value,
      maxAmountPerLifetime: (value: any) => value,
      accumulatedAmount: (value: any) => value,
    });
  },
})(AccidentBenefitPayableItem);

export default connect(
  (
    { PHCLMOfClaimAssessmentController, formCommonController, claimEditable }: any,
    { accidentBenefitId }: any
  ) => {
    const accidentBenefitPayableItem =
      PHCLMOfClaimAssessmentController.claimEntities.accidentBenefitPayableListMap[
        accidentBenefitId
      ];

    const { treatmentPayableId, payableId } = accidentBenefitPayableItem;
    const claimDecision = lodash.get(
      PHCLMOfClaimAssessmentController,
      `claimEntities.claimPayableListMap.${payableId}.claimDecision`
    );

    return {
      accidentBenefitPayableItem,
      treatmentPayableId,
      claimDecision,
      validating: formCommonController.validating,
      taskNotEditable: claimEditable.taskNotEditable,
    };
  }
)(FormWrap);
