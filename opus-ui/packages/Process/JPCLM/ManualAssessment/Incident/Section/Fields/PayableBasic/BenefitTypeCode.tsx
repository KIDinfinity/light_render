import React, { useMemo } from 'react';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemSelect,
  Validator,
  formUtils,
} from 'basic/components/Form';
import lodash from 'lodash';
import { useDispatch, useSelector } from 'dva';
import { tenant } from '@/components/Tenant';


const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Incident.Payable.Basic',
  field: 'benefitTypeCode',
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
      dictCode: 'app.navigator.task-detail-of-claim-assessment.label.benefit-type',
    },
    'x-dict': { dictCode: 'benefitTypeCode', dictName: 'benefitTypeName' },
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 11,
      },
    },
    'no-treatment-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 11,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 11,
      },
    },
    'x-rules': ['checkClaimPayableListByTypeCode'],
  },
};

export { localFieldConfig };

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  incidentPayableItem,
  curIncidentPayableList,
  isDeclined,
  isNA,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dispatch = useDispatch();

  const listPolicy = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.listPolicy
  );

  const policyNo = form.getFieldValue('policyNo');
  const productCode = form.getFieldValue('productCode');
  const dicts = useMemo(() => {
    const policyGrouped = lodash.groupBy(listPolicy, 'policyNo');
    const filteredList = policyGrouped[policyNo];
    const productGrouped = lodash.groupBy(filteredList, 'coreProductCode');
    const productFilteredList = productGrouped[productCode];
    const benefitTypeList = lodash.uniqBy(productFilteredList, 'benefitTypeCode');

    return benefitTypeList;
  }, [listPolicy, policyNo, productCode]);

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
  const benefitTypeCode = form.getFieldValue('benefitTypeCode');
  const calculateByPolicyYear = form.getFieldValue('calculateByPolicyYear');

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = !isNA && !isDeclined && !benefitTypeCode; //Rule(fieldProps['required-condition'], form, '');

  const Rules = {
    checkClaimPayableListByTypeCode: Validator.checkClaimPayableListByTypeCode(
      listPolicy,
      curIncidentPayableList,
      incidentPayableItem,
      policyNo,
      productCode
    ),
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
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          optionShowType="name"
          dictTypeCode="Dropdown_PRD_BenefitType"
        />
      </Col>
    )
  );
};

const BenefitTypeCode = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
  incidentPayableItem,
  curIncidentPayableList,
  isDeclined,
  isNA,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      incidentPayableItem={incidentPayableItem}
      curIncidentPayableList={curIncidentPayableList}
      isDeclined={isDeclined}
      isNA={isNA}
    />
  </Authority>
);

BenefitTypeCode.displayName = 'BenefitTypeCode';

export default BenefitTypeCode;
