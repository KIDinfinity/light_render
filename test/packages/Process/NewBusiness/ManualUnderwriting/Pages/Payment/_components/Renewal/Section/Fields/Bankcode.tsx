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
import AuthorizedAtomEditable from '@/auth/Components/Authorized/AuthorizedAtomEditable';
import { fieldConfig } from './Bankcode.config';

export { fieldConfig } from './Bankcode.config';

import { useGetBankCodeListDicts } from '../../../../_hooks';
import useUpdateFactoringHouse from 'process/NewBusiness/ManualUnderwriting/_hooks/useUpdateFactoringHouse';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const dicts = useGetBankCodeListDicts();

  const fieldProps: any = fieldConfig['field-props'];
  const formName = config.name || field;

  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = form.getFieldValue('renewalPayType') === 'D';

  const onChange = useUpdateFactoringHouse(form);

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          dictCode="bankCode"
          dictName="bankName"
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={formName}
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
          onChange={(value: string) => onChange({ [formName]: value })}
        />
      </Col>
    )
  );
};

const Bankcode = ({ form, editable, config, layout, isShow }: any) => (
  <Authority>
    <AuthorizedAtomEditable currentAuthority={'BnakName'} editable={editable}>
      <FormItem
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        field={fieldConfig?.field}
        config={config}
      />
    </AuthorizedAtomEditable>
  </Authority>
);

Bankcode.displayName = 'bankCode';

export default Bankcode;
