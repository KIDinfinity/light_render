import React from 'react';
import FormItem from '../FormItem';
import defaultProps from './defaultProps';
import AutoCompleteItem from './AutoCompleteItem';
import type { FormItemAutoCompleteProps } from '../typing';

const FormItemAutoComplete = ({ children, defaultValue, ...res }: FormItemAutoCompleteProps) => (
  <FormItem
    {...res}
    propChildren={children}
    propsDefaultValue={defaultValue}
    className="systemCalcutionItem"
  >
    {/**
    // @ts-ignore */}
    <AutoCompleteItem />
  </FormItem>
);

FormItemAutoComplete.defaultProps = defaultProps;

export default FormItemAutoComplete;
