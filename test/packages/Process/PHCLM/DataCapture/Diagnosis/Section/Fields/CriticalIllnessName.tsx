import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  Required,
  Visible,
  FormItemSelect,
} from 'basic/components/Form';
import { localFieldConfig } from './CriticalIllnessName.config';
import { useSelector } from 'dva';

export { localFieldConfig } from './CriticalIllnessName.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  isCINameRequired,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !!isCINameRequired;
  const requiredConditions = isCINameRequired;
  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
        config['x-dict']?.dictTypeCode || localFieldConfig['field-props']['x-dict']?.dictTypeCode
      ]
  );
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          mode="multiple"
          multipleString
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
        {/* <FormItemInput
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
          maxLength={config?.maxLength || fieldProps.maxLength}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
        /> */}
      </Col>
    )
  );
};

const CriticalIllnessName = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
  isCINameRequired,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      isCINameRequired={isCINameRequired}
    />
  </Authority>
);

CriticalIllnessName.displayName = localFieldConfig.field;

export default CriticalIllnessName;
