import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Rule,
  Visible,
} from 'basic/components/Form';
import lodash from 'lodash';
import React from 'react';
import { localFieldConfig } from './CardType.config';
import { getDrowDownList } from '@/utils/dictFormatMessage';

export { localFieldConfig } from './CardType.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  transactionId,
  isAdd,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '') || isAdd;
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const Rules = {};
  const dicts = getDrowDownList(config['x-dict']?.dictTypeCode || localFieldConfig['field-props']['x-dict'].dictTypeCode)

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
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
          rules={lodash.compact(
            (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          allowClear={false}
        />
      </Col>
    )
  );
};

const CardType = ({
  isShow,
  layout,
  form,
  editable,
  transactionId,
  config,
  isAdd,
  recoverObj,
  OnRecover,
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
      isAdd={isAdd}
      recoverObj={recoverObj}
      OnRecover={OnRecover}
    />
  </Authority>
);

CardType.displayName = localFieldConfig.field;

export default CardType;
