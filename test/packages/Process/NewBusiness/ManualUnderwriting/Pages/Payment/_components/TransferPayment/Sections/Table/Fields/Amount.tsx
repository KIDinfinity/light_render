import React from 'react';
import { Col } from 'antd';
import { Authority, FormItemNumber, Required, Visible } from 'basic/components/Form';
import { fieldConfig } from './Amount.config';
import useGetFieldDisabledByConfig from 'basic/hooks/useGetFieldDisabledByConfig';

export { fieldConfig } from './Amount.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = true;
  const requiredConditions = true;
  const disabled = useGetFieldDisabledByConfig({
    editable,
    config,
    localConfig: fieldConfig,
    form,
  });

  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemNumber
          disabled={disabled}
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
          precision={2}
          labelType="inline"
          placeholder={''}
        />
      </Col>
    )
  );
};

const Amount = ({ form, editable, layout, isShow, config, field, id }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      config={config}
      field={field}
      id={id}
    />
  </Authority>
);

Amount.displayName = 'amount';

export default Amount;
