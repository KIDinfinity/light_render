import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
} from 'basic/components/Form';
import useGetPaymentListByPaymentMethodType from 'opus/NewBusiness/PremiumSettlement/_hooks/useGetPaymentListByPaymentMethodType';

import { fieldConfig } from './Refundpaytype.config';
export { fieldConfig } from './Refundpaytype.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const dicts = useGetPaymentListByPaymentMethodType();

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
          allowClear={false}
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
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          getPopupContainer={() => document.body}
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Refundpaytype = ({ form, editable, section, layout, isShow, config }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      config={config}
      field={fieldConfig?.field}
    />
  </Authority>
);

Refundpaytype.displayName = 'refundPayType';

export default Refundpaytype;
