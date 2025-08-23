import React from 'react';
import classnames from 'classnames';
import FormItem from '../FormItem';
import defaultProps from './defaultProps';
import SelectItem from './SelectItem';
import type { FormItemSelectProps } from '../typing';
import styles from './index.less';

const FormItemSelect = (props: FormItemSelectProps) => (
  <FormItem
    {...props}
    className={classnames({
      [`${props?.className}`]: true,
      [styles.container]: true,
      [styles.choiseHighlight]: props?.choiseHighlight,
      [styles.placeholderHighlight]: props?.placeholderHighlight,
    })}
  >
    {/**
    // @ts-ignore */}
    <SelectItem />
  </FormItem>
);

FormItemSelect.defaultProps = defaultProps;

export default FormItemSelect;
