import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemInput,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import lodash from 'lodash';
import { localFieldConfig } from './PromptPayId.config';

export { localFieldConfig } from './PromptPayId.config';
import styles from '../../index.less';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  isInline = true,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const Rules = {};

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          className={styles.PromptPayId}
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
            (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => {
              return Rules[rule];
            })
          )}
          isInline={isInline}
        />
      </Col>
    )
  );
};

const PromptPayId = ({
  isShow,
  layout,
  form,
  editable,
  transactionId,
  config,
  fundSwitching
}: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      transactionId={transactionId}
      field={localFieldConfig.field}
      config={config}
      fundSwitching={fundSwitching}
    />
  </Authority>
);

PromptPayId.displayName = localFieldConfig.field;

export default PromptPayId;
