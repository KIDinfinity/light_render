import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemInput, Required, Visible, Rule } from 'basic/components/Form';
import { fieldConfig } from './Fecriskmsg.config';
export { fieldConfig } from './Fecriskmsg.config';
import useShowNSS from 'process/NewBusiness/ManualUnderwriting/Pages/Client/_hooks/useShowNSS';
import { tenant, Region } from '@/components/Tenant';

const FormItem = ({ isShow, layout, form, editable, field, config, clientId }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const showNss = useShowNSS(clientId) || tenant.region() === Region.KH;

  const visibleConditions = showNss;
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
