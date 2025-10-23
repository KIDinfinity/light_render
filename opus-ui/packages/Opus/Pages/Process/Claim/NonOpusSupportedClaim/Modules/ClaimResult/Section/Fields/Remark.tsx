import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  Required,
  Visible,
  Rule,
  FormItemTextArea,
} from 'basic/components/Form';
import { localFieldConfig } from './Remark.config';
import styles from './Remark.less'

export { localFieldConfig } from './Remark.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemTextArea
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
          labelType={config.label?.type || fieldProps.label.type}
          placeholder=""
          className={styles.textBox}
          row={8}
        />
      </Col>
    )
  );
};

const Remark = ({ isShow, layout, form, editable, config }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      field={localFieldConfig?.field}
      config={config}
    />
  </Authority>
);

Remark.displayName = localFieldConfig.field;

export default Remark;
