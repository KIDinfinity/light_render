import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import lodash, { get } from 'lodash';
import { policyItemName } from '@/utils/utils';
import FormLayout from 'basic/components/Form/FormLayout';
import CardOfClaim from 'basic/components/Form/FormCard';

import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import { FormItemNumber, FormItemCurrency, formUtils } from 'basic/components/Form';
import { ClaimDecision } from 'claim/pages/utils/claim';
import { claimPayableWithTreatmentLayout } from '../FormLayout.json';
import styles from './ServiceItemPayableListItem.less';

const FORMID = 'serviceItemPayableList';

const mapStateToProps = (
  { bpOfClaimAssessmentController, formCommonController, claimEditable }: any,
  { serviceItemPayableId }: any
) => {
  const serviceItemPayableItem =
    bpOfClaimAssessmentController.claimEntities.serviceItemPayableListMap[serviceItemPayableId];
  const isShowCalculation = !lodash.isEmpty(serviceItemPayableItem.process);
  return {
    listPolicy: bpOfClaimAssessmentController.listPolicy,
    policyBackgrounds: formCommonController.policyBackgrounds,
    serviceItemPayableItem,
    isShowCalculation,
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
    incidentPayableItem: get(
      bpOfClaimAssessmentController,
      `claimEntities.claimPayableListMap[${serviceItemPayableItem.payableId}]`,
      {}
    ),
  };
};

@connect(mapStateToProps)
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, serviceItemPayableId, validating } = props;

    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'bpOfClaimAssessmentController/saveEntry',
            target: 'saveServicePayableItem',
            payload: {
              changedFields,
              serviceItemPayableId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'bpOfClaimAssessmentController/saveFormData',
          target: 'saveServicePayableItem',
          payload: {
            changedFields,
            serviceItemPayableId,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { serviceItemPayableItem } = props;

    return formUtils.mapObjectToFields(serviceItemPayableItem, {
      systemCalculationAmount: (value: any) => value,
      assessorOverrideAmount: (value: any) => value,
      remark: (value: any) => value,
      policyNo: (value: any) => value,
      productCode: (value: any) => value,
      benefitTypeCode: (value: any) => value,
      benefitItemCode: (value: any) => value,
      payableDays: (value: any) => value,
      deductibleAmount: (value: any) => value,
    });
  },
})
class ServiceItemPayableListItem extends PureComponent {
  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form, serviceItemPayableId } = this.props;

    dispatch({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: `${FORMID}-${serviceItemPayableId}`,
      },
    });
  };

  unRegisterForm = () => {
    const { dispatch, form, serviceItemPayableId } = this.props;

    dispatch({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: `${FORMID}-${serviceItemPayableId}`,
      },
    });
  };

  handleDelete = () => {
    const { dispatch, serviceItemPayableItem } = this.props;

    dispatch({
      type: 'bpOfClaimAssessmentController/removeServicePayableItem',
      payload: {
        invoicePayableItemId: serviceItemPayableItem.invoicePayableId,
        serviceItemPayableItemId: serviceItemPayableItem.id,
      },
    });
  };

  getPolicyList = () => {
    const { listPolicy, form } = this.props;

    const policyList = lodash.filter(
      listPolicy,
      (item) =>
        item.policyNo === form.getFieldValue('policyNo') &&
        item.coreProductCode === form.getFieldValue('productCode') &&
        item.benefitTypeCode === form.getFieldValue('benefitTypeCode')
    );

    return policyList;
  };

  handleOpenCalculationModel = () => {
    const { dispatch, listPolicy, serviceItemPayableItem } = this.props;
    const benefitItemCode = formUtils.queryValue(serviceItemPayableItem.benefitItemCode);
    const benefitItemName = policyItemName(listPolicy, benefitItemCode);

    dispatch({
      type: 'calculationPath/openHospitalIncomeModal',
      payload: {
        detail: serviceItemPayableItem,
        benefitItemName,
      },
    });
  };

  render() {
    const {
      policyBackgrounds,
      form,
      isShowCalculation,
      taskNotEditable,
      incidentPayableItem,
    } = this.props;

    const policyNoList = this.getPolicyList();
    const isDeclined =
      formUtils.queryValue(incidentPayableItem.claimDecision) === ClaimDecision.deny;
    return (
      <div className={styles.serviceItemPayableListItem}>
        <CardOfClaim
          showButton={!taskNotEditable}
          handleClick={this.handleDelete}
          cardStyle={
            policyBackgrounds && form.getFieldValue('policyNo')
              ? { background: policyBackgrounds[form.getFieldValue('policyNo')] }
              : {}
          }
        >
          <Form layout="vertical">
            <FormLayout json={claimPayableWithTreatmentLayout}>
              <span className={styles.systemCalculationAmount}>
                <FormItemCurrency
                  form={form}
                  disabled
                  formName="systemCalculationAmount"
                  labelId="app.navigator.task-detail-of-data-capture.label.system-calculation-amount"
                  isShowCalculation={isShowCalculation}
                  handleOpen={this.handleOpenCalculationModel}
                  hiddenPrefix
                />
              </span>
              <FormItemCurrency
                form={form}
                disabled={taskNotEditable || isDeclined}
                formName="assessorOverrideAmount"
                labelId="app.navigator.task-detail-of-data-capture.label.assessor-override-amount"
                hiddenPrefix
              />
              <FormItemInput
                form={form}
                disabled={taskNotEditable}
                name="remark"
                formName="remark"
                maxLength={240}
                labelId="app.navigator.task-detail-of-claim-assessment.label.assessment-remark"
              />
              <FormItemSelect
                form={form}
                disabled
                required
                formName="policyNo"
                labelId="app.navigator.task-detail-of-claim-assessment.label.plicy-no"
                dicts={policyNoList}
                dictCode="policyNo"
                dictName="policyNo"
              />
              <FormItemSelect
                form={form}
                disabled
                required
                formName="productCode"
                labelId="app.navigator.task-detail-of-claim-assessment.label.product"
                dicts={policyNoList}
                dictCode="coreProductCode"
                dictName="productName"
                optionShowType="both"
              />
              <FormItemSelect
                form={form}
                disabled
                required
                name="benefitTypeCode"
                formName="benefitTypeCode"
                labelId="app.navigator.task-detail-of-claim-assessment.label.benefit-type"
                dicts={policyNoList}
                dictCode="benefitTypeCode"
                dictName="benefitTypeName"
                optionShowType="both"
              />
              <FormItemSelect
                form={form}
                disabled={taskNotEditable}
                required
                formName="benefitItemCode"
                labelId="app.navigator.task-detail-of-claim-assessment.label.benefit-item"
                dicts={policyNoList}
                dictCode="benefitItemCode"
                dictName="benefitItemName"
                optionShowType="both"
              />
              <FormItemNumber
                form={form}
                disabled={taskNotEditable || isDeclined}
                formName="payableDays"
                labelId="app.navigator.task-detail-of-claim-assessment.label.payable-days"
              />
              <FormItemCurrency
                form={form}
                disabled={taskNotEditable || isDeclined}
                formName="deductibleAmount"
                labelId="app.navigator.task-detail-of-claim-assessment.label.deductible-amount"
                hiddenPrefix
              />
            </FormLayout>
          </Form>
        </CardOfClaim>
      </div>
    );
  }
}

export default ServiceItemPayableListItem;
