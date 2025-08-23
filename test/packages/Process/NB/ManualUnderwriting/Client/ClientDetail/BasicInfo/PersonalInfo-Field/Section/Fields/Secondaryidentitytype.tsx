import React from 'react';
import { Col } from 'antd';

import { Authority, Editable, FormItemSelect, Visible, RuleByForm } from 'basic/components/Form';
import { fieldConfig } from './Secondaryidentitytype.config';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
export { fieldConfig } from './Secondaryidentitytype.config';
import useGetSecondaryidentitytypeDicts from 'process/NB/ManualUnderwriting/_hooks/useGetSecondaryidentitytypeDicts';
import useRequiredByNationality from 'process/NB/ManualUnderwriting/_hooks/useRequiredByNationality';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = useGetSecondaryidentitytypeDicts({
    config,
    fieldConfig,
    nationality: form.getFieldValue('nationality'),
  });

  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = useRequiredByNationality({
    nationality: form.getFieldValue('nationality'),
  });
  const visibleConditions = requiredConditions;

  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
  });
  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
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
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Secondaryidentitytype = ({ form, editable, layout, isShow, config }: any) => {
  return (
    <Authority>
      <FormItem
        field={fieldConfig?.field}
        config={config}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
      />
    </Authority>
  );
};

Secondaryidentitytype.displayName = 'SecondaryIdentityType';

export default Secondaryidentitytype;
