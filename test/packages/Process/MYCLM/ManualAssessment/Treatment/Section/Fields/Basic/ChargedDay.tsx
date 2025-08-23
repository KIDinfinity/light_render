import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemNumber,
  Required,
  Visible,
  Validator,
} from 'basic/components/Form';
import useCalcChargedDateMaxValue from 'process/MYCLM/ManualAssessment/_hooks/useCalcChargedDateMaxValue';
import { localFieldConfig } from './ChargedDay.config';

export { localFieldConfig } from './ChargedDay.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, treatmentId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const visibleConditions = true;
  const editableConditions = false;
  const requiredConditions = true;

  const max: number = useCalcChargedDateMaxValue({
    treatmentId,
  });

  const Rules = {
    VLD_000843: Validator.VLD_000843(max),
  };
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
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          min={0}
          precision={0}
          rules={lodash.compact(
            (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
      </Col>
    )
  );
};

const ChargedDay = ({
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

ChargedDay.displayName = localFieldConfig.field;

export default ChargedDay;
