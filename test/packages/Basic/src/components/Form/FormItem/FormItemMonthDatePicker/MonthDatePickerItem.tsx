import React, { useCallback } from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { MessageType } from 'claim/enum/medicalSearchMessageType';
import moment from 'moment';
import getDateFormat from '../utils/getDateFormat';
import MonthDateItem from './MonthDateItem';
import type { FormItemMonthDatePickerProps } from '../typing';
import lodash from 'lodash';

const MonthDatePickerItem = React.forwardRef<any, FormItemMonthDatePickerProps>(
  (props: any, ref: any) => {
    const {
      form,
      formName,
      suffix,
      OnRecover,
      recoverValue,
      disabled,
      prefix,
      placeholder,
      maxLength,
      warningMessage,
      className,
      cusTitle,
      onChange,
      onKeyDown,
      onPressEnter,
      onClick,
      onBlur,
      onFocus,
      setVisible,
      format,
      showTime,
      allowClear,
      partner,
      mode,
      allowFreeSelect,
      disabledDate: propsDisabledDate,
      setExtraWarningMessage,
      onOpenChange,
      onOk,
      defaultPickerValue,
      type,
      ...res
    } = props;
    const newFormat = getDateFormat(format || 'L');

    const defaultDisabledDate = useCallback((date: any) => {
      return !moment(date).isBetween('1900-01-01T00:00:00', moment().format(), 'day', '[]');
    }, []);
    const disabledDate = propsDisabledDate || defaultDisabledDate;

    const onValid = (valid: boolean) => {
      setExtraWarningMessage(
        valid || type === 'month'
          ? []
          : [
              {
                message: formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000368' }),
                messageType: MessageType.Information,
              },
            ]
      );
    };

    const handleOnBlur = (e: any) => {
      if (onChange) {
        const val = lodash.trim(e.target.value);
        onChange(val);
      }
    };
    const datePickerPropsObj: any = {
      getCalendarContainer: (triggerNode: { parentNode: any }) => triggerNode.parentNode,
      ...res,
      style: { width: '100%', minWidth: '100%' },
      format: newFormat,
      dateType: format || 'L',
      placeholder,
      disabled,
      showTime,
      allowClear,
      onOpenChange: (e: React.MouseEvent) => {
        setVisible(true);
        return onOpenChange && onOpenChange(e);
      },
      onBlur: (e: React.MouseEvent) => {
        setVisible(false);
        handleOnBlur(e);
        return onBlur && onBlur(e);
      },
      onFocus: () => {
        setVisible(true);
      },
      onOk,
      onChange,
      onValid,
      dropdownClassName: 'datepicker-popup',
      className,
      defaultPickerValue:
        defaultPickerValue ||
        (typeof partner === 'string' &&
          typeof formName === 'string' &&
          !form.getFieldValue(formName) &&
          form.getFieldValue(partner) &&
          moment(form.getFieldValue(partner))),
    };
    if (/a/i.test(newFormat)) {
      if (typeof datePickerPropsObj.showTime === 'object') {
        datePickerPropsObj.showTime.use12Hours = /a/i.test(newFormat);
      } else {
        datePickerPropsObj.showTime = { use12Hours: /a/i.test(newFormat) };
      }
    }
    // 判断是否传入了mode，如果没有直接不设置，一旦设置mode，即使设置mode: date,也会导致日期选择框无法选择年月。
    if (mode) datePickerPropsObj.mode = mode;
    if (!allowFreeSelect) datePickerPropsObj.disabledDate = disabledDate;

    return <MonthDateItem id={formName} {...datePickerPropsObj} ref={ref} />;
  }
);

export default MonthDatePickerItem;
