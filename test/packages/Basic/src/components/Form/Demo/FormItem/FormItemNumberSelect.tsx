import React from 'react';
import { FormSection, FormItemNumberSelect } from 'basic/components/Form';
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
    <FormSection title="FormItemNumberSelect" layConf={6}>
      <FormItemNumberSelect
        dicts={dicts}
        required
        form={form}
        formName="FormItemNumberSelect"
        labelId="FormItemNumber"
      />
    </FormSection>
  );
};
