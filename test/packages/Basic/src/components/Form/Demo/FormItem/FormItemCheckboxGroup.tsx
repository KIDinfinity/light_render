import React from 'react';
import { FormSection, FormItemCheckboxGroup } from 'basic/components/Form';
const dicts = [
  {
    dictCode: 'BS',
    dictName: 'Base',
    typeCode: 'DropDown_COM_Region',
  },
  {
    dictCode: 'HK',
    dictName: 'HongKong',
    typeCode: 'DropDown_COM_Region',
  },
  {
    dictCode: 'JP',
    dictName: 'Japan',
    typeCode: 'DropDown_COM_Region',
  },
  {
    dictCode: 'PH',
    dictName: 'Philippine',
    typeCode: 'DropDown_COM_Region',
  },
  {
    dictCode: 'TH',
    dictName: 'Thailand',
    typeCode: 'DropDown_COM_Region',
  },
];
export default ({ form }: any) => {
  return (
    <FormSection title="FormItemCheckboxGroup" layConf={24}>
      <FormItemCheckboxGroup
        required
        dicts={dicts}
        form={form}
        formName="FormItemCheckboxGroup"
        labelId="FormItemCheckboxGroup"
      />
    </FormSection>
  );
};
