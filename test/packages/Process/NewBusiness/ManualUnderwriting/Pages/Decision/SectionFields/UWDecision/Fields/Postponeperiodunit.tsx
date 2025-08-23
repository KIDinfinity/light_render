import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  ElementConfig,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Rule,
  RuleByForm,
} from 'basic/components/Form';
import { localConfig as localSectionConfig } from '../index';
import { fieldConfig } from './Postponeperiodunit.config';
export { fieldConfig } from './Postponeperiodunit.config';
import { getDrowDownList } from '@/utils/dictFormatMessage';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts: any = getDrowDownList({ config, fieldProps });

  const visibleConditions = RuleByForm(fieldProps['visible-condition'], form, '');
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
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Postponeperiodunit = ({ form, editable, section, layout, isShow }: any) => (
  <Authority>
    <ElementConfig.Field config={localSectionConfig} section={section} field={fieldConfig.field}>
      <FormItem isShow={isShow} layout={layout} form={form} editable={editable} />
    </ElementConfig.Field>
  </Authority>
);

Postponeperiodunit.displayName = 'postponePeriodUnit';

export default Postponeperiodunit;
