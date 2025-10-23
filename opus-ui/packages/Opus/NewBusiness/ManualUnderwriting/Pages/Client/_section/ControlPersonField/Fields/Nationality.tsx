import React from 'react';
import { Col } from 'antd';

import { Authority, Editable, FormItemSelect, RuleByForm, Visible } from 'basic/components/Form';

import useGetCountryDropdown from '../../../_hooks/useGetCountryDropdown';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';

import { fieldConfig } from './Nationality.config';
export { fieldConfig } from './Nationality.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id, readOnly }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const dicts = useGetCountryDropdown();
  const visibleConditions = RuleByForm(config?.['visible-condition'], form);

  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
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
        <FormItemSelect
          dicts={dicts}
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
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Nationality = ({ form, editable, layout, isShow, config, id, readOnly }: any) => {
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
        readOnly={readOnly}
      />
    </Authority>
  );
};

Nationality.displayName = 'nationality';

export default Nationality;
