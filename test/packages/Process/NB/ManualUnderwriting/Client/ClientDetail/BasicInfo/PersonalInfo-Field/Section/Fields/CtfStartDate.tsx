import React from 'react';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
import useGetCtfStartDate from 'process/NB/ManualUnderwriting/_hooks/useGetCtfStartDate';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import { fieldConfig } from './CtfStartDate.config';

export { fieldConfig } from './CtfStartDate.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const ctfStartDateShow = useGetCtfStartDate({
    identityType: form.getFieldValue('identityType'),
  });
  const fieldProps: any = fieldConfig['field-props'];
  const visibleConditions = RuleByForm(config?.['field-props']?.['visible-condition'], form);
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredByRole = useGetRequiredByRole({
    requiredConditions: ctfStartDateShow,
    config,
    localConfig: fieldConfig,
  });

  return (
    isShow &&
    ctfStartDateShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemDatePicker
          disabled={
            !editable ||
            ((config?.['field-props']?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.['field-props']?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.['field-props']?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={
            config?.['field-props']?.label?.dictTypeCode || fieldProps.label.dictTypeCode
          }
          required={requiredByRole}
          allowFreeSelect
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const CtfStartDate = ({ form, editable, layout, isShow, handleFocus, config, id }: any) => {
  return (
    <Authority>
      <FormItem
        field={fieldConfig?.field}
        config={config}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        handleFocus={handleFocus}
        id={id}
      />
    </Authority>
  );
};

CtfStartDate.displayName = 'ctfStartDate';

export default CtfStartDate;
