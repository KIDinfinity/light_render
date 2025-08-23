import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

import FormLayout from 'basic/components/Form/FormLayout';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemCurrency from 'basic/components/Form/FormItem/FormItemCurrency';
import { lifePayableWithTreatmentLayout, lifePayableNoTreatmentLayout } from '../FormLayout.json';

const FORMID = 'claimPayableListItemLife';

@connect(
  ({
    dictionaryController,
    bpOfClaimAssessmentController,
    formCommonController,
    claimEditable,
  }: any) => ({
    dictsOfAmountType: dictionaryController.AmountType,
    listPolicy: bpOfClaimAssessmentController.listPolicy,
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
// @ts-ignore
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, incidentPayableId, validating }: any = props;

    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'bpOfClaimAssessmentController/saveEntry',
            target: 'saveLifePayable',
            payload: {
              changedFields,
              incidentPayableId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'bpOfClaimAssessmentController/saveFormData',
          target: 'saveLifePayable',
          payload: {
            changedFields,
            incidentPayableId,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const {
      incidentPayableItem: { lifePayable },
    }: any = props;

    return formUtils.mapObjectToFields(lifePayable, {
      benefitItemCode: (value: any) => value,
      amountType: (value: any) => value,
      calculationAmount: (value: any) => value,
      reimbursementPercentage: (value: any) => value,
    });
  },
})
class ClaimPayableListItemOfLife extends PureComponent {
  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form, incidentPayableId }: any = this.props;

    if (incidentPayableId) {
      dispatch({
        type: 'formCommonController/registerForm',
        payload: {
          form,
          formId: `${FORMID}-${incidentPayableId}`,
        },
      });
    }
  };

  unRegisterForm = () => {
    const { dispatch, form, incidentPayableId }: any = this.props;

    if (incidentPayableId) {
      dispatch({
        type: 'formCommonController/unRegisterForm',
        payload: {
          form,
          formId: `${FORMID}-${incidentPayableId}`,
        },
      });
    }
  };

  getBenefitItemList = () => {
    const {
      listPolicy,
      incidentPayableItem: { lifePayable = {} },
    }: any = this.props;

    return lodash
      .chain(listPolicy)
      .compact()
      .filter(
        (item) =>
          item.policyNo === formUtils.queryValue(lifePayable.policyNo) &&
          item.coreProductCode === formUtils.queryValue(lifePayable.productCode) &&
          item.benefitTypeCode === formUtils.queryValue(lifePayable.benefitTypeCode)
      )
      .value();
  };

  render() {
    const { hasTreatment, form, dictsOfAmountType, taskNotEditable }: any = this.props;
    const benefitItemList = this.getBenefitItemList();

    return (
      <Form layout="vertical">
        <FormLayout
          json={hasTreatment ? lifePayableWithTreatmentLayout : lifePayableNoTreatmentLayout}
        >
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            required
            dicts={benefitItemList}
            dictCode="benefitItemCode"
            dictName="benefitItemName"
            optionShowType="both"
            formName="benefitItemCode"
            labelId="app.navigator.task-detail-of-claim-assessment.label.benefit-item"
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            required
            dicts={dictsOfAmountType}
            optionShowType="both"
            formName="amountType"
            labelId="app.navigator.task-detail-of-claim-assessment.label.amount-type2"
          />
          <FormItemCurrency
            form={form}
            required
            disabled={taskNotEditable}
            formName="calculationAmount"
            labelId="app.navigator.task-detail-of-claim-assessment.label.calculative-amount"
            hiddenPrefix
          />
          <FormItemCurrency
            form={form}
            required
            disabled={taskNotEditable}
            formName="reimbursementPercentage"
            labelId="app.navigator.task-detail-of-claim-assessment.label.reimbursement-percentage"
            parser={(value) => value.replace('%', '')}
            hiddenPrefix
          />
        </FormLayout>
      </Form>
    );
  }
}

export default ClaimPayableListItemOfLife;
