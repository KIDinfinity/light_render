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
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import { localFieldConfig } from './EffectiveDate.config';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { MessageType } from 'claim/enum/medicalSearchMessageType';
import { formatMessageApi } from '@/utils/dictFormatMessage';
export { localFieldConfig } from './EffectiveDate.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, transactionId }: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = localFieldConfig['field-props'];

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
  const refreshLoading = useSelector(
    ({ loading }: any) => loading.effects[`${NAMESPACE}/refreshEffectiveDate`]
  );
  const disabled =
    !editable ||
    ((config?.editable || fieldProps.editable) === Editable.Conditions
      ? !editableConditions
      : (config?.editable || fieldProps.editable) === Editable.No);

  const needReCalEffective = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.needReCalEffective
  );
  const Rules = {};

  const handleRefresh = (value: string) => {
    const changed = value ? { effectiveDate: value } : {};
    dispatch({
      type: `${NAMESPACE}/refreshEffectiveDate`,
      payload: {
        transactionId,
        type: 'loan',
        ...changed,
      },
    });
  };
  const isHistory = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isHistory);

  const warningMessage = () => {
    const warns = [];
    if (isHistory) {
      return warns;
    }
    if (needReCalEffective) {
      warns.push({
        message: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000835' }),
        messageType: MessageType.Information,
      });
    }
    return warns;
  };

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemDatePicker
          disabled={disabled}
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
          warningMessage={warningMessage()}
          disabledDate={() => false}
          onChange={handleRefresh}
          reloadSpin={refreshLoading}
          reload={() => {
            if (disabled || refreshLoading) {
              return;
            }
            handleRefresh('');
          }}
        />
      </Col>
    )
  );
};

const EffectiveDate = ({ isShow, layout, form, editable, config, transactionId }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      field={localFieldConfig.field}
      config={config}
      transactionId={transactionId}
    />
  </Authority>
);

EffectiveDate.displayName = localFieldConfig.field;

export default EffectiveDate;
