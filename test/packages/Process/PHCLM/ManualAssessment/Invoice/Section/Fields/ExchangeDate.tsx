import React from 'react';
import { NAMESPACE } from '../../../activity.config';
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

import { localFieldConfig } from './ExchangeDate.config';

export { localFieldConfig } from './ExchangeDate.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  exchangeDate,
  incidentId,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const hkabRate = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.incidentListMap?.[incidentId]?.hkabRate
  );

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  const Rules = { VLD_000651: Validator.VLD_000651(formUtils.queryValue(hkabRate)) };

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
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          onChange={exchangeDate}
        />
      </Col>
    )
  );
};

const ExchangeDate = ({ field, config,
  isShow,
  layout,
  form,
  editable,
  exchangeDate,
  incidentId,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      exchangeDate={exchangeDate}
      incidentId={incidentId}
    />
  </Authority>
);

ExchangeDate.displayName = 'ExchangeDate';

export default ExchangeDate;
