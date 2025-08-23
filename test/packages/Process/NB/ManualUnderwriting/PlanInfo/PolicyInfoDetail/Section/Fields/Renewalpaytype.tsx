import React from 'react';
import lodash from 'lodash';
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
import useGetRenewalpaytypeDicts from 'process/NB/ManualUnderwriting/_hooks/useGetRenewalpaytypeDicts';
import { fieldConfig } from './Renewalpaytype.config';
import AuthorizedAtomEditable from '@/auth/Components/Authorized/AuthorizedAtomEditable';

export { fieldConfig } from './Renewalpaytype.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });
  const renewalpaytypeDicts = useGetRenewalpaytypeDicts();
  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={renewalpaytypeDicts || dicts}
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
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Renewalpaytype = ({ field, config, form, editable, layout, isShow }: any) => (
  <Authority>
    <AuthorizedAtomEditable currentAuthority={'RenewalPaymentMethod'} editable={editable}>
      <FormItem
        field={field}
        config={lodash.get(config, 'field-props')}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
      />
    </AuthorizedAtomEditable>
  </Authority>
);

Renewalpaytype.displayName = 'renewalPayType';

export default Renewalpaytype;
