import React, { useMemo } from 'react';
import ErrorTooltip from '@/components/ErrorTooltip';
import type { LabelProps } from './typing';

const Label = (props: LabelProps): any => {
  const {
    warningMessage,
    labelId = '',
    form,
    formName = '',
    visible,
    reload,
    labelTypeCode,
    refreshStyle,
    reminder,
    title,
    useError,
    tipMsg,
    tagText,
    errors,
    disabled,
    reloadSpin,
  } = props;
  return useMemo(
    () =>
      (labelId || title) && (
        <ErrorTooltip
          {...props}
          form={form}
          labelId={labelId}
          formName={formName}
          visible={!!visible}
        />
      ),
    [
      warningMessage,
      labelId,
      form,
      formName,
      visible,
      reload,
      labelTypeCode,
      refreshStyle,
      reminder,
      title,
      useError,
      tipMsg,
      tagText,
      errors,
      disabled,
      reloadSpin,
    ]
  );
};

export default Label;
