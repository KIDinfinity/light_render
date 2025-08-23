import React from 'react';
import { useSelector } from 'dva';
import { Col } from 'antd';
import lodash from 'lodash';
import { Authority, Editable, FormItemInput, Required, Rule, Visible } from 'basic/components/Form';
import _hook from '../_hooks/PolicyIdHook';
import { localFieldConfig } from './PolicyId.config';

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config, NAMESPACE }: any) => {
  const fieldProps: any = config || localFieldConfig['field-props'];

  const isRegisterMcs = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isRegisterMcs
  );

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = !isRegisterMcs;
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const extraProps = _hook({ NAMESPACE, form });
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
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label?.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          transform={(val: string) => lodash.toUpper(val)}
          {...extraProps}
        />
      </Col>
    )
  );
};

const PolicyId = ({ field, config, isShow, layout, form, editable, NAMESPACE, id }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      NAMESPACE={NAMESPACE}
      id={id}
    />
  </Authority>
);

PolicyId.displayName = localFieldConfig.field;

export default PolicyId;
