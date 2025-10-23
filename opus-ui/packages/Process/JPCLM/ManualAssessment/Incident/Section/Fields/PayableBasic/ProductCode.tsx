import React, { useMemo } from 'react';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemSelect,
  formUtils,
} from 'basic/components/Form';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { tenant } from '@/components/Tenant';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Incident.Payable.Basic',
  field: 'productCode',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-claim-assessment.label.product',
    },
    'x-dict': { dictCode: 'coreProductCode', dictName: 'productName' },
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 10,
      },
    },
    'no-treatment-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 10,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 10,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config, isDeclined, incidentPayableItem }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dispatch = useDispatch();

  const productCode = form.getFieldValue('productCode');

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = !isDeclined && !productCode; //Rule(fieldProps['required-condition'], form, '');

  const listPolicy = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.listPolicy
  );

  const dicts = useMemo(() => {
    const policyGrouped = lodash.groupBy(listPolicy, 'policyNo');
    const filteredList = policyGrouped[form.getFieldValue('policyNo')];
    const productNoList = lodash.uniqBy(filteredList, 'coreProductCode');

    return productNoList;
  }, [listPolicy]);

  const policyNoChange = async (value: any) => {
    const { id, policyNo } = incidentPayableItem;
    const systemCurrency = tenant.currency();
    const policyCurrency = lodash.find(
      listPolicy,
      (item) => item.policyNo === formUtils.queryValue(policyNo)
    )?.policyCurrency;
    if (!value) {
      return;
    }

    // TODO find benefitCategory
    await dispatch({
      type: 'JPCLMOfClaimAssessment/getExchangeRateForPolicy',
      payload: {
        policyCurrency: policyCurrency || systemCurrency,
        payableId: id,
      },
    });
    await dispatch({
      type: 'JPCLMOfClaimAssessment/getExchangeRateForInvoice',
      payload: {
        policyCurrency: policyCurrency || systemCurrency,
        payableId: id,
      },
    });
  };

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts} // TODO: 动态下拉
          dictCode={config?.['x-dict']?.dictCode || fieldProps['x-dict'].dictCode}
          dictName={config?.['x-dict']?.dictName || fieldProps['x-dict'].dictName}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          optionShowType="name"
          dictTypeCode="Dropdown_PRD_Product"
          onChange={policyNoChange}
        />
      </Col>
    )
  );
};

const ProductCode = ({ field, config, isShow, layout, form, editable, isDeclined, incidentPayableItem }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      isDeclined={isDeclined}
      incidentPayableItem={incidentPayableItem}
    />
  </Authority>
);

ProductCode.displayName = 'ProductCode';

export default ProductCode;
