import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import { fieldConfig } from './Expirydate.config';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
import useGetExpirydateShow from 'process/NB/ManualUnderwriting/_hooks/useGetExpirydateShow';
import useGetExpirydateEditable from 'process/NB/ManualUnderwriting/_hooks/useGetExpirydateEditable';

//import useGetVisibleByCtfType from 'process/NB/ManualUnderwriting/_hooks/useGetVisibleByCtfType';
export { fieldConfig } from './Expirydate.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const visibleConditions = RuleByForm(config?.['field-props']?.['visible-condition'], form);
  const editableConditions = !RuleByForm(config?.['field-props']?.['editable-condition'], form);
  const requiredConditions = useGetExpirydateEditable({
    identityType: form.getFieldValue('identityType'),
  });
  const expiryDateShow = useGetExpirydateShow({
    identityType: form.getFieldValue('identityType'),
  });
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
  });
  return (
    isShow &&
    expiryDateShow &&
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

const Expirydate = ({ form, editable, layout, isShow, config, id }: any) => {
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
      />
    </Authority>
  );
};

Expirydate.displayName = 'expiryDate';

export default Expirydate;
