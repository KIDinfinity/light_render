import React from 'react';
import { Col } from 'antd';
// import lodash from 'lodash';
// import { formUtils } from 'basic/components/Form';
// import useGetPayType from 'process/NB/PremiumSettlement/_hooks/useGetPayType';
import { Authority, Editable, FormItemSelect, Visible, RuleByForm } from 'basic/components/Form';
import { fieldConfig } from './AccountHolderType.config';
export { fieldConfig } from './AccountHolderType.config';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import useUpdateAccountHoldernameCallback from 'process/NB/PremiumSettlement/_hooks/useUpdateAccountHoldernameCallback';
import useHandleGetBankInfoRequired from 'process/NB/PremiumSettlement/_hooks/useHandleGetBankInfoRequired';
const FormItem = ({ isShow, layout, form, editable, field, config, required, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = useHandleGetBankInfoRequired();
  const dicts = getDrowDownList({ config, fieldProps });
  const handleChange = useUpdateAccountHoldernameCallback({ id });

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
          required={requiredConditions && required}
          hiddenPrefix
          precision={0}
          onChange={handleChange}
        />
      </Col>
    )
  );
};

const AccountHolderType = ({ field, config, form, editable, layout, isShow, id }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      field={field}
      config={config}
      id={id}
    />
  </Authority>
);

AccountHolderType.displayName = 'bankAccountHolderType';

export default AccountHolderType;
