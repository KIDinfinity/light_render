import React from 'react';
import { Col } from 'antd';

import { Authority, Editable, Visible, RuleByForm, FormItemSelect } from 'basic/components/Form';

import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import { fieldConfig } from './Customerrole.config';
import { useGetCustomerRoleDicts } from 'opus/NewBusiness/ManualUnderwriting/_hooks';
export { fieldConfig } from './Customerrole.config';
import useAutoLoadCustomerRoleDict from '../../../_hooks/useAutoLoadCustomerRoleDict';

const FormItem = ({ isShow, layout, form, editable, field, config, id, readOnly }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id,
  });
  const customerRoleDicts = useGetCustomerRoleDicts({ id, readOnly });
  useAutoLoadCustomerRoleDict(form.getFieldValue('customerRole'), 'Dropdown_CLM_CustomerRole');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={customerRoleDicts}
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
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          hiddenPrefix
          precision={0}
          mode="multiple"
          memoSelect={false}
        />
      </Col>
    )
  );
};

const Customerrole = ({ config, form, editable, layout, isShow, roleDicts, id, readOnly }: any) => (
  <Authority>
    <FormItem
      field={fieldConfig.field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      roleDicts={roleDicts}
      id={id}
      readOnly={readOnly}
    />
  </Authority>
);

Customerrole.displayName = 'customerRole';

export default Customerrole;
