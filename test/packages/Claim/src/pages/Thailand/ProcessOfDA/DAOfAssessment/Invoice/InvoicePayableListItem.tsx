/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemNumber from 'basic/components/Form/FormItem/FormItemNumber';
import CardOfClaim from 'basic/components/Form/FormCard';
import { transRemarkCodeToMsg } from 'claim/pages/utils/taskUtils';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ClaimDecision as enumClaimDecision } from '../_models/dto';
import { claimPayableWithTreatmentLayout, InvoicePayableItemLayout } from '../FormLayout.json';
import styles from '../Benefit/BenefitPayableItem.less';
import BenefitPayableItemShort from '../Benefit/BenefitPayableItemShort';

const FORMID = 'invoicePayableListItem';

@connect(
  (
    { daOfClaimAssessmentController, formCommonController, loading, claimEditable }: any,
    { invoicePayableItemId }: any
  ) => ({
    submited: formCommonController.submited,
    claimDecision:
      daOfClaimAssessmentController.claimEntities.claimPayableListMap[
        daOfClaimAssessmentController.claimEntities.invoicePayableListMap[invoicePayableItemId]
          ?.payableId
      ]?.claimDecision,
    listPolicy: daOfClaimAssessmentController.listPolicy,
    loadingOfPolicy: loading.effects['daOfClaimAssessmentController/queryListPolicy'],
    policyBackgrounds: formCommonController.policyBackgrounds,
    invoicePayableItem:
      daOfClaimAssessmentController.claimEntities.invoicePayableListMap[invoicePayableItemId],
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
// @ts-ignore
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, invoicePayableItemId, validating }: any = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'daOfClaimAssessmentController/saveEntry',
            target: 'saveInvoicePayableItem',
            payload: {
              changedFields,
              invoicePayableItemId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'daOfClaimAssessmentController/saveFormData',
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
    const { invoicePayableItem } = props;

    return formUtils.mapObjectToFields(invoicePayableItem, {
      remark: (value: any) => transRemarkCodeToMsg(value, true),
    });
  },
})
class InvoicePayableListItem extends Component {
  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  get errorMessage() {
    const { submited, invoicePayableItem, listPolicy, claimDecision }: any = this.props;
    const { benefitItemPayableList, policyNo, benefitTypeCode } = invoicePayableItem;
    const policyNoValue = formUtils.queryValue(policyNo);
    const benefitTypeName = lodash
      .chain(listPolicy)
      .find((item: any) => {
        if (lodash.isObject(item) && item) {
          return (
            item.policyNo === policyNoValue &&
            item.benefitTypeCode === formUtils.queryValue(benefitTypeCode)
          );
        }
        return false;
      })
      .get('benefitTypeName')
      .value();
    if (
      submited &&
      lodash.isEmpty(benefitItemPayableList) &&
      formUtils.queryValue(claimDecision) === enumClaimDecision.approve
    ) {
      return (
        <ErrorTooltipManual
          manualErrorMessage={formatMessageApi(
            { message: 'ERR_000242' },
            policyNoValue,
            benefitTypeName
          )}
        />
      );
    }
    return '';
  }

  registeForm = () => {
    const { dispatch, form, invoicePayableItem } = this.props;

    dispatch({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: `${FORMID}-${invoicePayableItem.id}`,
      },
    });
  };

  unRegisterForm = () => {
    const { dispatch, form, invoicePayableItem } = this.props;

    dispatch({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: `${FORMID}-${invoicePayableItem.id}`,
      },
    });
  };

  handleDelete = () => {
    const { dispatch, invoicePayableItem, invoicePayableItemId }: any = this.props;
    dispatch({
      type: 'daOfClaimAssessmentController/removeInvoicePayableItem',
      payload: {
        treatmentPayableItemId: invoicePayableItem.treatmentPayableId,
        invoicePayableItemId,
        benefitItemPayableList: invoicePayableItem?.benefitItemPayableList || [],
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

  render() {
    const { policyBackgrounds, form, loadingOfPolicy, invoicePayableItem, taskNotEditable } =
      this.props;
    const { benefitItemPayableList } = invoicePayableItem;
    const policyNoList = this.getPolicyList();

    return (
      <CardOfClaim
        showButton={!taskNotEditable && invoicePayableItem.isAdd}
        handleClick={this.handleDelete}
        cardStyle={
          form.getFieldValue('policyNo')
            ? { background: policyBackgrounds[form.getFieldValue('policyNo')] }
            : {}
        }
      >
        <Form layout="vertical">
          <FormLayout json={claimPayableWithTreatmentLayout}>
            <FormItemNumber
              form={form}
              disabled
              formName="systemCalculationAmount"
              labelId="app.navigator.task-detail-of-data-capture.label.system-calculation-amount"
              rules={[
                {
                  pattern: /^\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?$/g,
                  message: 'Out of range!!',
                },
              ]}
            />
            <FormItemNumber
              form={form}
              disabled
              formName="assessorOverrideAmount"
              labelId="app.navigator.task-detail-of-data-capture.label.assessor-override-amount"
              rules={[
                {
                  pattern: /^\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?$/g,
                  message: 'Out of range!!',
                },
              ]}
            />
            <FormItemInput
              form={form}
              disabled
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
              loading={loadingOfPolicy}
            />
            <FormItemSelect
              form={form}
              disabled
              required
              formName="benefitTypeCode"
              dictTypeCode="Dropdown_PRD_BenefitType"
              labelId="venus.claim.product-name"
              dicts={policyNoList}
              dictCode="benefitTypeCode"
              dictName="benefitTypeName"
              loading={loadingOfPolicy}
            />
          </FormLayout>
          <div className={styles.benefit_payable_bg}>
            {this.errorMessage}
            <FormLayout json={InvoicePayableItemLayout}>
              <span className={styles.benefit_item_head}>Benefit Item</span>
              <span className={styles.benefit_item_head}>Payable Amount</span>
            </FormLayout>
            {benefitItemPayableList &&
              lodash.map(benefitItemPayableList, (item: any) => (
                <BenefitPayableItemShort
                  key={item}
                  benefitPayableItemId={item}
                  policyNoList={policyNoList}
                />
              ))}
          </div>
        </Form>
      </CardOfClaim>
    );
  }
}

export default InvoicePayableListItem;
