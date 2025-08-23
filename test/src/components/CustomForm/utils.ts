import lodash from 'lodash';
import moment from 'moment';
import type { ParamsProps, ParamsOutputProps } from './type';

export default (params: ParamsProps): ParamsOutputProps => {
  const {
    key,
    getValueFromEvent,
    initialValue,
    normalize,
    preserve,
    rules,
    trigger,
    validateFirst,
    validateTrigger,
    valuePropName,
    itemStyle,
    itemClassName,
    colon,
    labelId,
    title,
    description,
    layout,
    isShowAll,
    ...props
  } = params;
  const options = {
    // 错误提示及label
    layout: {
      key,
      title, // 非国际化
      labelId, // 国际化 id
      description, //  悬浮介绍
    },
    // form.getFieldDecorator参数
    decorator: {
      key,
      getValueFromEvent,
      initialValue,
      normalize,
      preserve,
      rules,
      trigger,
      validateFirst,
      validateTrigger,
      valuePropName,
    },
    // formItem参数
    formItem: {
      style: itemStyle,
      className: itemClassName,
      layout,
      colon,
    },
    // ant 组件参数
    options: {
      ...props,
    },
    extra: {
      isShowAll,
    },
  };

  return lodash.mapValues(options, (el: Record<string, any>): any =>
    lodash.pickBy(el, (bo) => !lodash.isNil(bo))
  );
};

export const transferValue = (date: any) => {
  if (!lodash.isNaN(Date.parse(date))) {
    if (!moment.isMoment(date)) {
      return moment(date);
    }
  } else {
    return null;
  }
  return date;
};
