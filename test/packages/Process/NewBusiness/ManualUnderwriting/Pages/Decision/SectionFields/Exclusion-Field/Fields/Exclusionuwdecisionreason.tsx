import React from 'react';
import { Col } from 'antd';

import { getDrowDownList } from '@/utils/dictFormatMessage';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import { fieldConfig } from './Exclusionuwdecisionreason.config';

export { fieldConfig } from './Exclusionuwdecisionreason.config';

const FormItem = ({ isShow, layout, form, editable, field, config, labelType }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const dicts = getDrowDownList({ config, fieldProps });

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = true;

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
              ? editableConditions
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
          labelType={labelType}
          hiddenPrefix
          precision={0}
          placeholder=""
        />
      </Col>
    )
  );
};

const Exclusionuwdecisionreason = ({
  field,
  form,
  editable,
  layout,
  isShow,
  config,
  labelType,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      config={config}
      labelType={labelType}
    />
  </Authority>
);

Exclusionuwdecisionreason.displayName = 'exclusionUwDecisionReason';

export default Exclusionuwdecisionreason;
