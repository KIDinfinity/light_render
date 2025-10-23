import React from 'react';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import { Col } from 'antd';
import { Authority, Editable, FormItemDatePicker, Visible, Rule } from 'basic/components/Form';
import { fieldConfig } from './Dateofregistration.config';

export { fieldConfig } from './Dateofregistration.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
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
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Dateofregistration = ({ form, editable, layout, isShow, config }: any) => (
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

Dateofregistration.displayName = 'dateOfRegistration';

export default Dateofregistration;
