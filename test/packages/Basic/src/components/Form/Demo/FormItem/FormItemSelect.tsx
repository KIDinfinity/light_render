import React from 'react';
import { FormSection, FormItemSelect } from 'basic/components/Form';

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
    <>
      <FormSection title="FormItemSelect" layConf={6} isMargin={false}>
        <FormItemSelect
          form={form}
          required
          formName="FormItemSelect"
          labelId="FormItemSelect"
          dicts={dicts}
        />
        <FormItemSelect
          form={form}
          required
          formName="FormItemSelect"
          labelId="FormItemSelect"
          dicts={dicts}
          optionShowType="both"
        />
      </FormSection>
    </>
  );
};
