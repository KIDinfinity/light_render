import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemInput, Required, Visible, Rule } from 'basic/components/Form';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import { localFieldConfig } from './ZipCode.config';

export { localFieldConfig } from './ZipCode.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  recoverObj,
  OnRecover,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const otherParams = tenant.region({
    [Region.PH]: {
      recoverValue: recoverObj[localFieldConfig.field],
      OnRecover,
    },
    [Region.MY]: {},
    notMatch: {},
  });
  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(
    config['required-condition'] || fieldProps['required-condition'],
    form,
    ''
  );

  const Rules = {};

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          allowClear
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
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          {...otherParams}
        />
      </Col>
    )
  );
};

const ZipCode = ({
  isShow,
  layout,
  form,
  editable,
  recoverObj,
  OnRecover,
  transactionId,
  config,
}: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      recoverObj={recoverObj}
      OnRecover={OnRecover}
      transactionId={transactionId}
      field={localFieldConfig.field}
      config={config}
    />
  </Authority>
);

ZipCode.displayName = localFieldConfig.field;

export default ZipCode;
