import React from 'react';
import { Col } from 'antd';

import {
  Authority,
  Editable,
  FormItemInput,
  Visible,
  RuleByForm,
  Required,
} from 'basic/components/Form';

import { fieldConfig } from './AdditionalReason.config';
export { fieldConfig } from './AdditionalReason.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id, crtItemId }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = RuleByForm(fieldProps['visible-condition'], form);
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = RuleByForm(fieldProps['required-condition'], form);

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            (config?.required || fieldProps?.required) === Required.Conditions
              ? requiredConditions
              : (config?.required || fieldProps.required) === Required.Yes
          }
          hiddenPrefix
          precision={0}
          placeholder=""
        />
      </Col>
    )
  );
};

const AdditionalReason = ({ form, editable, layout, isShow, config, id, crtItemId }: any) => {
  return (
    <Authority>
      <FormItem
        field={fieldConfig?.field}
        config={config}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        id={id}
        crtItemId={crtItemId}
      />
    </Authority>
  );
};

AdditionalReason.displayName = 'additionalReason';

export default AdditionalReason;
