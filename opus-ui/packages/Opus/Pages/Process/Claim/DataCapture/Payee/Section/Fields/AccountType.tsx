import React, { useMemo } from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  Visible,
  FormItemSelect,
  Rule,
  Required,
} from 'basic/components/Form';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { PaymentType } from 'claim/enum';
import { PaymentMethod } from 'claim/pages/Enum';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'payee',
  field: 'accountType',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Individual',
      dictCode: 'AccountType',
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
        {
          left: {
            domain: 'field',
            field: 'bankType',
          },
          operator: '===',
          right: 'BANK',
        },
      ],
    },
    visible: 'C',
    'visible-condition': {
      combine: '&&',
      conditions: [
        {
          combine: '||',
          conditions: [
            {
              left: {
                domain: 'field',
                field: 'paymentMethod',
              },
              operator: '!==',
              right: 'PREM',
            },
            {
              left: {
                domain: 'field',
                field: 'bankType',
              },
              operator: '!==',
              right: 'POST',
            },
          ],
        },
        {
          combine: '&&',
          conditions: [
            {
              left: {
                domain: 'field',
                field: 'paymentMethod',
              },
              operator: '!==',
              right: 'POST',
            },
          ],
        },
      ],
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_CLM_AccountType',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 9,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 9,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config = {} }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const paymentType = form.getFieldValue('paymentType');
  const dicts = useMemo(() => {
    const list = getDrowDownList(
      config['x-dict']?.dictTypeCode || localFieldConfig?.['field-props']?.['x-dict']?.dictTypeCode
    );
    if (paymentType === PaymentType.URGE) {
      return list.filter((item: { dictCode: string }) => item.dictCode !== '03');
    }
    return list;
  }, [paymentType, config, fieldProps]);

  const visibleConditions = Rule(fieldProps['visible-condition'], form, 'opusClaimDataCapture');
  const editableConditions = true;
  const requiredConditions = Rule(fieldProps['required-condition'], form, 'opusClaimDataCapture');

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
        />
      </Col>
    )
  );
};

const AccountType = ({ field, config, form, editable, layout, isShow }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
    />
  </Authority>
);

AccountType.displayName = 'AccountType';

export default AccountType;
