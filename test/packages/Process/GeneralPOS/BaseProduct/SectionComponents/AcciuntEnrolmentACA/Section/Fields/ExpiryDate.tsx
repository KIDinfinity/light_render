import { Col } from 'antd';
import {
  Authority,
  Editable,
  Required,
  Rule,
  Visible,
  FormItemMonthDatePicker,
  Validator,
} from 'basic/components/Form';
import lodash from 'lodash';
import React from 'react';
import moment from 'moment';
import { Region, tenant } from '@/components/Tenant';
import { localFieldConfig } from './ExpiryDate.config';

export { localFieldConfig } from './ExpiryDate.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, transactionId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const visibleConditions = true;
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const Rules = {
    VLD_000994: Validator.VLD_000994(),
  };

  const disabledDate = (current: any) => {
    return tenant.region({
      [Region.PH]: current && current < moment().startOf('month'),
      notMatch: current && current < moment().add(0, 'months').endOf('month'),
    });
  };
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemMonthDatePicker
          getPopupContainer={() => document.querySelector('.AcciuntEnrolmentACA') || document.body}
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
          rules={lodash.compact(
            (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          format="MM/YYYY"
          disabledDate={disabledDate}
          getCalendarContainer={() => document.body}
          type={'month'}
        />
      </Col>
    )
  );
};

const ExpiryDate = ({ isShow, layout, form, editable, transactionId, config }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      transactionId={transactionId}
      field={localFieldConfig.field}
      config={config}
    />
  </Authority>
);

ExpiryDate.displayName = localFieldConfig.field;

export default ExpiryDate;
