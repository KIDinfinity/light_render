import React from 'react';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import { Col } from 'antd';

import {
  Authority,
  Editable,
  FormItemDatePicker,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import { fieldConfig } from './Ctfexpirydate.config';

export { fieldConfig } from './Ctfexpirydate.config';

const FormItem = ({ isShow, layout, form, editable, field, handleFocus, config,id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const visibleConditions = RuleByForm(fieldProps['visible-condition'], form, '');
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id
    });

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemDatePicker
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={
            config?.label?.dictTypeCode || fieldProps.label.dictTypeCode
          }
          required={requiredByRole}
          allowFreeSelect
          hiddenPrefix
          precision={0}
          onFocus={() => {
            const value = form.getFieldValue(field);
            handleFocus({ value, field });
          }}
        />
      </Col>
    )
  );
};

const Ctfexpirydate = ({ form, editable, layout, isShow, handleFocus, config }: any) => {
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
      />
    </Authority>
  );
};

Ctfexpirydate.displayName = 'ctfExpireDate';

export default Ctfexpirydate;
