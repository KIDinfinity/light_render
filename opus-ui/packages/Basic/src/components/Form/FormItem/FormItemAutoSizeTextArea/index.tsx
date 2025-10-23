import React from 'react';
import classNames from 'classnames';
import FormItem from '../FormItem';
import defaultProps from './defaultProps';
import ItemAutoSizeTextArea from './ItemAutoSizeTextArea';
import type { FormItemTextAreaProps } from '../typing';
import styles from './index.less';

const FormItemAutoSizeTextArea = (props: FormItemTextAreaProps) => {
  const { inside, hasError } = props;
  return (
    <FormItem
      {...props}
      className={classNames({
        [styles.inside]: inside,
        [styles.hasError]: hasError,
      })}
    >
      {/**
      // @ts-ignore */}
      <ItemAutoSizeTextArea />
    </FormItem>
  );
};

FormItemAutoSizeTextArea.defaultProps = defaultProps;

export default FormItemAutoSizeTextArea;
