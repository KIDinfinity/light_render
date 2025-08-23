import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import useGetPayType from 'process/NB/ManualUnderwriting/_hooks/useGetPayType';
import {
  Authority,
  Editable,
  FormItemInput,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import { fieldConfig } from './Accountno.config';
import AuthorizedAtomEditable from '@/auth/Components/Authorized/AuthorizedAtomEditable';
import { tenant, Region } from '@/components/Tenant';

export { fieldConfig } from './Accountno.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const payTypeCollection = useGetPayType();
  const renewalPayType = lodash.get(payTypeCollection, 'renewalPayType');
  const fieldProps: any = fieldConfig['field-props'];

  const bankCode = form.getFieldValue('bankCode');

  const fixedLength = tenant.region({
    [Region.ID]: {
      // BCA: 10,
    },
    notMatch: {},
  })?.[bankCode];

  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = formUtils.queryValue(renewalPayType) === 'D';

  const Rules = {
    // VLD_000269: Validator.VLD_000269(fixedLength),
  };

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
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
          maxLength={fixedLength}
          hiddenPrefix
          precision={0}
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
      </Col>
    )
  );
};

const Accountno = ({ form, editable, config, layout, isShow }: any) => (
  <Authority>
    <AuthorizedAtomEditable currentAuthority={'AccountNo'} editable={editable}>
      <FormItem
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        field={config?.field}
        config={lodash.get(config, 'field-props')}
      />
    </AuthorizedAtomEditable>
  </Authority>
);

Accountno.displayName = 'bankAcctNo';

export default Accountno;
