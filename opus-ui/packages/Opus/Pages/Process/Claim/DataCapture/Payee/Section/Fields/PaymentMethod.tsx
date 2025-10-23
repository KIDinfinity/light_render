import React from 'react';
import { useDispatch } from 'dva';
import { Col } from 'antd';
import lodash from 'lodash';
import { Authority, Editable, FormItemSelect, Validator, Visible, Required } from 'basic/components/Form';
import { PaymentMethod as PaymentMethodEnum } from 'claim/pages/Enum';
import { getDrowDownList } from '@/utils/dictFormatMessage';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'payee',
  field: 'paymentMethod',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.payment-method',
    },
    required: 'Y',
    visible: 'Y',
    'x-dict': {
      dictTypeCode: 'Dropdown_CLM_PaymentMethod',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
    'x-rules': ['VLD_000604'],
  },
};

export { localFieldConfig };

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config = {},
  payeeId,
  premiumPaymentMethod,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dispatch = useDispatch();

  const dicts = getDrowDownList(config['x-dict']?.dictTypeCode || localFieldConfig?.['field-props']?.['x-dict']?.dictTypeCode);

  const onSelect = async (value: any) => {
    const isPremiumAccount = value === PaymentMethodEnum.PremiumAccount;
    if (isPremiumAccount) {
      await dispatch({
        type: 'opusClaimDataCapture/searchName',
        payload: {
          payeeId,
          paymentMethod: value,
        },
      });
    }
  };

  const Rules = {
    VLD_000604: Validator.VLD_000604(premiumPaymentMethod),
  };

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          onSelect={onSelect}
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label?.dictTypeCode}
          maxLength={config?.maxLength}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
      </Col>
    )
  );
};

const PaymentMethod = ({
  field,
  config,
  form,
  editable,
  layout,
  isShow,
  payeeId,
  insured,
  premiumPaymentMethod,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      insured={insured}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      payeeId={payeeId}
      premiumPaymentMethod={premiumPaymentMethod}
    />
  </Authority>
);

PaymentMethod.displayName = 'PaymentMethod';

export default PaymentMethod;
