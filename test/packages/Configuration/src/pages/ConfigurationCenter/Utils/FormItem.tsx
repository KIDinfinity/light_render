import React from 'react';
import lodash from 'lodash';
import {
  Input,
  InputNumber,
  DatePicker,
  InputRange,
  DateRangePicker,
  InputNumberRange,
  Select,
  SelectPlus,
  Switch,
  Json,
  TextArea,
  AutoComplete,
  Duration,
} from '@/components/CustomForm';

import { getComponentStyle, getComponentRules, getItemStyle } from './FormUtils';
import type { DataFieldProps } from './Typings';
import type { Moment } from 'moment';

const getProps = (props: any, params: any = {}, extra?: any) => ({
  key: props.functionId,
  params: {
    disabled: !props.editable && props.editable !== null && props.editable !== undefined,
    title: props.fieldCaption || props.componentCaption,
    initialValue: params[props.fieldName],
    key: props.fieldName,
    description: props.description,
    dropdownCode: props.dropdownCode,
    formName: props.fieldName,
    style: {
      ...getComponentStyle(props),
    },
    itemStyle: {
      ...getItemStyle(props),
    },
    rules: getComponentRules(props, extra),
    validateTrigger: props?.validateTrigger,
    ...extra,
    // ...params,
  },
  layout: props?.layout
    ? {
        xs: { span: props?.layout },
        sm: { span: props?.layout },
        md: { span: props?.layout },
        lg: { span: props?.layout },
      }
    : null,
});

