import React from 'react';
import lodash from 'lodash';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemNumber,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import { ServiceItem } from 'process/Components/BussinessControls';
import { localFieldConfig } from './OtherInsurerPaidAmount.config';

export { localFieldConfig } from './OtherInsurerPaidAmount.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  NAMESPACE,
  namespaceType,
}: any) => {
  const fieldProps: any = config || localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const { extraConfig, Rules } = ServiceItem.ConfigOtherInsurerPaidAmount({
    namespaceType,
  });

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemNumber
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
          precision={2}
          min={0}
          max={999999999.99}
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          labelType={config.label?.type || fieldProps.label.type}
          {...extraConfig}
        />
      </Col>
    )
  );
};

const OtherInsurerPaidAmount = (props: any) => (
  <Authority>
    <FormItem {...props} />
  </Authority>
);

OtherInsurerPaidAmount.displayName = localFieldConfig.field;

export default OtherInsurerPaidAmount;
