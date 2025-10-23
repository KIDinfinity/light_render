import React from 'react';

import { Col } from 'antd';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemNumber,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import { ConfigIcuDays } from '../../_hooks';
import { localFieldConfig } from './IcuDays.config';

export { localFieldConfig } from './IcuDays.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  NAMESPACE,
  treatmentId,
}: any) => {
  const fieldProps: any = config || localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const { Rules } = ConfigIcuDays({ NAMESPACE, form, treatmentId });

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
          labelType={config.label?.type || fieldProps.label.type}
          min={0}
          max={999}
          precision={0}
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
      </Col>
    )
  );
};

const IcuDays = ({ field, config, isShow, layout, form, editable, NAMESPACE, treatmentId }: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      NAMESPACE={NAMESPACE}
      editable={editable}
      treatmentId={treatmentId}
    />
  </Authority>
);

IcuDays.displayName = localFieldConfig.field;

export default IcuDays;
