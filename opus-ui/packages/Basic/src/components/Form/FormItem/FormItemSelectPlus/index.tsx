import React, { useState } from 'react';
import FormItem from '../FormItem';
import SelectPlusItem from './SelectPlusItem';
import defaultProps from './defaultProps';

const FormItemSelectPlus = (props: any) => {
  const [dicts, setDicts] = useState([]);
  return (
    <FormItem
      {...props}
      dicts={dicts}
      setDicts={setDicts}
      dictCode='dictCode'
      dictName='dictName'
      >
      {/**
      // @ts-ignore */}
      <SelectPlusItem />
    </FormItem>
  )
}

FormItemSelectPlus.defaultProps = defaultProps;

export default FormItemSelectPlus;
