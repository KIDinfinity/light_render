import React from 'react';
import { Col } from 'antd';
import { Authority, FormItemInput, Required, Visible } from 'basic/components/Form';
import { fieldConfig } from './TargetPolicyId.config';
import useGetFieldDisabledByConfig from 'basic/hooks/useGetFieldDisabledByConfig';
import useHandleValidateTransferPolicy from 'process/NB/ManualUnderwriting/_hooks/useHandleValidateTransferPolicy';
export { fieldConfig } from './TargetPolicyId.config';

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
  const handleBlur = useHandleValidateTransferPolicy();
  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
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
          precision={0}
          labelType="inline"
          placeholder={''}
          onBlur={handleBlur}
        />
      </Col>
    )
  );
};

const TargetPolicyId = ({ form, editable, layout, isShow, config, field }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      config={config}
      field={field}
    />
  </Authority>
);

TargetPolicyId.displayName = 'targetPolicyId';

export default TargetPolicyId;
