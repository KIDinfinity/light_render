import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemInput, Required, Visible, Rule } from 'basic/components/Form';
import { fieldConfig } from './Fecriskmsg.config';
export { fieldConfig } from './Fecriskmsg.config';
import useShowNSS from 'process/NewBusiness/ManualUnderwriting/Pages/Client/_hooks/useShowNSS';

const FormItem = ({ isShow, layout, form, editable, field, config, clientId }: any) => {
  console.log('🚀 ~ FormItem ~ config:', config);
  const fieldProps: any = fieldConfig['field-props'];
  const showNss = useShowNSS(clientId);

  const visibleConditions = showNss;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          disabled={
            !editable ||
            ((config?.['field-props']?.visible || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.['field-props']?.visible || fieldProps.editable) === Editable.No)
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

const Fecriskmsg = ({ field, form, editable, layout, isShow, config, id }: any) => (
  <Authority>
    <FormItem
      field={field}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      config={config}
      clientId={id}
    />
  </Authority>
);

Fecriskmsg.displayName = 'fecRiskMsg';

export default Fecriskmsg;
