import React from 'react';
import { FormItemSelectPlus } from 'basic/components/Form';

interface IPPrams {
  disabled: boolean;
  formName: string;
  required: number;
  dropdownCode: string;
  mode: string;
  title: string;
  allowEmptySearch?: boolean;
}

interface IProps {
  params: IPPrams;
  form?: any;
}

const SelectPlus = ({ form, params }: IProps) => {
  const { disabled, formName, required, dropdownCode, mode, title, allowEmptySearch } = params;
  return (
    <FormItemSelectPlus
      disabled={disabled}
      form={form}
      formName={formName}
      labelId={title}
      required={required}
      searchName="medicalProvider"
      dropdownCode={dropdownCode}
      optionShowType="both"
      allowEmptySearch={allowEmptySearch}
      mode={mode}
    />
  );
};

export default SelectPlus;
