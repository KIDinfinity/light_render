import React from 'react';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import { fieldConfig } from './FixedRcdDate.config';

export { fieldConfig } from './FixedRcdDate.config';

const FormItem = ({ isShow, layout, form, editable, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });

  const visibleConditions = RuleByForm(fieldProps['visible-condition'], form);
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = RuleByForm(fieldProps['required-condition'], form);

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
          formName={config.name || fieldConfig.field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const FixedRcdDate = ({ config, form, editable, layout, isShow }: any) => (
  <Authority>
    <FormItem config={config} isShow={isShow} layout={layout} form={form} editable={editable} />
  </Authority>
);

FixedRcdDate.displayName = 'fixedRcdDateFlag';

export default FixedRcdDate;
