import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemNumber from 'basic/components/Form/FormItem/FormItemNumber';
import CardOfClaim from 'basic/components/Form/FormCard';
import { formUtils } from 'basic/components/Form';
import { withContextData } from '@/components/_store';
import { ECaseType } from 'claim/pages/AppealCase/ManualAssessment/_dto/Enums';
import CaseCategory from 'enum/CaseCategory';
import { fnPrecisionFormatNegative } from '@/utils/precisionUtils';
import { SwitchEnum } from 'claim/pages/utils/claim';
import { claimPayableWithTreatmentLayout } from '../FormLayout.json';
import BenefitPayableList from '../Benefit/BenefitPayableList';

import styles from '../Benefit/BenefitPayableItem.less';

const FORMID = 'invoicePayableListItem';

@connect(
  (
    { PHCLMOfAppealCaseController, formCommonController, claimEditable }: any,
    { invoicePayableItemId, withData: { caseType } }: any
  ) => {
    const { claimEntities } = caseType
      ? PHCLMOfAppealCaseController[caseType]
      : PHCLMOfAppealCaseController;

    return {
      listPolicy: PHCLMOfAppealCaseController.listPolicy,
      policyBackgrounds: formCommonController.policyBackgrounds,
      invoicePayableItem: claimEntities.invoicePayableListMap[invoicePayableItemId],
      validating: formCommonController.validating,
      taskNotEditable: claimEditable.taskNotEditable,
      submited: formCommonController.submited,
      claimDecision:
        claimEntities.claimPayableListMap[
          claimEntities.invoicePayableListMap[invoicePayableItemId].payableId
        ].claimDecision,
    };
  }
)
// @ts-ignore
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, invoicePayableItemId, validating }: any = props;

    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'PHCLMOfAppealCaseController/saveEntry',
            target: 'saveInvoicePayableItem',
            payload: {
              changedFields,
              invoicePayableItemId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'PHCLMOfAppealCaseController/saveFormData',
          target: 'saveInvoicePayableItem',
          payload: {
            changedFields,
            invoicePayableItemId,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { invoicePayableItem }: any = props;

    return formUtils.mapObjectToFields(invoicePayableItem, {
      systemCalculationAmount: (value: any) => value,
      assessorOverrideAmount: (value: any) => value,
      remark: (value: any) => value,
      policyNo: (value: any) => value,
      productCode: (value: any) => value,
      benefitTypeCode: (value: any) => value,
      claimAdjustment: (value: any) => value,
    });
  },
})
class InvoicePayableListItem extends PureComponent {
  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form, invoicePayableItemId }: any = this.props;

    dispatch({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: `${FORMID}-${invoicePayableItemId}`,
      },
    });
  };

  unRegisterForm = () => {
    const { dispatch, form, invoicePayableItemId }: any = this.props;

    dispatch({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: `${FORMID}-${invoicePayableItemId}`,
      },
    });
  };

  handleDelete = () => {
    const { dispatch, invoicePayableItem, invoicePayableItemId }: any = this.props;
    dispatch({
      type: 'PHCLMOfAppealCaseController/removeInvoicePayableItem',
      payload: {
        treatmentPayableItemId: invoicePayableItem.treatmentPayableId,
        invoicePayableItemId,
      },
    });
  };

  getPolicyList = () => {
    const { listPolicy, form }: any = this.props;

    const policyList = lodash.filter(
      listPolicy,
      (item) =>
        item.policyNo === form.getFieldValue('policyNo') &&
        item.coreProductCode === form.getFieldValue('productCode') &&
        item.benefitTypeCode === form.getFieldValue('benefitTypeCode')
    );

    return policyList;
  };

  render() {
    const {
      policyBackgrounds,
      form,
      taskNotEditable: notEditable,
      invoicePayableItemId,
      invoicePayableItem,
      withData,
    }: any = this.props;
    const policyNoList = this.getPolicyList();
    const { caseType, originalCaseCategory, appealNotEditable }: any = withData || {};
    const taskNotEditable = notEditable || appealNotEditable;

    return (
      <CardOfClaim
        showButton={!taskNotEditable && invoicePayableItem.manualAdd === SwitchEnum.YES}
        handleClick={this.handleDelete}
        cardStyle={
          policyBackgrounds && form.getFieldValue('policyNo')
            ? { background: policyBackgrounds[form.getFieldValue('policyNo')] }
            : {}
        }
      >
        <Form layout="vertical">
          <FormLayout json={claimPayableWithTreatmentLayout}>
            {(ECaseType.originCase !== caseType ||
              CaseCategory.PH_AP_CTG01 === originalCaseCategory) && (
              <FormItemNumber
                form={form}
                disabled
                formName="claimAdjustment"
                min={-Number.MAX_VALUE}
                pattern={
                  /^(-\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)|(\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)$/g
                }
                formatter={fnPrecisionFormatNegative}
                required
                name="claimAdjustment"
                labelId="venus_claim.label.claimAdjustment"
              />
            )}
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
              formName="benefitTypeCode"
              labelId="app.navigator.task-detail-of-claim-assessment.label.benefit-type"
              dicts={policyNoList}
              dictCode="benefitTypeCode"
              dictName="benefitTypeName"
              optionShowType="both"
              name="remark"
            />
            <FormItemInput
              form={form}
              disabled={taskNotEditable}
              name="remark"
              formName="remark"
              labelId="app.navigator.task-detail-of-claim-assessment.label.assessment-remark"
            />
          </FormLayout>
        </Form>
        <div className={styles.benefit_payable_bg}>
          <BenefitPayableList invoicePayableId={invoicePayableItemId} policyNoList={policyNoList} />
        </div>
      </CardOfClaim>
    );
  }
}

export default withContextData(InvoicePayableListItem);
