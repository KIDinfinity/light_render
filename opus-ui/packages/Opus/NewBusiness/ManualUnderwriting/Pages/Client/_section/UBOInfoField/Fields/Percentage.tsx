import React from 'react';
import { Col } from 'antd';

import { Authority, Visible, Editable, FormItemInput, RuleByForm } from 'basic/components/Form';
import { fieldConfig } from './Percentage.config';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';

export { fieldConfig } from './Percentage.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  handleChange,
  id,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  // const visibleConditions = RuleByForm(fieldProps['visible-condition'], form);
  const visibleConditions = RuleByForm(config?.['visible-condition'], form);
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);

  const requiredByRole = useGetRequiredByRole({
    requiredConditions: false,
    config,
    localConfig: fieldConfig,
    clientId: id,
  });
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
          required={requiredByRole}
          precision={0}
          suffix={'%'}
          onChange={handleChange}
        />
      </Col>
    )
  );
};

const Percentage = ({ form, editable, layout, isShow, id, config, handleChange }: any) => {
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
        handleChange={handleChange}
      />
    </Authority>
  );
};

Percentage.displayName = 'holdingPercentage';

export default Percentage;
