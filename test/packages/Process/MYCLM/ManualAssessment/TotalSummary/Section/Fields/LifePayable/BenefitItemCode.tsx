import React from 'react';
import { NAMESPACE } from '../../../../activity.config';

import { Col } from 'antd';
import { useSelector } from 'dva';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemSelect,
  Rule,
} from 'basic/components/Form';
import { getPolicyForBenefitItemList, getCoverageKey } from 'basic/utils/PolicyUtils';
import { localFieldConfig } from './BenefitItemCode.config';

export { localFieldConfig } from './BenefitItemCode.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const listPolicy = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.listPolicy
  );

  const policyList = getPolicyForBenefitItemList({
    listPolicy,
    policyNo: form.getFieldValue('policyNo'),
    coreProductCode: form.getFieldValue('productCode'),
    benefitTypeCode: form.getFieldValue('benefitTypeCode'),
    coverageKey: getCoverageKey({ NAMESPACE, payableId: form.getFieldValue('payableId') }),
  });

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={policyList} // TODO: 动态下拉
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
          optionShowType="both"
          labelType="inline"
        />
      </Col>
    )
  );
};

const BenefitItemCode = ({ field, config, isShow, layout, form, editable }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
    />
  </Authority>
);

BenefitItemCode.displayName = localFieldConfig.field;

export default BenefitItemCode;
