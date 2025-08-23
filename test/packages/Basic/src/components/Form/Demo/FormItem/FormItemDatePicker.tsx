import React from 'react';
import { FormSection, FormItemDatePicker } from 'basic/components/Form';

export default ({ form }: any) => {
  return (
    <>
      <FormSection title="FormItemDatePicker" layConf={6} isMargin={false}>
        <FormItemDatePicker
          required
          form={form}
          formName="FormItemDatePicker"
          labelId="FormItemDatePicker"
        />
        <FormItemDatePicker required form={form} formName="FormItemDatePicker" labelId="inline" />
      </FormSection>
    </>
  );
};
