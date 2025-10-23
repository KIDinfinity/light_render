import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Required,
  Editable,
  FormItemNumber,
} from 'basic/components/Form';
import { fnPrecisionFormatNegative } from '@/utils/precisionUtils';
import { localFieldConfig } from './PayableAmount.config';

export { localFieldConfig } from './PayableAmount.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, originAmount }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = false;
  const requiredConditions = false;

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
          labelType="inline"
          onHover={true}
          recoverValue={originAmount}
          min={-Number.MAX_VALUE}
          pattern={
            /^(-\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)|(\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)$/g
          }
          formatter={fnPrecisionFormatNegative}
          bordered
        />
      </Col>
    )
  );
};

const PayableAmount = ({ field, config, isShow, layout, form, editable, originAmount }: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      originAmount={originAmount}
    />
  </Authority>
);

PayableAmount.displayName = 'payableAmount';

export default PayableAmount;
