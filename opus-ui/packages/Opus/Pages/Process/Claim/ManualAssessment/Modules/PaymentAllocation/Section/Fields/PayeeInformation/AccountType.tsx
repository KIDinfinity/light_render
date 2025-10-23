import React, { useMemo } from 'react';
import { Col } from 'antd';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { Authority, Editable, FormItemSelect, Required, Visible } from 'basic/components/Form';
import { localFieldConfig } from './AccountType.config';
import { PaymentType } from 'claim/enum';

export { localFieldConfig } from './AccountType.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  // 根据 paymentType 的值动态获取 dicts
  const paymentType = form.getFieldValue('paymentType');
  const dicts = useMemo(() => {
    const list = getDrowDownList({ config, fieldProps });
    if (paymentType === PaymentType.URGE) {
      return list.filter((item: { dictCode: string }) => item.dictCode !== '03');
    }
    return list;
  }, [paymentType, config, fieldProps]);

  const visibleConditions =
    form.getFieldValue('paymentMethod') !== 'POST' &&
    (form.getFieldValue('paymentMethod') !== 'PREM' || form.getFieldValue('bankType') !== 'POST');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
        <FormItemSelect
          disabled={(config.editable || fieldProps.editable) === Editable.No || !editable}
          dicts={dicts}
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={(config.required || fieldProps.required) === Required.Yes}
        />
      </Col>
    )
  );
};

const AccountType = ({ field, config, isShow, layout, form, editable, labelType }: any) => (
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

AccountType.displayName = localFieldConfig.field;

export default AccountType;
