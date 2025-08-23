import React from 'react';
import { Col } from 'antd';
import { useDispatch } from 'dva';
import {
  Authority,
  Editable,
  ElementConfig,
  Required,
  Visible,
  Rule,
  FormItemInput,
} from 'basic/components/Form';
import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { localFieldConfig } from './Town.config';

export { localFieldConfig } from './Town.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, transactionId }: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = localFieldConfig['field-props'];
  const regionCode = tenant.region();

  const visibleConditions = Rule(
    config['visible-condition'] || fieldProps['visible-condition'],
    form,
    ''
  );
  const editableConditions = Rule(
    config['editable-condition'] || fieldProps['editable-condition'],
    form,
    ''
  );
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
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
      </Col>
    )
  );
};

const Town = ({ isShow, layout, form, editable, section, config, transactionId }: any) => (
  <Authority>
    <ElementConfig.Field config={config} section={section} field={localFieldConfig.field}>
      <FormItem
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        transactionId={transactionId}
      />
    </ElementConfig.Field>
  </Authority>
);

Town.displayName = localFieldConfig.field;

export default Town;
