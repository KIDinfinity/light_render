import React from 'react';
import { Col } from 'antd';
import { useDispatch } from 'dva';
import {
  Authority,
  Editable,
  Visible,
  FormItemSelectPlus,
  Rule,
  Required,
} from 'basic/components/Form';
import { SeachCustom } from 'claim/pages/utils/claimUtils';

const seachCustom: any = new SeachCustom();
const { handleBank } = seachCustom;

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'payee',
  field: 'bankCode',
  'field-props': {
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'paymentMethod',
          },
          operator: '===',
          right: '01',
        },
        {
          left: {
            domain: 'field',
            field: 'paymentMethod',
          },
          operator: '===',
          right: 'T',
        },
      ],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'BankCode',
    },
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'paymentMethod',
          },
          operator: '===',
          right: '01',
        },
      ],
    },
    visible: 'C',
    'visible-condition': {
      combine: '||',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'paymentMethod',
          },
          operator: '===',
          right: '01',
        },
        {
          left: {
            domain: 'field',
            field: 'paymentMethod',
          },
          operator: '===',
          right: 'T',
        },
      ],
    },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 13,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 13,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config, bankCodeCache }: any) => {
  const dispatch = useDispatch();

  const fieldProps: any = localFieldConfig['field-props'];
  let visible = Rule(fieldProps['visible-condition'], form, 'JPCLMOfDataCapture');
  const isPaymentMethodPremiumAccount = Rule(
    fieldProps['editable-condition'],
    form,
    'JPCLMOfDataCapture'
  );
  const paymentMethod = form.getFieldValue('paymentMethod');
  const bankCode = form.getFieldValue('bankCode');
  visible = visible || (paymentMethod === 'PREM' && bankCodeCache && bankCodeCache !== '9900');

  const isRequired = Rule(fieldProps['required-condition'], form, 'JPCLMOfDataCapture');

  const onSelect = (value: any, typeCode: any, exProps: any) => {
    dispatch({
      type: 'JPCLMOfDataCapture/payeeUpdate',
      payload: {
        changedFields: { bankName: exProps },
      },
    });
  };

  return (config?.visible === Visible.Conditions ? visible : config?.visible === Visible.Yes) ? (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemSelectPlus
        disabled={
          !editable ||
          (config?.editable === Editable.Conditions
            ? !isPaymentMethodPremiumAccount
            : config?.editable === Editable.Yes)
        }
        form={form}
        formName={config.name || field}
        labelId={config.label?.dictCode || localFieldConfig['field-props'].label.dictCode}
        labelTypeCode={
          config.label?.dictTypeCode || localFieldConfig['field-props'].label.dictTypeCode
        }
        searchName="bank"
        onSelectCallback={onSelect}
        optionShowType="both"
        required={
          config.required === Required.Conditions ||
          localFieldConfig['field-props'].required === Required.Conditions
            ? isRequired
            : (config.required || fieldProps.required) === Required.Yes
        }
        searchCustom={handleBank}
        selectCallbackExProp="bankName"
      />
    </Col>
  ) : null;
};

const BankCode = ({ field, config, form, editable, layout, isShow, ...res }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      {...res}
    />
  </Authority>
);

BankCode.displayName = 'BankCode';

export default BankCode;
