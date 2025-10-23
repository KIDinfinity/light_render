import React from 'react';
import FormItem from '../FormItem';
import defaultProps from './defaultProps';
import type { FormItemCheckboxGroupProps } from '../typing';
import CheckBoxGroupItem from './CheckBoxGroupItem';
import styles from './index.less';

const FormItemCheckboxGroup = (props: FormItemCheckboxGroupProps) => (
  <FormItem {...props} className={styles.container}>
    {/**
    // @ts-ignore */}
    <CheckBoxGroupItem />
  </FormItem>
);

FormItemCheckboxGroup.defaultProps = defaultProps;

export default FormItemCheckboxGroup;
