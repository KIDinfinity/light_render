import React from 'react';
import { NAMESPACE } from '../../../../activity.config';

import { Col } from 'antd';
import lodash from 'lodash';
import { useSelector } from 'dva';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemNumber,
  Rule,
} from 'basic/components/Form';

import { localFieldConfig } from './PayableDays.config';

export { localFieldConfig } from './PayableDays.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, OnRecover }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const listPolicy = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.listPolicy
  );

  const policyNo = form.getFieldValue('policyNo');
  const benefitTypeCode = form.getFieldValue('benefitTypeCode');
  const benefitCategory = form.getFieldValue('benefitCategory');
  const benefitItemCode = form.getFieldValue('benefitItemCode');
  const allowanceType =
    benefitCategory === 'C'
      ? lodash.find(listPolicy, { policyNo, benefitItemCode, benefitTypeCode })?.allowanceType
      : '';

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = lodash.includes(['HA', 'IA'], allowanceType);
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemNumber
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
          recoverValue={form.getFieldValue('systemPayableDays') || 0}
          onHover={true}
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
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      OnRecover={OnRecover}
    />
  </Authority>
);

PayableDays.displayName = 'payableDays';

export default PayableDays;
