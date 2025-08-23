import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemDatePicker, Required, Visible } from 'basic/components/Form';
import { TherapiesType } from 'claim/pages/Enum';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { localFieldConfig } from './IcuFromDate.config';

export { localFieldConfig } from './IcuFromDate.config';
import { useGetInputLimitDate } from 'process/MYCLM/_hooks';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const allowFreeSelect = useGetInputLimitDate();
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = form.getFieldValue('therapiesType') === TherapiesType.ICU;
  const editableConditions = false;
  const requiredConditions = false;

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
          labelType="inline"
          allowFreeSelect={allowFreeSelect}
        />
      </Col>
    )
  );
};

const IcuFromDate = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
  isTreatmentTypeIP,
  treatmentId,
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
      treatmentId={treatmentId}
    />
  </Authority>
);

IcuFromDate.displayName = localFieldConfig.field;

export default IcuFromDate;
