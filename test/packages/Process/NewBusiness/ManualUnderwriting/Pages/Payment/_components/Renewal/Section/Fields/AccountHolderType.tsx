import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';

import { useGetClientName } from 'process/NewBusiness/ManualUnderwriting/Pages/Payment/_hooks';

import { fieldConfig } from './AccountHolderType.config';

export { fieldConfig } from './AccountHolderType.config';
import { getDrowDownList } from '@/utils/dictFormatMessage';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = RuleByForm(fieldProps['visible-condition'], form);
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = form.getFieldValue('renewalPayType') === 'D';
  const dicts = getDrowDownList({ config, fieldProps });

  const handleChange = useGetClientName({ id: form.getFieldValue('id') });

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
          onChange={handleChange}
        />
      </Col>
    )
  );
};

const AccountHolderType = ({ form, editable, config, layout, isShow, bankInfoIndex, id }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      field={fieldConfig?.field}
      config={config}
      bankInfoIndex={bankInfoIndex}
    />
  </Authority>
);

AccountHolderType.displayName = 'bankAccountHolderType';

export default AccountHolderType;
