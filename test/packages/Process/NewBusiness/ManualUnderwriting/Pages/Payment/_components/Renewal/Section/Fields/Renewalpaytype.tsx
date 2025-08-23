import React from 'react';
import { Col } from 'antd';
import { useDispatch, useSelector } from 'dva';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';

import { useGetRenewalPaytypeDicts } from '../../../../_hooks';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import { fieldConfig } from './Renewalpaytype.config';
export { fieldConfig } from './Renewalpaytype.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const dispatch = useDispatch();
  const { currencyCode } = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) =>
      modelNamespace.modalData?.processData?.planInfoData || { currencyCode: '' }
  );
  const { renewalPayType: originRenewalPayType } = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) =>
      modelNamespace.processData?.planInfoData || { currencyCode: '' }
  );
  const fieldProps: any = fieldConfig['field-props'];

  const policyPayMode = form.getFieldValue('policyPayMode');
  const renewalPayType = form.getFieldValue('renewalPayType');
  const renewalpaytypeDicts = useGetRenewalPaytypeDicts({
    policyPayMode,
    typeCode: config?.['x-dict']?.dictTypeCode || '',
    renewalPayType,
  });

  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={renewalpaytypeDicts}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
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
          getPopupContainer={() => document.body}
          hiddenPrefix
          onChange={(value: string) => {
            // TODO：这里这样做的原因是为了清空校验数据
            if (value !== 'R') {
              dispatch({
                type: `${NAMESPACE}/saveFormData`,
                target: 'saveBankCardInfo',
                payload: {
                  changedFields: {
                    ...form.getFieldsValue(),
                  },
                },
              });
            }
            // 更新 bankCode 下拉框
            if (value === 'D' && originRenewalPayType != "D") {
              dispatch({
                type: `${NAMESPACE}/getBankCodesByRenewalPayTypeAndCurrencyCode`,
                payload: {
                  renewalPayType: value,
                  currencyCode,
                },
              });
            }
          }}
          precision={0}
        />
      </Col>
    )
  );
};

const Renewalpaytype = ({ config, form, editable, layout, isShow }: any) => (
  <Authority>
    <FormItem
      field={fieldConfig?.field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
    />
  </Authority>
);

Renewalpaytype.displayName = 'renewalPayType';

export default Renewalpaytype;
