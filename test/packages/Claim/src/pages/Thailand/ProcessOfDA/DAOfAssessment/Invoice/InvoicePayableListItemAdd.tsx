/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Form } from 'antd';
import FormLayout from 'basic/components/Form/FormLayout';
import CardOfClaim from 'basic/components/Form/FormCard';
import { filterBenefitList } from 'claim/pages/utils/formUtils';
import { formatRemarkText } from 'claim/pages/utils/taskUtils';
import { formUtils } from 'basic/components/Form';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemNumber from 'basic/components/Form/FormItem/FormItemNumber';
import { claimPayableWithTreatmentLayout, InvoicePayableItemLayout } from '../FormLayout.json';
import styles from '../Benefit/BenefitPayableItem.less';

const FORMID = 'invoiceItemPayableItemAdd';

const mapStateToProps = (
  { daOfClaimAssessmentController, loading, formCommonController, claimEditable }: any,
  { treatmentId }: any
) => {
  let policyNoList: any = [];
  const { claimEntities } = daOfClaimAssessmentController;
  const payableListEntries = Object.entries(claimEntities.treatmentPayableListMap);
  const payableList: any = [];
  lodash.map(payableListEntries, (item: any) => {
    if (item[1].treatmentId === treatmentId) {
      payableList.push(item[1]);
    }
  });
  const policyList = lodash.uniqBy(formUtils.cleanValidateData(payableList), 'policyNo');
  lodash.map(policyList, (item) => {
    const obj = {
      policyNo: item.policyNo,
    };
    policyNoList = [...policyNoList, obj];
  });

  return {
    policyNoList,
    listPolicy: daOfClaimAssessmentController.listPolicy,
    loadingOfPolicy: loading.effects['daOfClaimAssessmentController/queryListPolicy'],
    policyBackgrounds: daOfClaimAssessmentController.policyBackgrounds || {},
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
  };
};

@connect(mapStateToProps)
// @ts-ignore
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating }: any = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'daOfClaimAssessmentController/saveEntry',
            target: 'saveInvoicePayableAddItem',
            payload: {
              changedFields,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'daOfClaimAssessmentController/saveFormData',
          target: 'saveInvoicePayableAddItem',
          payload: {
            changedFields,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { invoicePayableItemDetail } = props;

    return formUtils.mapObjectToFields(invoicePayableItemDetail, {
      remark: (value: any) => formatRemarkText(value),
    });
  },
})
class InvoiceItemPayableItem extends Component {
  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form } = this.props;
    dispatch({
      type: 'daOfClaimAssessmentController/registerForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  unRegisterForm = () => {
    const { dispatch, form } = this.props;
    dispatch({
      type: 'daOfClaimAssessmentController/unRegisterForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  getProductList = () => {
    const { listPolicy, form }: any = this.props;

    const policyGrouped = lodash.groupBy(listPolicy, 'policyNo');
    const filteredList = policyGrouped[form.getFieldValue('policyNo')];
    const productNoList = lodash.uniqBy(filteredList, 'coreProductCode');

    return productNoList;
  };

  getBenefitItemList = () => {
    const { listPolicy, form } = this.props;
    const policyList = listPolicy.filter(
      (item) =>
        item.policyNo === form.getFieldValue('policyNo') &&
        item.coreProductCode === form.getFieldValue('productCode') &&
        item.benefitTypeCode === form.getFieldValue('benefitTypeCode')
    );

    return policyList;
  };

  handleDelete = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'daOfClaimAssessmentController/removeInvoicePayableAddItem',
    });
  };

  render() {
    const { policyBackgrounds, form, loadingOfPolicy, policyNoList, taskNotEditable } = this.props;

    const productNoList = this.getProductList();

    const benefitItemList = this.getBenefitItemList();

    return (
      <CardOfClaim
        showButton={!taskNotEditable}
        handleClick={() => {
          this.handleDelete();
        }}
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
              disabled={taskNotEditable}
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
              disabled={taskNotEditable}
              required
              formName="productCode"
              labelId="app.navigator.task-detail-of-claim-assessment.label.product"
              dicts={productNoList}
              dictCode="coreProductCode"
              dictTypeCode="Dropdown_PRD_BenefitType"
              dictName="benefitTypeName"
              loading={loadingOfPolicy}
            />
          </FormLayout>
          <div className={styles.benefit_payable_bg}>
            <FormLayout json={InvoicePayableItemLayout}>
              <span className={styles.benefit_item_head}>Benefit Item</span>
              <span className={styles.benefit_item_head}>Payable Amount</span>
            </FormLayout>
            <FormLayout json={InvoicePayableItemLayout}>
              <FormItemSelect
                form={form}
                disabled
                formName="benefitItemCode"
                dicts={policyNoList}
                filterList={filterBenefitList(policyNoList)}
                dictCode="coreProductCode"
                dictName="benefitItemCode"
                optionShowType="both"
                loading={loadingOfPolicy}
              />
              <span className={styles.benefit_item_field}>Payable Amount</span>
            </FormLayout>
          </div>
        </Form>
      </CardOfClaim>
    );
  }
}

export default InvoiceItemPayableItem;
