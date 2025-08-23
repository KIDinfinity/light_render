import React from 'react';
import { Col } from 'antd';

import { Authority, Visible, FormItemInput, RuleByForm } from 'basic/components/Form';
import { fieldConfig } from './Contactno.config';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
import useGetEditableByRole from 'process/NB/ManualUnderwriting/_hooks/useGetEditableByRole';

export { fieldConfig } from './Contactno.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  handleChange,
  isLast,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  // const visibleConditions = RuleByForm(fieldProps['visible-condition'], form);
  const visibleConditions = !isLast || RuleByForm(fieldProps['visible-condition'], form, '');
  const editableConditions = true;
  const editableByRole = useGetEditableByRole({
    editableConditions,
    config,
    localConfig: fieldConfig,
  });

  const requiredByRole = useGetRequiredByRole({
    requiredConditions: false,
    config,
    localConfig: fieldConfig,
  });
  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          disabled={!editable || !editableByRole}
          form={form}
          // prefix={prefix}
          formName={config.name || field}
          labelId={config?.['field-props']?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={
            config?.['field-props']?.label?.dictTypeCode || fieldProps.label.dictTypeCode
          }
          required={requiredByRole}
          labelType="inline"
          precision={0}
          placeholder=""
          // onFocus={() => {
          //   const value = form.getFieldValue(field);
          //   handleFocus({ value, field });
          // }}
          onChange={handleChange}
        />
      </Col>
    )
  );
};

const Contactno = ({ form, editable, layout, isShow, id, config, handleChange, isLast }: any) => {
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
        isLast={isLast}
      />
    </Authority>
  );
};

Contactno.displayName = 'contactNo';

export default Contactno;
