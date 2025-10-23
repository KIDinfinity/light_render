import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemDatePicker,
  Rule,
} from 'basic/components/Form';
import { useSelector } from 'dva';
import { NAMESPACE } from '../../../activity.config';
import { localFieldConfig } from './InvoiceDate.config';
import { useGetInputLimitDate } from 'process/PHCLM/_hooks';
export { localFieldConfig } from './InvoiceDate.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const allowFreeSelect = useGetInputLimitDate();
  const fieldProps: any = localFieldConfig['field-props'];

  const isRegisterMcs = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isRegisterMcs
  );

  const visibleConditions = true;
  const editableConditions = Rule(fieldProps['editable-condition'], form, '') || !isRegisterMcs;
  const requiredConditions = true;

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
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          format={config.dateFormat || fieldProps.dateFormat}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          labelType="inline"
          allowFreeSelect={allowFreeSelect}
        />
      </Col>
    )
  );
};

const InvoiceDate = ({ field, config, isShow, layout, form, editable }: any) => (
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

InvoiceDate.displayName = 'invoiceDate';

export default InvoiceDate;
