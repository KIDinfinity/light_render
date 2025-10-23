import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Required,
  Editable,
  FormItemNumber,
  Rule,
  Validator,
} from 'basic/components/Form';
import { NAMESPACE } from '../../../../activity.config';
import { useDispatch } from 'dva';
import { fnPrecisionFormatNegative } from '@/utils/precisionUtils';
import lodash from 'lodash';
import { localFieldConfig } from './PayableAmount.config';

export { localFieldConfig } from './PayableAmount.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, originAmount }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const dispatch = useDispatch();
  const SA = form.getFieldValue('calculationAmount');
  const reimbursementPercentage = form.getFieldValue('reimbursementPercentage');
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');
  const Rules = {
    VLD_001016: Validator.VLD_001016(reimbursementPercentage, SA),
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
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          bordered
          labelType="inline"
          onHover
          recoverValue={originAmount}
          OnRecover={() => {
            dispatch({
              type: `${NAMESPACE}/saveLifePayable`,
              payload: {
                changedFields: {
                  payableAmount: form.getFieldValue('systemCalculationAmount'),
                },
                claimPayableId: form.getFieldValue('id'),
              },
            });
          }}
          min={-Number.MAX_VALUE}
          pattern={
            /^(-\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)|(\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)$/g
          }
          formatter={fnPrecisionFormatNegative}
          rules={lodash.compact(
            (config?.['x-rules'] || fieldProps?.['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
      </Col>
    )
  );
};

const PayableAmount = ({ field, config, isShow, layout, form, editable, originAmount }: any) => (
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

PayableAmount.displayName = localFieldConfig.field;

export default PayableAmount;
