import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemInput, Required, Visible } from 'basic/components/Form';
import { RuleByData } from 'basic/components/Form/Rule';
import { useSelector } from 'dva';
import { localFieldConfig } from './OpusBusinessNo.config';
import { NAMESPACE } from '../../../activity.config';

export { localFieldConfig } from './OpusBusinessNo.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace.businessData
  );
  const requiredConditions = RuleByData(config?.['required-condition'], businessData);
  const visibleConditions = true;
  const editableConditions = true;

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
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
        />
      </Col>
    )
  );
};

const OpusBusinessNo = ({ field, config, isShow, layout, form, editable }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
    />
  </Authority>
);

OpusBusinessNo.displayName = localFieldConfig.field;

export default OpusBusinessNo;
