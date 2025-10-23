import React from 'react';
import { NAMESPACE } from '../../../../activity.config';

import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemSelect,
} from 'basic/components/Form';
import {
  getPolicyList,
  getPolicyForBenefitItemList,
  getCoverageKey,
} from 'basic/utils/PolicyUtils';
import { checkServicePayableList } from 'claimBasicProduct/pages/validators';
import { localFieldConfig } from './BenefitItemCode.config';

export { localFieldConfig } from './BenefitItemCode.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  curServicePayableList,
  serviceItemPayableItem,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const listPolicy = getPolicyList(NAMESPACE);

  const policyList = getPolicyForBenefitItemList({
    listPolicy,
    policyNo: form.getFieldValue('policyNo'),
    coreProductCode: form.getFieldValue('productCode'),
    benefitTypeCode: form.getFieldValue('benefitTypeCode'),
    coverageKey: getCoverageKey({ NAMESPACE, payableId: form.getFieldValue('payableId') }),
  });

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

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
          rules={[
            {
              validator: (rule: any, value: any, callback: Function) =>
                checkServicePayableList(
                  rule,
                  value,
                  callback,
                  curServicePayableList,
                  serviceItemPayableItem
                ),
            },
          ]}
          optionShowType="both"
          labelType="inline"
        />
      </Col>
    )
  );
};

const BenefitItemCode = ({ field, config, isShow, layout, form, editable, }: any) => (
  <Authority>
    <FormItem field={field} config={config} isShow={isShow} layout={layout} form={form} editable={editable} />
  </Authority>
);

BenefitItemCode.displayName = 'BenefitItemCode';

export default BenefitItemCode;
