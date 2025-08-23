import React from 'react';
import { FormSection, FormItemSelectAuto } from 'basic/components/Form';

export default ({ form }: any) => {
  return (
    <>
      <FormSection title="FormItemSelectAuto" layConf={6} isMargin={false}>
        <FormItemSelectAuto
          required
          form={form}
          formName="FormItemSelectAuto"
          labelId="FormItemSelectAuto"
          typeCode="ClaimType"
        />
      </FormSection>
    </>
  );
};
