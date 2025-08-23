import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemNumber from 'basic/components/Form/FormItem/FormItemNumber';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import json from '../layout/FormLayout.json';
import { EPaymentMethod, EPolicySource } from '../../../../PaymentAllocation/_dto/Enums';
import styles from './PolicyItem.less';

interface ISProps {
  dictsOfPolicyType?: any;
  dictsOfPayablesType?: any;
  dictsOfPaymentMethod?: any;
  dictsOfPayto?: any;
  policyBenefitItem?: any;
  policyBenefitId?: string;
  form?: any;
  validating: boolean;
  payeeList?: any;
  policyOwnerBOList?: any;
}

@connect(
  (
    {
      daOfClaimAssessmentController,
      formCommonController,
      dictionaryController,
      claimEditable,
    }: any,
    { policyBenefitId }: any
  ) => ({
    dictsOfPolicyType: dictionaryController.PolicyType,
    payeeList: lodash.get(daOfClaimAssessmentController, 'claimProcessData.payeeList', []),
    policyOwnerBOList: lodash.get(
      daOfClaimAssessmentController,
      'claimProcessData.policyOwnerBOList',
      []
    ),
    policyOwnerBOListMap: lodash.get(
      daOfClaimAssessmentController,
      'claimEntities.policyOwnerBOListMap',
      {}
    ),
    dictsOfPayablesType: dictionaryController.Label_BIZ_Claim,
    dictsOfPaymentMethod: dictionaryController.Dropdown_CLM_PaymentMethod_Reimbursement,
    dictsOfPayto: dictionaryController.Payto,
    claimEntities: daOfClaimAssessmentController.claimEntities,
    policyBenefitItem:
      daOfClaimAssessmentController.claimEntities.policyBenefitListMap[policyBenefitId],
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
    policyPayorBOList: daOfClaimAssessmentController?.claimProcessData?.policyPayorBOList,
  })
)
// @ts-ignore
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, policyBenefitId, validating } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'daOfClaimAssessmentController/saveEntry',
            target: 'savePolicyBenefitItem',
            payload: {
              changedFields,
              policyBenefitId,
              validating,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'daOfClaimAssessmentController/saveFormData',
          target: 'savePolicyBenefitItem',
          payload: {
            changedFields,
            policyBenefitId,
            validating,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { policyBenefitItem }: any = props;

    return formUtils.mapObjectToFields(policyBenefitItem, {
      policyNo: (value: any) => value,
      policyType: (value: any) => value,
      payablesType: (value: any) => value,
      benefitAmount: (value: any) => value,
      paymentMethod: (value: any) => value,
      payTo: (value: any) => value,
    });
  },
})
class PolicyBenefitListItem extends PureComponent<ISProps> {
  registeForm = () => {
    const { dispatch, form, policyBenefitId } = this.props;

    dispatch({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: policyBenefitId,
      },
    });
  };

  newPaymentMethod = () => {
    const { dictsOfPaymentMethod, policyBenefitItem, claimEntities }: any = this.props;

    return claimEntities?.beneficiaryListMap?.[policyBenefitItem?.beneficiaryList?.[0]]
      ?.sourceSystem === EPolicySource.IL
      ? dictsOfPaymentMethod
      : lodash.filter(dictsOfPaymentMethod, (item: any) => {
          return item.dictCode !== EPaymentMethod.Draft;
        });
  };

  componentDidMount = () => {
    this.registeForm();
  };

  unRegisterForm = () => {
    const { dispatch, form, policyBenefitId } = this.props;

    dispatch({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: policyBenefitId,
      },
    });
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  render() {
    const {
      form,
      dictsOfPolicyType,
      dictsOfPayablesType,
      dictsOfPaymentMethod,
      dictsOfPayto,
      policyBenefitItem,
      payeeList,
      policyOwnerBOList,
      policyOwnerBOListMap,
      taskNotEditable,
      claimEntities,
      policyPayorBOList,
    } = this.props;
    return (
      <div className={styles.PolicyItemWrap}>
        {policyBenefitItem.benefitAmount !== 0 && (
          <Form layout="vertical" className="policyBenefitListItemOfBasicInfo itemWrap">
            <FormLayout json={json}>
              <FormItemInput
                form={form}
                disabled
                formName="policyNo"
                labelId="app.navigator.task-detail-of-claim-assessment.beneficiary.label.policy-no"
              />
              <FormItemSelect
                form={form}
                disabled
                dicts={dictsOfPolicyType}
                formName="policyType"
                labelId="app.navigator.task-detail-of-claim-assessment.beneficiary.label.policy-type"
              />
              <FormItemSelect
                form={form}
                disabled
                dicts={dictsOfPayablesType}
                formName="payablesType"
                labelId="app.navigator.task-detail-of-claim-assessment.label.payables-type"
              />
              <FormItemNumber
                form={form}
                disabled
                formName="benefitAmount"
                min={0}
                max={999999999.99}
                labelId="app.navigator.task-detail-of-claim-assessment.beneficiary.label.benefit-amount"
              />
              <FormItemSelect
                form={form}
                required
                disabled={taskNotEditable}
                dicts={this.newPaymentMethod()}
                formName="paymentMethod"
                labelId="app.navigator.task-detail-of-claim-assessment.beneficiary.label.payment-method"
              />
              <FormItemSelect
                form={form}
                required
                dicts={dictsOfPayto}
                existCodes={policyPayorBOList?.length? [] : ['PP']}
                disabled={taskNotEditable}
                formName="payTo"
                labelId="app.navigator.task-detail-of-claim-assessment.beneficiary.label.payTo"
              />
            </FormLayout>
          </Form>
        )}
      </div>
    );
  }
}

export default PolicyBenefitListItem;
