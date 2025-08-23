import React from 'react';
import { NAMESPACE } from '../../../activity.config';
import { Col } from 'antd';
import lodash from 'lodash';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemNumber,
} from 'basic/components/Form';
import { getPolicyList, findPolicyItemOnly, getCoverageKey } from 'basic/utils/PolicyUtils';
import { localFieldConfig } from './PayableDays.config';

export { localFieldConfig } from './PayableDays.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, OnRecover }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const listPolicy = getPolicyList(NAMESPACE);

  const policyNo = form.getFieldValue('policyNo');
  const benefitTypeCode = form.getFieldValue('benefitTypeCode');
  const benefitCategory = form.getFieldValue('benefitCategory');
  const benefitItemCode = form.getFieldValue('benefitItemCode');
  const unitType = form.getFieldValue('unitType');
  const allowanceType =
    benefitCategory === eBenefitCategory.Cashless
      ? findPolicyItemOnly({
        listPolicy,
        policyNo,
        benefitItemCode,
        benefitTypeCode,
        coverageKey: getCoverageKey({
          NAMESPACE,
          payableId: form.getFieldValue('benefitTypeCode'),
        }),
      })?.allowanceType
      : '';

  const isShowType =
    lodash.includes([eBenefitCategory.Aipa, eBenefitCategory.Crisis], benefitCategory) &&
    (unitType || 'Days');
  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = lodash.includes(['HA', 'IA'], allowanceType);

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemNumber
          isShowType={isShowType}
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
          labelType="inline"
          precision={0}
          onHover={true}
          placeholder
          recoverValue={form.getFieldValue('systemPayableDays') || 0}
          OnRecover={OnRecover}
          max={config?.max || fieldProps.max}
          min={config?.min || fieldProps.min}
        />
      </Col>
    )
  );
};

const PayableDays = ({ field, config, isShow, layout, form, editable, OnRecover }: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      OnRecover={OnRecover}
    />
  </Authority>
);

PayableDays.displayName = 'payableDays';

export default PayableDays;
