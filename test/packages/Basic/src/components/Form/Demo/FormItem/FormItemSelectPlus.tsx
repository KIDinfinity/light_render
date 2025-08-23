import React from 'react';
import { FormSection, FormItemSelectPlus } from 'basic/components/Form';

export default ({ form }: any) => {
  return (
    <>
      <FormSection title="FormItemSelectPlus" layConf={8} isMargin={false}>
        <FormItemSelectPlus
          form={form}
          required
          searchName="diagnosis"
          dropdownCode="claim_dict004"
          optionShowType="both"
          formName="FormItemSelectPlus"
          labelId="FormItemSelectPlus"
        />
      </FormSection>
    </>
  );
};
