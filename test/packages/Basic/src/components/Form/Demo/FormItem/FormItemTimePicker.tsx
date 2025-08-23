import React from 'react';
import { FormSection, FormItemTimePicker } from 'basic/components/Form';

export default ({ form }: any) => {
  return (
    <>
      <FormSection title="FormItemTimePicker" layConf={6} isMargin={false}>
        <FormItemTimePicker
          required
          form={form}
          formName="FormItemTimePicker"
          labelId="FormItemTimePicker"
        />
      </FormSection>
    </>
  );
};
