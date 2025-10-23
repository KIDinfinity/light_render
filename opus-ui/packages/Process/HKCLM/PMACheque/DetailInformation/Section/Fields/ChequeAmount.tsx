import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemCurrency,
  Rule,
  Validator,
} from 'basic/components/Form';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';

import { localFieldConfig } from './ChequeAmount.config';

export { localFieldConfig } from './ChequeAmount.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = config || localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const isAssurance = useSelector(
    ({ processTask }: any) => processTask.getTask?.companyCode === 'Assurance'
  );
  const dispatch = useDispatch()

  const Rules = {
    VLD_000772: !isAssurance && Validator.VLD_000772({
      chequeCategory: form.getFieldValue('chequeCategory'),
    }),
  };

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemCurrency
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label?.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          suffixEditable={true}
          hiddenPrefix={true}
          onSuffixChange={({ currencyCode }) => {
            dispatch({
              type: 'HKCLMOfPMAChequeController/updateBusinessData',
              payload: {
                changedFields: {
                  currency: currencyCode
                }
              },
            })
          }}
          hiddenDropDown={!isAssurance}
          currencies={[{
            currencyCode: 'HKD',
            currencyName: 'HKD'
          }, {
            currencyCode: 'USD',
            currencyName: 'USD'
          }]}
          currencyCode={isAssurance? form.getFieldValue('currency') : 'HKD'}
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
      </Col>
    )
  );
};

const ChequeAmount = ({ field, config, isShow, layout, form, editable, id, NAMESPACE }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={id}
      NAMESPACE={NAMESPACE}
    />
  </Authority>
);

ChequeAmount.displayName = 'ChequeAmount';

export default ChequeAmount;
