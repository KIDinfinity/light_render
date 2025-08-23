import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Form } from 'antd';
import FormLayout from 'basic/components/Form/FormLayout';
import CardOfClaim from 'basic/components/Form/FormCard';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemCurrency from 'basic/components/Form/FormItem/FormItemCurrency';
import { formUtils } from 'basic/components/Form';
import { deleteWarning, SectionID } from '@/components/sectionWarning/index';
import { claimPayableWithTreatmentLayout } from '../FormLayout.json';

const FORMID = 'serviceItemPayableListItemAdd';

const mapStateToProps = (
  { bpOfClaimAssessmentController, formCommonController },
  { invoiceId }
) => {
  let policyNoList = [];
  // 只可选医疗补偿类型的保单
  const { claimEntities } = bpOfClaimAssessmentController;
  const payableListEntries = Object.entries(claimEntities.invoicePayableListMap);
  const payableList = [];
  lodash.map(payableListEntries, (item) => {
    if (item[1].invoiceId === invoiceId) {
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
    listPolicy: bpOfClaimAssessmentController.listPolicy,
    policyBackgrounds: formCommonController.policyBackgrounds,
    validating: formCommonController.validating,
  };
};

@connect(mapStateToProps)
// @ts-ignore
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating } = props;

    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'bpOfClaimAssessmentController/saveEntry',
            target: 'saveServicePayableAddItem',
            payload: {
              changedFields,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'bpOfClaimAssessmentController/saveFormData',
          target: 'saveServicePayableAddItem',
          payload: {
            changedFields,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { serviceItemPayableDetail } = props;

    return formUtils.mapObjectToFields(serviceItemPayableDetail, {
      systemCalculationAmount: (value: any) => value,
      assessorOverrideAmount: (value: any) => value,
      remark: (value: any) => value,
      policyNo: (value: any) => value,
      productCode: (value: any) => value,
      benefitTypeCode: (value: any) => value,
    });
  },
})
class InvoiceItemServiceItemPayableListItemAdd extends Component {
  sectionRef = React.createRef();

  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form, serviceItemPayableDetail } = this.props;

    dispatch({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: `${FORMID}-${serviceItemPayableDetail.id}`,
      },
    });
  };

  unRegisterForm = () => {
    const { dispatch, form, serviceItemPayableDetail } = this.props;

    dispatch({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: `${FORMID}-${serviceItemPayableDetail.id}`,
      },
    });
  };

  handleDelete = () => {
    const { dispatch } = this.props;
    deleteWarning({
      sectionRef: this.sectionRef,
      sectionID: SectionID.ServicePayable,
    }).then(() => {
      dispatch({
        type: 'bpOfClaimAssessmentController/removeServicePayableAddItem',
      });
    });
  };

  getProductList = () => {
    const { listPolicy, form } = this.props;

    const policyGrouped = lodash.groupBy(listPolicy, 'policyNo');
    const filteredList = policyGrouped[form.getFieldValue('policyNo')];
    const productNoList = lodash.uniqBy(filteredList, 'coreProductCode');

    return productNoList;
  };

  getBenefitTypeList = () => {
    const { listPolicy, form } = this.props;

    const policyGrouped = lodash.groupBy(listPolicy, 'policyNo');
    const filteredList = policyGrouped[form.getFieldValue('policyNo')];

    const productGrouped = lodash.groupBy(filteredList, 'coreProductCode');
    const productFilteredList = productGrouped[form.getFieldValue('productCode')];

    const benefitTypeList = lodash.uniqBy(productFilteredList, 'benefitTypeCode');

    return benefitTypeList;
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

  render() {
    const { policyBackgrounds, form, policyNoList } = this.props;

    const productNoList = this.getProductList();

    const benefitTypeList = this.getBenefitTypeList();

    // const benefitItemList = this.getBenefitItemList();

    return (
      <CardOfClaim
        showButton
        handleClick={() => {
          this.handleDelete();
        }}
        cardStyle={
          policyBackgrounds && form.getFieldValue('policyNo')
            ? { background: policyBackgrounds[form.getFieldValue('policyNo')] }
            : {}
        }
        ref={this.sectionRef}
      >
        <Form layout="vertical">
          <FormLayout json={claimPayableWithTreatmentLayout}>
            <FormItemCurrency
              form={form}
              disabled
              formName="systemCalculationAmount"
              labelId="app.navigator.task-detail-of-data-capture.label.system-calculation-amount"
              hiddenPrefix
            />
            <FormItemCurrency
              form={form}
              formName="assessorOverrideAmount"
              labelId="app.navigator.task-detail-of-data-capture.label.assessor-override-amount"
              hiddenPrefix
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
              required
              formName="policyNo"
              labelId="app.navigator.task-detail-of-claim-assessment.label.plicy-no"
              dicts={policyNoList}
              dictCode="policyNo"
              dictName="policyNo"
            />
            <FormItemSelect
              form={form}
              required
              formName="productCode"
              labelId="app.navigator.task-detail-of-claim-assessment.label.product"
              dicts={productNoList}
              dictCode="coreProductCode"
              dictName="productName"
              optionShowType="both"
            />
            <FormItemSelect
              form={form}
              required
              name="benefitTypeCode"
              formName="benefitTypeCode"
              labelId="app.navigator.task-detail-of-claim-assessment.label.benefit-type"
              dicts={benefitTypeList}
              dictCode="benefitTypeCode"
              dictName="benefitTypeName"
              optionShowType="both"
            />
          </FormLayout>
        </Form>
      </CardOfClaim>
    );
  }
}

export default InvoiceItemServiceItemPayableListItemAdd;
