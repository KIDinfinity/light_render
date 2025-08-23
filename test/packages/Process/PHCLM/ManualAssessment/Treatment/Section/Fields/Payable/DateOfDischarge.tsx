import React from 'react';

import { Col } from 'antd';
import lodash from 'lodash';
import { Authority, Editable, FormItemDatePicker, Required, Visible } from 'basic/components/Form';

import { localFieldConfig } from './DateOfDischarge.config';

export { localFieldConfig } from './DateOfDischarge.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const disableConditions = true;
  const requiredConditions = true;

  const Rules = {};

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemDatePicker
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? disableConditions
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
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          errorTake={1}
        />
      </Col>
    )
  );
};

const DateOfDischarge = ({ field, config, isShow, layout, form, editable, incidentItem }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      incidentItem={incidentItem}
    />
  </Authority>
);

DateOfDischarge.displayName = localFieldConfig.field;

export default DateOfDischarge;
