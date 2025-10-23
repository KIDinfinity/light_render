import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemNumber,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import { localFieldConfig } from './SubAcBalance.config';

export { localFieldConfig } from './SubAcBalance.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemNumber
          allowClear
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config?.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          labelType={config.label?.type || fieldProps.label.type}
          placeholder=""
          pattern={/.*/}
          isInline
          precision={2}
          bordered
        />
      </Col>
    )
  );
};

const SubAcBalance = ({ isShow, layout, form, editable, config }: any) => (
  <Authority>
    <FormItem
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      field={localFieldConfig.field}
    />
  </Authority>
);;

SubAcBalance.displayName = localFieldConfig.field;

export default SubAcBalance;
