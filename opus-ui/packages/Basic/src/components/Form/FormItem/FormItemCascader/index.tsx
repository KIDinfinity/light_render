import React from 'react';
import FormItem from '../FormItem';
import defaultProps from './defaultProps';
import CascaderItem from './CascaderItem';
import type { FormItemCascaderProps } from '../typing';
import styles from './index.less';

const FormItemCascader = (props: FormItemCascaderProps) => (
  <FormItem {...props} className={styles.container}>
    {/**
    // @ts-ignore */}
    <CascaderItem />
  </FormItem>
);

FormItemCascader.defaultProps = defaultProps;

export default FormItemCascader;
