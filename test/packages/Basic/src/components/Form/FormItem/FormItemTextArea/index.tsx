import React from 'react';
import classNames from 'classnames';
import FormItem from '../FormItem';
import defaultProps from './defaultProps';
import TextAreaItem from './TextAreaItem';
import type { FormItemTextAreaProps } from '../typing';
import styles from './index.less';

const FormItemTextArea = (props: FormItemTextAreaProps) => {
  const { inside, hasError, className } = props;

  return (
    <FormItem
      {...props}
      className={classNames({
        [styles.inside]: inside,
        [styles.hasError]: hasError,
      }, className)}
    >
      {/**
      // @ts-ignore */}
      <TextAreaItem />
    </FormItem>
  );
};

FormItemTextArea.defaultProps = defaultProps;

export default FormItemTextArea;
