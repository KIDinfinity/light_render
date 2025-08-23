import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemNumber from 'basic/components/Form/FormItem/FormItemNumber';
import { isNoBelongPolicy } from 'claim/pages/Japan/ProcessOfJPCLM/utils/expectDecisionUtils';
import { VLD_000059 } from 'claim/pages/validators/fieldValidators';
import { ClaimDecision } from 'claim/pages/utils/claim';
import json from '../FormLayout.json';

const FORMID = 'claimPayableListItemLife';

@connect(
  ({
    dictionaryController,
    JPCLMOfClaimAssessmentController,
    formCommonController,
    claimEditable,
  }) => ({
    dictsOfClaimDecision: dictionaryController.EligibileCheck,
    dictsOfAmountType: dictionaryController.AmountType,
    listPolicy: JPCLMOfClaimAssessmentController.listPolicy,
    policyBackgrounds: JPCLMOfClaimAssessmentController?.policyBackgrounds,
    claimPayableListMap: JPCLMOfClaimAssessmentController.claimEntities.claimPayableListMap,
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, incidentPayableItem, validating } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'JPCLMOfClaimAssessmentController/saveEntry',
            target: 'saveLifePayable',
            payload: {
              changedFields,
              incidentPayableId: incidentPayableItem.id,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'JPCLMOfClaimAssessmentController/saveFormData',
          target: 'saveLifePayable',
          payload: {
            changedFields,
            incidentPayableId: incidentPayableItem.id,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const {
      incidentPayableItem: { lifePayable },
    } = props;

    return formUtils.mapObjectToFields(lifePayable);
  },
})
class IncidentListItemOfPayableListItemOfLife extends PureComponent {
  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form, incidentPayableItem } = this.props;

    if (incidentPayableItem.id) {
      setTimeout(() => {
        dispatch(
          {
            type: 'formCommonController/registerForm',
            payload: {
              form,
              formId: `${FORMID}-${incidentPayableItem.id}`,
            },
          },
          0
        );
      });
    }
  };

  unRegisterForm = () => {
    const { dispatch, form, incidentPayableItem } = this.props;

    if (incidentPayableItem.id) {
      setTimeout(() => {
        dispatch(
          {
            type: 'formCommonController/unRegisterForm',
            payload: {
              form,
              formId: `${FORMID}-${incidentPayableItem.id}`,
            },
          },
          0
        );
      });
    }
  };

  getBenefitItemList = () => {
    const {
      listPolicy,
      incidentPayableItem: { lifePayable },
    } = this.props;

    const policyList = listPolicy?.filter?.(
      (item) =>
        item.policyNo === lifePayable.policyNo &&
        item.coreProductCode === lifePayable.productCode &&
        item.benefitTypeCode === lifePayable.benefitTypeCode
    );

    return lodash.uniqBy(policyList, 'benefitItemCode');
  };

  render() {
    const {
      form,
      dictsOfAmountType,
      taskNotEditable,
      incidentPayableItem,
      claimPayableListMap,
    } = this.props;
    const benefitItemList = this.getBenefitItemList();
    const isNoBelong = isNoBelongPolicy(incidentPayableItem.policySetupStatus);
    const isDeclined =
      formUtils.queryValue(incidentPayableItem.claimDecision) === ClaimDecision.deny;

    return (
      <Form layout="vertical">
        <FormLayout json={json}>
          <FormItemSelect
            form={form}
            disabled={taskNotEditable || isNoBelong}
            dicts={benefitItemList}
            dictCode="benefitItemCode"
            dictName="benefitItemName"
            optionShowType="name"
            formName="benefitItemCode"
            labelId="app.navigator.task-detail-of-claim-assessment.label.benefit-item"
            rules={[
              {
                validator: VLD_000059(claimPayableListMap, incidentPayableItem),
              },
            ]}
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable || isNoBelong}
            required
            dicts={dictsOfAmountType}
            // dictCode="benefitTypeCode"
            // dictName="benefitTypeName"
            optionShowType="both"
            formName="amountType"
            labelId="app.navigator.task-detail-of-claim-assessment.label.amount-type2"
          />
          <FormItemNumber
            form={form}
            disabled
            formName="calculationAmount"
            precision={0}
            labelId="app.navigator.task-detail-of-claim-assessment.label.calculative-amount"
          />
          <FormItemNumber
            form={form}
            disabled={taskNotEditable || isNoBelong || isDeclined}
            formName="assessorOverrideMultiple"
            labelId="app.navigator.task-detail-of-claim-assessment.label.assessor-override-percentage"
          />
          <FormItemNumber
            form={form}
            disabled
            formName="reimbursementMultiple"
            labelId="app.navigator.task-detail-of-claim-assessment.label.percentage"
          />
        </FormLayout>
      </Form>
    );
  }
}

export default IncidentListItemOfPayableListItemOfLife;
