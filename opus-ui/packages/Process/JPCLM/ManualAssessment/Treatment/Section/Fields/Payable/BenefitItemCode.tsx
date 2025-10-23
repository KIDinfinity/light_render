import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemSelect,
  Validator,
} from 'basic/components/Form';
import lodash from 'lodash';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Treatment.Payable',
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
    'x-rules': ['checkPayableList'],
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
  policyNoList,
  curTreatmentPayableList,
  treatmentPayableItem,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  const Rules = {
    checkPayableList: Validator.checkPayableList(
      curTreatmentPayableList,
      treatmentPayableItem,
      'treatmentId'
    ),
  };

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={policyNoList} // TODO: 动态下拉
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
          //@ts-ignore
          dictTypeCode="Dropdown_PRD_BenefitItem"
        />
      </Col>
    )
  );
};

const BenefitItemCode = ({ field, config,
  isShow,
  layout,
  form,
  editable,
  policyNoList,
  curTreatmentPayableList,
  treatmentPayableItem,
  calculateByPolicyYear,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      policyNoList={policyNoList}
      curTreatmentPayableList={curTreatmentPayableList}
      treatmentPayableItem={treatmentPayableItem}
      calculateByPolicyYear={calculateByPolicyYear}
    />
  </Authority>
);

BenefitItemCode.displayName = 'BenefitItemCode';

export default BenefitItemCode;