export default {
  text: (el: DataFieldProps, params: any = {}, extra: any = {}) => {
    const { getPopupContainer, getCalendarContainer, ...res } = extra;
    // @ts-ignore
    return <Input {...getProps(el, params, { ...res })} />;
  },
  textarea: (el: DataFieldProps, params: any = {}, extra: any = {}) => {
    const { getPopupContainer, getCalendarContainer, ...res } = extra;
    // @ts-ignore
    return <TextArea {...getProps(el, params, { ...res })} />;
  },
  longtext: (el: DataFieldProps, params: any = {}, extra: any = {}) => {
    const { getPopupContainer, getCalendarContainer, ...res } = extra;
    // @ts-ignore
    return <TextArea {...getProps(el, params, { ...res })} />;
  },
  json: (el: DataFieldProps, params: any = {}, extra: any = {}) => {
    const { getPopupContainer, getCalendarContainer, ...res } = extra;
    // @ts-ignore
    return <Json {...getProps(el, params, { ...res })} />;
  },
  text_range: (el: DataFieldProps, params: any = {}, extra: any = {}) => {
    const { getPopupContainer, getCalendarContainer, ...res } = extra;
    return (
      // @ts-ignore
      <InputRange
        {...getProps(el, params, {
          options1: {
            key: el.fieldNameArray[0],
            title: el.fieldCaption || el.componentCaption,
            initialValue: el.defaultValue?.[0] || '',
            style: { width: '60px' },
          },
          options2: {
            key: el.fieldNameArray[1],
            title: '',
            initialValue: el.defaultValue?.[1] || '',
            style: { width: '60px' },
          },
          ...res,
        })}
      />
    );
  },
  number: (el: DataFieldProps, params: any = {}, extra: any = {}) => {
    const { getPopupContainer, getCalendarContainer, ...res } = extra;
    // @ts-ignore
    return <InputNumber {...getProps(el, params, { ...res })} />;
  },
  number_range: (el: DataFieldProps, params: any = {}, extra: any = {}) => {
    const { getPopupContainer, getCalendarContainer, ...res } = extra;
    return (
      // @ts-ignore
      <InputNumberRange
        {...getProps(el, params, {
          options1: {
            key: el.fieldNameArray?.[0],
            title: el.fieldCaption || el.componentCaption,
            initialValue: el.defaultValue?.[0],
          },
          options2: {
            key: el.fieldNameArray?.[1],
            title: el.fieldCaption || el.componentCaption,
            initialValue: el.defaultValue?.[1],
          },
          style: { width: '60px' },
          ...res,
        })}
      />
    );
  },
  date: (el: DataFieldProps, params: any = {}, extra: any = {}) => {
    const { getPopupContainer, ...res } = extra;
    return (
      // @ts-ignore
      <DatePicker
        {...getProps(el, params, {
          format: 'L',
          getCalendarContainer: (triggerNode: any) => triggerNode.parentNode,
          ...res,
        })}
      />
    );
  },
  date_range: (el: DataFieldProps, params: any = {}, extra: any = {}) => {
    const { getPopupContainer, ...res } = extra;
    // 获取 start date 的值
    const startDate = el.minSearchValue;
    const limit = el?.limit;
    // 定义变量存储 onCalendarChange 的值
    let selectedDates: [Moment | null, Moment | null] = [null, null];
    return (
      // @ts-ignore
      <DateRangePicker
        {...getProps(el, params, {
          format: 'L',
          getCalendarContainer: (triggerNode: any) => triggerNode.parentNode,
          onCalendarChange: (dates: (Moment | any)[]) => {
            selectedDates = [dates[0] || null, dates[1] || null] as [Moment | null, Moment | null];
          },
          disabledDate: (currentDate: any) => {
            if (startDate && currentDate && currentDate.isBefore(startDate, 'day')) {
              return true;
            }

            // 禁止选择超过 limit 的日期范围
            if (selectedDates[0] && limit) {
              const dateBeforeLimit = selectedDates[0].clone().subtract(limit, 'days'); // 计算 limit 天前的日期
              const dateAfterLimit = selectedDates[0].clone().add(limit, 'days'); // 计算 limit 天后的日期

              if (
                currentDate.isBefore(dateBeforeLimit, 'day') ||
                currentDate.isAfter(dateAfterLimit, 'day')
              ) {
                return true;
              }
            }

            return false;
          },
          ...res,
        })}
      />
    );
  },
  date_time: (el: DataFieldProps, params: any = {}, extra: any = {}) => {
    const { getPopupContainer, ...res } = extra;
    return (
      // @ts-ignore
      <DatePicker
        {...getProps(el, params, {
          showTime: true,
          format: 'L LTS',
          getCalendarContainer: (triggerNode: any) => triggerNode.parentNode,
          ...res,
        })}
      />
    );
  },
  date_default: (el: DataFieldProps, params: any = {}, extra: any = {}) => {
    const { getPopupContainer, ...res } = extra;
    return (
      // @ts-ignore
      <DatePicker
        {...getProps(el, params, {
          getCalendarContainer: (triggerNode: any) => triggerNode.parentNode,
          ...res,
        })}
      />
    );
  },
  date_time_range: (el: DataFieldProps, params: any = {}, extra: any = {}) => {
    const { getPopupContainer, ...res } = extra;
    return (
      // @ts-ignore
      <DateRangePicker
        {...getProps(el, params, {
          showTime: true,
          format: 'L LTS',
          getCalendarContainer: (triggerNode: any) => triggerNode.parentNode,
          ...res,
        })}
      />
    );
  },
  dropdown: (el: DataFieldProps, params: any = {}, extra: any = {}) => {
    const dropDownData = (el && el.dropdownDatas) || [];
    const dictsKey = !lodash.isEmpty(dropDownData) ? lodash.keys(dropDownData[0])[0] : [];
    const dictsValue = !lodash.isEmpty(dropDownData) ? lodash.keys(dropDownData[0])[1] : [];
    const { getCalendarContainer, ...res } = extra;

    return !!el?.dropdownCode && !lodash.isEmpty(el?.dropdownCode) ? (
      <SelectPlus
        {...getProps(el, params, {
          dicts: dropDownData,
          dictsKey,
          dictsValue,
          allowClear: true,
          loading: !!el.loading,
          getPopupContainer: (triggerNode: any) => triggerNode.parentNode,
          ...res,
        })}
      />
    ) : (
      // @ts-ignore
      <Select
        {...getProps(el, params, {
          dicts: dropDownData,
          dictsKey,
          dictsValue,
          allowClear: true,
          loading: !!el.loading,
          getPopupContainer: (triggerNode: any) => triggerNode.parentNode,
          ...res,
        })}
      />
    );
  },
  multi_drop_down: (el: DataFieldProps, params: any = {}, extra: any = {}) => {
    const dropDownData = (el && el.dropdownDatas) || [];
    const dictsKey = !lodash.isEmpty(dropDownData) ? lodash.keys(dropDownData[0])[0] : [];
    const dictsValue = !lodash.isEmpty(dropDownData) ? lodash.keys(dropDownData[0])[1] : [];
    const { getCalendarContainer, ...res } = extra;

    return !!el?.dropdownCode && !lodash.isEmpty(el?.dropdownCode) ? (
      <SelectPlus
        {...getProps(el, params, {
          mode: 'multiple',
          dicts: dropDownData,
          dictsKey,
          dictsValue,
          allowClear: true,
          loading: !!el.loading,
          getPopupContainer: (triggerNode: any) => triggerNode.parentNode,
          ...res,
        })}
      />
    ) : (
      // @ts-ignore
      <Select
        {...getProps(el, params, {
          mode: 'multiple',
          dicts: dropDownData,
          dictsKey,
          dictsValue,
          allowClear: true,
          loading: !!el.loading,
          getPopupContainer: (triggerNode: any) => triggerNode.parentNode,
          ...res,
        })}
      />
    );
  },
  text_drop_down: (el: DataFieldProps, params: any = {}, extra: any = {}) => {
    const dropDownData = (el && el.dropdownDatas) || [];
    const { getCalendarContainer, ...res } = extra;
    const dictsKey =
      lodash
        .chain(dropDownData)
        .map((item) => lodash.values(item)[0])
        .compact()
        .value() || [];
    return (
      // @ts-ignore
      <AutoComplete
        {...getProps(el, params, {
          dataSource: dictsKey,
          allowClear: true,
          loading: !!el.loading,
          getPopupContainer: (triggerNode: any) => triggerNode.parentNode,
          ...res,
        })}
      />
    );
  },
  boolean: (el: DataFieldProps, params: any = {}, extra: any = {}) => {
    const { getPopupContainer, getCalendarContainer, ...res } = extra;
    return (
      // @ts-ignore
      <Switch
        {...getProps(el, params, {
          ...res,
        })}
      />
    );
  },

  duration: (el: DataFieldProps, params: any = {}, extra: any = {}) => {
    const { getPopupContainer, getCalendarContainer, ...res } = extra;
    return (
      // @ts-ignore
      <Duration
        {...getProps(el, params, {
          // @ts-ignore
          format: el?.format,
          ...res,
        })}
      />
    );
  },
};
