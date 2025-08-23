import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemInput, Visible, RuleByForm } from 'basic/components/Form';
import { fieldConfig } from './Bankcustomerid.config';
import useGetDistributionRequiredByChannel from 'process/NB/ManualUnderwriting/_hooks/useGetDistributionRequiredByChannel';

export { fieldConfig } from './Bankcustomerid.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const required = useGetDistributionRequiredByChannel({ id });

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={required}
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Bankcustomerid = ({ field, config, form, editable, layout, isShow, id }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={id}
    />
  </Authority>
);

Bankcustomerid.displayName = 'bankCustomerId';

export default Bankcustomerid;
