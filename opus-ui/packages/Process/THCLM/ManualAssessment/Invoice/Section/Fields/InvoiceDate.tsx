import React from 'react';
import { Col } from 'antd';
import { useSelector } from 'dva';
import lodash from 'lodash';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemDatePicker,
  Validator,
  formUtils,
} from 'basic/components/Form';
import { NAMESPACE } from 'process/THCLM/ManualAssessment/activity.config';
import { localFieldConfig } from './InvoiceDate.config';

export { localFieldConfig } from './InvoiceDate.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const submissionDate = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData?.submissionDate
  );

  const Rules = {
    VLD_000274: Validator.VLD_000274(formUtils.queryValue(submissionDate)),
  };

  const visibleConditions = true;
  const editableConditions = true;
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
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
      </Col>
    )
  );
};

const InvoiceDate = ({ field, config, isShow, layout, form, editable, }: any) => (
  <Authority>
    <FormItem field={field} config={config} isShow={isShow} layout={layout} form={form} editable={editable} />
  </Authority>
);

InvoiceDate.displayName = 'invoiceDate';

export default InvoiceDate;
