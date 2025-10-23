import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemRadioGroup,
  Required,
  Visible,
  Rule,
  Validator,
} from 'basic/components/Form';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { localFieldConfig } from './PayoutOption.config';

export { localFieldConfig } from './PayoutOption.config';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import className from 'classnames';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  transactionId,
  isInline = true,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const dicts =
    useSelector(
      ({ dictionaryController }: any) =>
        dictionaryController[
          config['x-dict']?.dictTypeCode || localFieldConfig['field-props']['x-dict'].dictTypeCode
        ]
    ) || [];

  const validating = useSelector(
    ({ formCommonController }: any) => formCommonController?.validating
  );

  const txPmBankList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.paymentMethodList?.[0]
        ?.txPmBankList
  );

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const Rules = validating ? { VLD_000857: Validator.VLD_000857(txPmBankList) } : {};

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <div className={className({})}>
        <Col {...layout}>
          <FormItemRadioGroup
            dicts={dicts}
            type="wave"
            disabled={
              !editable ||
              ((config?.editable || fieldProps.editable) === Editable.Conditions
                ? !editableConditions
                : (config?.editable || fieldProps.editable) === Editable.No)
            }
            form={form}
            formName={config?.name || field}
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
            isInline={isInline}
          />
        </Col>
      </div>
    )
  );
};

const PayoutOption = ({
  isShow,
  layout,
  form,
  editable,
  transactionId,
  config,
}: any) => (
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

PayoutOption.displayName = localFieldConfig.field;

export default PayoutOption;
