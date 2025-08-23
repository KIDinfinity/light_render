import React, { useMemo } from 'react';
import { Col } from 'antd';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { Authority, Visible, Editable, Required, FormItemSelect } from 'basic/components/Form';
import { checkPayableList } from 'claimBasicProduct/pages/validators';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'ServiceItem.Payable.Add',
  field: 'benefitItemCode',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-claim-assessment.label.benefit-item',
    },
    'x-dict': { dictCode: 'benefitItemCode', dictName: 'benefitItemName' },
    'x-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 7,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 7,
      },
    },
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
  curServicePayableList,
  serviceItemPayableDetail,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;
  const listPolicy = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.listPolicy
  );

  const policyNo = form.getFieldValue('policyNo');
  const coreProductCode = form.getFieldValue('productCode');
  const benefitTypeCode = form.getFieldValue('benefitTypeCode');

  const existCodes = lodash
    .filter(curServicePayableList, { policyNo, productCode: coreProductCode, benefitTypeCode })
    .map((item) => item.benefitItemCode);

  const dists = useMemo(() => {
    return lodash
      .chain(listPolicy)
      .filter({ policyNo, coreProductCode, benefitTypeCode })

      .value();
  }, [listPolicy, policyNo, coreProductCode, benefitTypeCode]);

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dists}
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
          rules={[
            {
              validator: (rule: any, value: any, callback: Function) =>
                checkPayableList(
                  rule,
                  value,
                  callback,
                  curServicePayableList,
                  serviceItemPayableDetail,
                  'serviceItemId'
                ),
            },
          ]}
          dictTypeCode="Dropdown_PRD_BenefitItem"
          existCodes={existCodes}
        />
      </Col>
    )
  );
};

const BenefitItemCode = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
  curServicePayableList,
  serviceItemPayableDetail,
}: any) => {
  return (
    <Authority>
      <FormItem
        field={field}
        config={config}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        curServicePayableList={curServicePayableList}
        serviceItemPayableDetail={serviceItemPayableDetail}
      />
    </Authority>
  );
};

BenefitItemCode.displayName = 'BenefitItemCode';

export default BenefitItemCode;
