import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Required,
  Editable,
  FormItemNumber,
  Rule,
} from 'basic/components/Form';
import { fnPrecisionFormatNegative } from '@/utils/precisionUtils';
import { localFieldConfig } from './Sumassured.config';

export { localFieldConfig } from './Sumassured.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, originAmount }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

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
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          onHover
          recoverValue={originAmount}
          min={-Number.MAX_VALUE}
          pattern={
            /^(-\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)|(\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)$/g
          }
          formatter={fnPrecisionFormatNegative}
        />
      </Col>
    )
  );
};

const Sumassured = ({ field, config, isShow, layout, form, editable, originAmount }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      originAmount={originAmount}
    />
  </Authority>
);

Sumassured.displayName = localFieldConfig.field;

export default Sumassured;
