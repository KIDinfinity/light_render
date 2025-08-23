import React, { useCallback, useEffect } from 'react';
import { Col } from 'antd';
import moment from 'moment';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from '../../../../activity.config';
import { localFieldConfig } from './MoniesDate.config';

export { localFieldConfig } from './MoniesDate.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dispatch = useDispatch();

  const visibleConditions = Rule(
    config['visible-condition'] || fieldProps['visible-condition'],
    form,
    ''
  );
  const editableConditions = Rule(
    config['editable-condition'] || fieldProps['editable-condition'],
    form,
    ''
  );
  const requiredConditions = Rule(
    config['required-condition'] || fieldProps['required-condition'],
    form,
    ''
  );

  const sourceSystem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.sourceSystem
  );

  const backDateFlag = form.getFieldValue('backDateFlag');
  useEffect(() => {
    if (!editable) {
      return;
    }
    if (backDateFlag !== 'Y') {
      dispatch({
        type: `${NAMESPACE}/transactionInfoUpdate`,
        payload: {
          changedFields: {
            [config.name || field]: '',
          },
          transactionId: id,
        },
      });
    }
  }, [backDateFlag, editable]);

  const Rules = {};

  const hanvleDisabledDate = useCallback(
    (date: any) => {
      return sourceSystem === 'IL'
        ? !moment(date).isBetween(moment().format(), moment().add(1, 'month').format(), 'day', '[]')
        : !moment(date).isBetween(
            moment().subtract(1, 'month').format(),
            moment().add(1, 'month').format(),
            'day',
            '[]'
          );
    },
    [sourceSystem]
  );

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
            (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          disabledDate={hanvleDisabledDate}
        />
      </Col>
    )
  );
};

const EffectiveDate = ({ isShow, layout, form, editable, transactionId, config }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={transactionId}
      config={config}
      field={localFieldConfig.field}
    />
  </Authority>
);

EffectiveDate.displayName = localFieldConfig.field;

export default EffectiveDate;
