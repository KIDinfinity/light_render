import React from 'react';
import { useSelector } from 'dva';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Visible,
  Rule,
  Required,
} from 'basic/components/Form';
import { localFieldConfig } from './Smss.config';

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config = {} }: any) => {
  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
      config['x-dict']?.dictTypeCode || localFieldConfig['field-props']['x-dict']?.dictTypeCode
      ]
  );

  const fieldProps: any = config || localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps?.['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps?.['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps?.['required-condition'], form, '');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          disabled={
            !editable ||
            (config.editable === Editable.Conditions
              ? !editableConditions
              : config?.editable === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label?.dictTypeCode}
          required={
            config.required === Required.Conditions || fieldProps.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
        />
      </Col>
    )
  );
};

const SMS = ({ field, config, form, editable, layout, isShow, id, NAMESPACE }: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={id}
      NAMESPACE={NAMESPACE}
    />
  </Authority>
);

SMS.displayName = localFieldConfig.field;

export default SMS;
