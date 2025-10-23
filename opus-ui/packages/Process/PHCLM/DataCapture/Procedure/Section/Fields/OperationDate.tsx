import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import { useGetInputLimitDate } from 'process/PHCLM/_hooks';
import { localFieldConfig } from './OperationDate.config';

export { localFieldConfig } from './OperationDate.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const allowFreeSelect = useGetInputLimitDate();
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
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
          formName={config.name || field}
          labelType={config.label?.type || fieldProps.label?.type}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          allowFreeSelect={allowFreeSelect}
        />
      </Col>
    )
  );
};

const OperationDate = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
  incidentId,
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
      incidentId={incidentId}
      treatmentId={treatmentId}
    />
  </Authority>
);

OperationDate.displayName = localFieldConfig.field;

export default OperationDate;
