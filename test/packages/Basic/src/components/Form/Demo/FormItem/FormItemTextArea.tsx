import React from 'react';
import { FormSection, FormItemTextArea } from 'basic/components/Form';

export default ({ form }: any) => {
  return (
    <>
      <FormSection title="FormItemTextArea" layConf={6} isMargin={false}>
        <FormItemTextArea
          required
          form={form}
          formName="FormItemTextArea"
          labelId="FormItemTextArea"
        />
        <FormItemTextArea required form={form} row={5} formName="FormItemTextArea" labelId="row5" />
      </FormSection>
    </>
  );
};
