import React from 'react';
import { Col } from 'antd';

import {
  Authority,
  Editable,
  FormItemDatePicker,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import { fieldConfig } from './Secondaryidentityexpirydate.config';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
export { fieldConfig } from './Secondaryidentityexpirydate.config';
import useRequiredByNationality from 'process/NB/ManualUnderwriting/_hooks/useRequiredByNationality';
import useGetSecondaryExpirydateShow from 'process/NB/ManualUnderwriting/_hooks/useGetSecondaryExpirydateShow';
import useGetSecondaryExpirydateEditable from 'process/NB/ManualUnderwriting/_hooks/useGetSecondaryExpirydateEditable';
const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = useRequiredByNationality({
    nationality: form.getFieldValue('nationality'),
  });
  const visibleConditions = requiredConditions;

  const expiryDateShow = useGetSecondaryExpirydateShow({
    SecondaryIdentityType: form.getFieldValue('SecondaryIdentityType'),
  });
  const expiryDateeditable = useGetSecondaryExpirydateEditable({
    SecondaryIdentityType: form.getFieldValue('SecondaryIdentityType'),
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
          required={requiredByRole || expiryDateeditable}
          allowFreeSelect
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Secondaryidentityexpirydate = ({ form, editable, layout, isShow, config }: any) => {
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

Secondaryidentityexpirydate.displayName = 'SecondaryIdentityExpiryDate';

export default Secondaryidentityexpirydate;
