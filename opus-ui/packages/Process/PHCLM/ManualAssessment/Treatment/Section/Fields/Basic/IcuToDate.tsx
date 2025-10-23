import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  Required,
  Visible,
  Validator,
} from 'basic/components/Form';
import { localFieldConfig } from './IcuToDate.config';

export { localFieldConfig } from './IcuToDate.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  isTreatmentTypeIP,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const isICU = form.getFieldValue('icu');
  const dateOfDischargeValue = form.getFieldValue('dateOfDischarge');
  const icuFromDateValue = form.getFieldValue('icuFromDate');

  const visibleConditions = true;
  const editableConditions = !!isTreatmentTypeIP;
  const requiredConditions = isICU;

  const Rules = {
    toIcuDateEarlierDischargeDate: Validator.toIcuDateEarlierDischargeDate(dateOfDischargeValue),
    toIcuDateLaterFromIcuDate: Validator.toIcuDateLaterFromIcuDate(icuFromDateValue),
  };

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
        />
      </Col>
    )
  );
};

const IcuToDate = ({ field, config, isShow, layout, form, editable, isTreatmentTypeIP }: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      isTreatmentTypeIP={isTreatmentTypeIP}
    />
  </Authority>
);

IcuToDate.displayName = localFieldConfig.field;

export default IcuToDate;
