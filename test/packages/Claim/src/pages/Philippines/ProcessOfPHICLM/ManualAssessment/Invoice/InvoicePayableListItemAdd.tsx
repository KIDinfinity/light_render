import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Form } from 'antd';
import FormLayout from 'basic/components/Form/FormLayout';
import CardOfClaim from 'basic/components/Form/FormCard';
import { formUtils } from 'basic/components/Form';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import { claimPayableWithTreatmentLayout } from '../FormLayout.json';

const FORMID = 'invoiceItemPayableItemAdd';

const mapStateToProps = (
  { PHCLMOfClaimAssessmentController, formCommonController },
  { treatmentId }
) => {
  let policyNoList = [];
  // 只可选医疗补偿类型的保单
  const { claimEntities } = PHCLMOfClaimAssessmentController;
  const payableListEntries = Object.entries(claimEntities.treatmentPayableListMap);
  const payableList = [];
  lodash.map(payableListEntries, (item) => {
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
    listPolicy: PHCLMOfClaimAssessmentController.listPolicy,
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
            type: 'PHCLMOfClaimAssessmentController/saveEntry',
            target: 'saveInvoicePayableAddItem',
            payload: {
              changedFields,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'PHCLMOfClaimAssessmentController/saveFormData',
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
      remark: (value: any) => value,
      policyNo: (value: any) => value,
      productCode: (value: any) => value,
      benefitTypeCode: (value: any) => value,
    });
  },
})
class InvoiceItemPayableItem extends PureComponent {
  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form } = this.props;
    dispatch({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  unRegisterForm = () => {
    const { dispatch, form } = this.props;
    dispatch({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: FORMID,
      },
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

  handleDelete = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'PHCLMOfClaimAssessmentController/removeInvoicePayableAddItem',
    });
  };

  render() {
    const { policyBackgrounds, form, policyNoList } = this.props;
    const productNoList = this.getProductList();
    const benefitTypeList = this.getBenefitTypeList();
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
      >
        <Form layout="vertical">
          <FormLayout json={claimPayableWithTreatmentLayout}>
            <FormItemSelect
              form={form}
              required
              dicts={policyNoList}
              dictCode="policyNo"
              dictName="policyNo"
              formName="policyNo"
              labelId="app.navigator.task-detail-of-claim-assessment.beneficiary.label.policy-no"
            />
            <FormItemSelect
              form={form}
              required
              dicts={productNoList}
              dictCode="coreProductCode"
              dictName="productName"
              optionShowType="both"
              formName="productCode"
              labelId="app.navigator.task-detail-of-claim-assessment.label.product"
            />
            <FormItemSelect
              form={form}
              required
              dicts={benefitTypeList}
              dictCode="benefitTypeCode"
              dictName="benefitTypeName"
              optionShowType="both"
              formName="benefitTypeCode"
              labelId="app.navigator.task-detail-of-claim-assessment.label.benefit-type"
              name="remark"
            />
            <FormItemInput
              form={form}
              name="remark"
              formName="remark"
              labelId="app.navigator.task-detail-of-claim-assessment.label.assessment-remark"
            />
          </FormLayout>
        </Form>
      </CardOfClaim>
    );
  }
}

export default InvoiceItemPayableItem;
