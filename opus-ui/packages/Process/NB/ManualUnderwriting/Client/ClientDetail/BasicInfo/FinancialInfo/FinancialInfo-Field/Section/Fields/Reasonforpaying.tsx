import React, { useMemo } from 'react';
import { Col } from 'antd';

import {
  Authority,
  Editable,
  FormItemInput,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import CustomerRole from 'process/NB/Enum/CustomerRole';
import { fieldConfig } from './Reasonforpaying.config';

export { fieldConfig } from './Reasonforpaying.config';

const FormItem = ({ isShow, layout, form, editable, field, config, roles }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = useMemo(() => {
    return (roles || []).includes(CustomerRole.Payor) && !roles.includes(CustomerRole.PolicyOwner);
  }, [roles]);
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = false;

  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
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
          required={
            config?.['field-props']?.required === Required.Conditions
              ? requiredConditions
              : (config?.['field-props']?.required || fieldProps.required) === Required.Yes
          }
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Reasonforpaying = ({ form, editable, layout, isShow, id, config, roles }: any) => {
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
        roles={roles}
      />
    </Authority>
  );
};

Reasonforpaying.displayName = 'reasonForPaying';

export default Reasonforpaying;
