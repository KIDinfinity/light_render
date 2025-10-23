import React from 'react';
import { Col } from 'antd';

import {
  Authority,
  Editable,
  FormItemDatePicker,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import { fieldConfig } from './Bankruptcydate.config';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';

export { fieldConfig } from './Bankruptcydate.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const visibleConditions = true;
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = RuleByForm(fieldProps['required-condition'], form, '');
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
        />
      </Col>
    )
  );
};

const Bankruptcydate = ({ form, editable, layout, isShow, config }: any) => {
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

Bankruptcydate.displayName = 'bankruptcyDate';

export default Bankruptcydate;
