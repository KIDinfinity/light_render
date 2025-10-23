import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemDatePicker, Required, Visible } from 'basic/components/Form';

import { localFieldConfig } from './NotificationOfLossDate.config';

export { localFieldConfig } from './NotificationOfLossDate.config';

const FormItem = ({ isShow, layout, form, editable, field, config, isTreatmentTypeIP }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemDatePicker
          form={form}
          required={
            config?.required === Required.Conditions
              ? isTreatmentTypeIP
              : config?.required === Required.Yes
          }
          disabled={
            !editable ||
            (config?.editable === Editable.Conditions
              ? !isTreatmentTypeIP
              : config?.editable === Editable.No)
          }
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          formName={field || fieldProps.field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          allowFreeSelect
        />
      </Col>
    )
  );
};

const NotificationOfLossDate = ({
  field,
  config,
  form,
  editable,
  insured,
  isTreatmentTypeIP,
  layout,
  isShow,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      isTreatmentTypeIP={isTreatmentTypeIP}
      insured={insured}
    />
  </Authority>
);

NotificationOfLossDate.displayName = 'notificationOfLossDate';

export default NotificationOfLossDate;
