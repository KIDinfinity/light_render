import React from 'react';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import { fieldConfig } from './Cardtype.config';
import AuthorizedAtomEditable from '@/auth/Components/Authorized/AuthorizedAtomEditable';

export { fieldConfig } from './Cardtype.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });

  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = form.getFieldValue('renewalPayType') === 'R';

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
          precision={0}
        />
      </Col>
    )
  );
};

const Cardtype = ({ form, editable, config, layout, isShow }: any) => (
  <Authority>
    <AuthorizedAtomEditable currentAuthority={'CreditCardCompany'} editable={editable}>
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

Cardtype.displayName = 'cardType';

export default Cardtype;
