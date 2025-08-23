import React from 'react';
import { FormSection, FormItemPhone } from 'basic/components/Form';

export default ({ form }: any) => {
  return (
    <>
      <FormSection title="FormItemPhone" layConf={6} isMargin={false}>
        <FormItemPhone required form={form} formName="FormItemPhone" labelId="FormItemPhone" />
      </FormSection>
    </>
  );
};
