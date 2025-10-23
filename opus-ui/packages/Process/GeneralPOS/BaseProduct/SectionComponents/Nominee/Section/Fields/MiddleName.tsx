import { Col } from 'antd';
import {
  Authority,
  Editable,
  ElementConfig,
  FormItemInput,
  Required,
  Rule,
  Visible,
} from 'basic/components/Form';
import lodash from 'lodash';
import React from 'react';
import { localConfig } from '../index';
import { localFieldConfig } from './MiddleName.config';

export { localFieldConfig } from './MiddleName.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const Rules = {};

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          className="hiddenBorder"
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
          isInline
        />
      </Col>
    )
  );
};

const MiddleName = ({ isShow, layout, form, editable, section }: any) => (
  <Authority>
    <ElementConfig.Field config={localConfig} section={section} field={localFieldConfig.field}>
      <FormItem isShow={isShow} layout={layout} form={form} editable={editable} />
    </ElementConfig.Field>
  </Authority>
);

MiddleName.displayName = localFieldConfig.field;

export default MiddleName;
