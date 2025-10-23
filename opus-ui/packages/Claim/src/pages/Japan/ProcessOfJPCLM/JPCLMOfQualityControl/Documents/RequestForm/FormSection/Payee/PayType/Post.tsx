import React from 'react';
import { FormItemInput } from 'basic/components/Form/FormSection';

export default (props: any) => {
  const { form, taskNotEditable } = props;
  return [
    <FormItemInput
      form={form}
      disabled={taskNotEditable}
      formName="accountOwnerName"
      maxLength={30}
      required
      labelId="venus_claim.label.accountOwnerName"
    />,
    <FormItemInput
      form={form}
      disabled={taskNotEditable}
      formName="accountOwnerSpellName"
      maxLength={90}
      required
      labelId="venus_claim.label.accountOwnerSpellName"
    />,
    <FormItemInput
      form={form}
      disabled={taskNotEditable}
      formName="depositBookSign"
      maxLength={10}
      required
      labelId="venus_claim.label.depositBookSign"
    />,
    <FormItemInput
      form={form}
      disabled={taskNotEditable}
      formName="depositBookNo"
      maxLength={10}
      required
      labelId="venus_claim.label.depositBookNo"
    />,
  ];
};
