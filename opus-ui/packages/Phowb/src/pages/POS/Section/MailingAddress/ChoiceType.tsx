import React from 'react';
import { FormLayout, FormItemRadioGroup } from 'basic/components/Form/FormSection';
import { choicTypeList } from '../../_models/functions/getChangeInfoOption';

export default ({ form, disabled, recoverValue }: any) => (
  <FormLayout
    layConf={{
      default: 12,
    }}
  >
    <FormItemRadioGroup
      form={form}
      formName="preferredMailingAddress"
      dicts={choicTypeList}
      disabled={disabled}
      dictCode="code"
      dictName="name"
      labelId="PreferredMailingAddress"
      recoverValue={recoverValue}
    />
  </FormLayout>
);
