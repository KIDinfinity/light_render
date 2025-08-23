import React from 'react';
import { FormSection, FormItemDateSelect } from 'basic/components/Form';
const dicts = [
  {
    dictCode: 'F',
    dictName: 'Female',
    typeCode: 'Gender',
    language: 'en-US',
  },
  {
    dictCode: 'M',
    dictName: 'Male',
    typeCode: 'Gender',
    language: 'en-US',
  },
];
export default ({ form }: any) => {
  return (
    <FormSection title="FormItemDateSelect" layConf={6}>
      <FormItemDateSelect
        dicts={dicts}
        required
        form={form}
        formName="FormItemDateSelect"
        labelId="FormItemDateSelect"
      />
    </FormSection>
  );
};
