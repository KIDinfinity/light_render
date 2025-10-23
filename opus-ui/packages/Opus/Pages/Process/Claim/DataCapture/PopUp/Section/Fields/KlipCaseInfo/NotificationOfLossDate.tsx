import React from 'react';
import { Col } from 'antd';
import { useSelector } from 'dva';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import { NAMESPACE } from 'opus/Pages/Process/Claim/DataCapture/activity.config';

import { localFieldConfig } from './NotificationOfLossDate.config';

export { localFieldConfig } from './NotificationOfLossDate.config';

const FormItem = ({ isShow, layout, form, editable, config, field }: any) => {
  const submissionDate = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => {
    return modelnamepsace.claimProcessData?.submissionDate;
  });

  const fieldProps: any = localFieldConfig['field-props'];
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemDatePicker
          allowClear={false}
          disabled={(config.editable || fieldProps.editable) === Editable.No || !editable}
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={(config.required || fieldProps.required) === Required.Yes}
        />
      </Col>
    )
  );
};

const NotificationOfLossDate = ({ field, config, isShow, layout, form, editable }: any) => (
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

NotificationOfLossDate.displayName = 'notificationOfLossDate';

export default NotificationOfLossDate;
