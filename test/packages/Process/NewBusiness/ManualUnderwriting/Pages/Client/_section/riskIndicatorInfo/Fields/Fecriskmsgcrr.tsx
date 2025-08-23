import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemInput, Required, Visible, Rule } from 'basic/components/Form';
import { fieldConfig } from './Fecriskmsgcrr.config';

export { fieldConfig } from './Fecriskmsgcrr.config';
import useShowCRR from 'process/NewBusiness/ManualUnderwriting/Pages/Client/_hooks/useShowCRR';

const FormItem = ({ isShow, layout, form, editable, field, config, clientId }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const showCRR = useShowCRR(clientId);

  const visibleConditions = showCRR;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          disabled={
            !editable ||
            ((config?.visible || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.visible || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config?.required || fieldProps.required) === Required.Yes
          }
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Fecriskmsgcrr = ({ field, form, editable, layout, isShow, config, id }: any) => (
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

Fecriskmsgcrr.displayName = 'fecRiskMsgCRR';

export default Fecriskmsgcrr;
