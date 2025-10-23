import React from 'react';
import { Col } from 'antd';
import { Authority, Visible, Editable, Required, FormItemSelect } from 'basic/components/Form';
import { useSelector } from 'dva';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import { localFieldConfig } from './MainProductCode.config';

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  const listPolicy = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.listPolicy
  );

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={listPolicy} // TODO: 动态下拉
          dictCode="coreProductCode"
          dictName="coreProductName"
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
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
        />
      </Col>
    )
  );
};

const MainProductCode = ({ field, config, isShow, layout, form, editable }: any) => (
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

MainProductCode.displayName = localFieldConfig.field;

export default MainProductCode;
