import React from 'react';
import { Col } from 'antd';
import { Authority, Visible, Editable, Required, FormItemSelect } from 'basic/components/Form';

import { localFieldConfig } from './PayableDays.config';

export { localFieldConfig } from './PayableDays.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  const dicts = [
    {
      dictCode: 1,
      dictName: '1',
    },
    {
      dictCode: 0,
      dictName: '0',
    },
  ];

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
          labelId={config.label?.dictCode || localFieldConfig['field-props'].label.dictCode}
          labelTypeCode={
            config.label?.dictTypeCode || localFieldConfig['field-props'].label.dictTypeCode
          }
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          labelType="inline"
        />
      </Col>
    )
  );
};

const TreamentPayableDays = ({ field, config, isShow, layout, form, editable }: any) => (
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

TreamentPayableDays.displayName = 'PayableDays';

export default TreamentPayableDays;
