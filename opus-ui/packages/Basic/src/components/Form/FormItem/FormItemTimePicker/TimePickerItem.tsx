import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
// eslint-disable-next-line import/no-unresolved
import { MessageType } from 'claim/enum/medicalSearchMessageType';
import TimeItem from './TimeItem';
import { getTimeFormat } from '../utils/getDateFormat';
import type { FormItemTimePickerProps } from '../typing';

const DatePickerItem = React.forwardRef<any, FormItemTimePickerProps>((props, ref) => {
  const {
    formName,
    disabled,
    placeholder,
    className,
    setVisible = () => {},
    format,
    setExtraWarningMessage,
    valueFormat,
    onChange,
    value,
    ...res
  } = props;

  const newFormat = getTimeFormat(format);

  const onValid = (valid: boolean) => {
    setExtraWarningMessage(
      valid
        ? []
        : [
            {
              message: formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000369' }),
              messageType: MessageType.Information,
            },
          ]
    );
  };

  const datePickerPropsObj = {
    ...res,
    style: { width: '100%', minWidth: '100%' },
    format: newFormat,
    disabled,
    value,
    onFocus: () => {
      setVisible(true);
    },
    onBlur: () => {
      setVisible(false);
    },
    onOpenChange: (flag: any) => {
      setVisible(flag);
    },
    ref,
    onValid,
    onChange,
    valueFormat,
    use12Hours: /a/i.test(newFormat),
    popupClassName: 'timepicker-popup',
    className,
    placeholder,
  };

  return <TimeItem id={formName}  {...datePickerPropsObj} />;
});

export default DatePickerItem;
