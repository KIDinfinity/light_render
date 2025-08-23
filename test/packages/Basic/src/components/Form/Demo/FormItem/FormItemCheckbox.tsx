import React from 'react';
import { FormSection, FormItemCheckbox } from 'basic/components/Form';

export default ({ form }: any) => {
  return (
    <>
      <FormSection title="FormItemCheckbox" layConf={6} isMargin={false}>
        <FormItemCheckbox
          required
          form={form}
          formName="FormItemCheckbox"
          labelId="FormItemCheckbox"
        />
        <FormItemCheckbox
          required
          form={form}
          formName="FormItemCheckbox"
          labelId="inline"
          isInline
        />
      </FormSection>
    </>
  );
};
