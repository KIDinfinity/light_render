import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  Required,
  Visible,
  FormItemSelect
} from 'basic/components/Form';
import { localFieldConfig } from './SourceBank.config';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { PaymentMethod } from 'claim/pages/Enum';

export { localFieldConfig } from './SourceBank.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = form.getFieldValue('paymentMethod') === PaymentMethod.ByCheckInPayee;
  const editableConditions = true;
  const requiredConditions = true;
  const dicts = getDrowDownList('Dropdown_POS_SrcBank_Check');

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
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
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

const SourceBank = ({ field, config, isShow, layout, form, editable, }: any) => (
  <Authority>
    <FormItem field={field} config={config} isShow={isShow} layout={layout} form={form} editable={editable} />
  </Authority>
);

SourceBank.displayName = localFieldConfig.field;

export default SourceBank;
