import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';

import { localFieldConfig } from './CoverageEffectiveDate.config';

export { localFieldConfig } from './CoverageEffectiveDate.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
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
        <FormItemDatePicker
          form={form}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : config?.required === Required.Yes
          }
          disabled={
            !editable ||
            (config?.editable === Editable.Conditions
              ? !editableConditions
              : config?.editable === Editable.No)
          }
          formName={field || localFieldConfig.field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        />
      </Col>
    )
  );
};

const CoverageEffectiveDate = ({ field, config, form, editable, layout, isShow }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
    />
  </Authority>
);

CoverageEffectiveDate.displayName = localFieldConfig.field;

export default CoverageEffectiveDate;
