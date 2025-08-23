import moment from 'moment';
import React from 'react';
import lodash from 'lodash';
import { parse, stringify } from 'qs';
import * as FlattenJS from 'flattenjs';
import safeParse from 'safe-json-parse/tuple';
import { LS, LSKey } from '@/utils/cache';
import formUtils from 'basic/components/Form/formUtils';

export function getMinFromRemainingTime({ taskRemainingTime, caseRemainingTime }: any) {
  const minTime = lodash
    .chain([taskRemainingTime, caseRemainingTime])
    .map((item) => (!!item ? item : 0))
    .min()
    .value();
  return lodash.max([minTime, 0]);
}

/**
 * 从一个对象获取多个属性值的快捷方法
 * @param {object} object 数据来源对象
 * @param {array} keys 属性值
 * @param {array} defaultValues 默认值
 * @return {object} 获取数据结果
 */
export function getParams(object = {}, keys = [], defaultValues = []) {
  const result: any = {};
  keys.forEach((key) => {
    const defaultValue =
      (defaultValues.find((item: any) => item.name === key) || ({} as any)).value || '';
    const value = lodash.get(object, key, defaultValue);
    result[key] = value;
  });
  return result;
}

export function fixedZero(val: any) {
  return val * 1 < 10 ? `0${val}` : val;
}

export function getUserInfo() {
  let currentUser = {};
  try {
    currentUser = LS.getItem(LSKey.CURRENTUSER) || {};
  } catch {
    currentUser = {};
  }

  return currentUser;
}

/**
 * 一天内的消息显示为：“昨天 时:分”
 * 二天至七天内显示为：“星期X 时:分”
 * 当大于7天时显示为：“YYYY年X月X日时:分”
 * @param time
 * @returns {string}
 */
export function timeStamp(time: any) {
  const NOW = moment();
  const TODAY = NOW.clone().startOf('day');
  const YESTERDAY = NOW.clone().subtract(1, 'days').startOf('day');
  const A_WEEK_OLD = NOW.clone().subtract(7, 'days').startOf('day');

  function isToday(momentDate: any) {
    return momentDate.isSame(TODAY, 'd');
  }
  function isYesterday(momentDate: any) {
    return momentDate.isSame(YESTERDAY, 'd');
  }
  function isWithinAWeek(momentDate: any) {
    return momentDate.isAfter(A_WEEK_OLD);
  }
  function isTwoWeeksOrMore(momentDate: any) {
    return !isWithinAWeek(momentDate);
  }

  if (isToday(moment(time))) {
    return moment(time).calendar();
  }

  if (isYesterday(moment(time))) {
    return moment(time).subtract(1, 'days').calendar();
  }

  if (isWithinAWeek(moment(time))) {
    return moment(time).format('dddd  h:mm');
  }

  if (isTwoWeeksOrMore(moment(time))) {
    return moment(time).format('L LT');
  }

  return moment(time).format('L LT');
}

export function getTimeDistance(type: string) {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    return [moment(now), moment(now.getTime() + (oneDay - 1000))];
  }

  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - day * oneDay;

    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
  }

  if (type === 'month') {
    const year = now.getFullYear();
    const month = now.getMonth();
    const nextDate = moment(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
    ];
  }

  const year = now.getFullYear();

  return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
}

export function getPlainNode(nodeList: any, parentPath = '') {
  const arr: any = [];
  nodeList.forEach((node: any) => {
    const item = node;
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });

  return arr;
}

function getRelation(str1: string, str2: string) {
  if (str1 === str2) {
    // console.warn('Two path are equal!'); // eslint-disable-line
  }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  }
  if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }

  return 3;
}

function getRenderArr(routes: any) {
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i += 1) {
    // 去重
    renderArr = renderArr.filter((item) => getRelation(item, routes[i]) !== 1);
    // 是否包含
    const isAdd = renderArr.every((item) => getRelation(item, routes[i]) === 3);
    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }

  return renderArr;
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path: string, routerData: any) {
  let routes = Object.keys(routerData).filter(
    (routePath) => routePath.indexOf(path) === 0 && routePath !== path
  );
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map((item) => item.replace(path, ''));
  // Get the route to be rendered to remove the deep rendering
  const renderArr = getRenderArr(routes);
  // Conversion and stitching parameters
  const renderRoutes = renderArr.map((item) => {
    const exact = !routes.some((route) => route !== item && getRelation(route, item) === 1);

    return {
      exact,
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
    };
  });

  return renderRoutes;
}

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export function getQueryPath(path = '', query = {}) {
  const search = stringify(query);
  if (search.length) {
    return `${path}?${search}`;
  }

  return path;
}

/* eslint no-useless-escape:0 */
const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path: string) {
  return reg.test(path);
}

export function formatWan(val: any) {
  const v = val * 1;
  if (!v || Number.isNaN(v)) return '';

  let result = val;
  if (val > 10000) {
    result = Math.floor(val / 10000);
    result = (
      <span>
        {result}
        <span
          style={{
            position: 'relative',
            top: -2,
            fontSize: 14,
            fontStyle: 'normal',
            lineHeight: 20,
            marginLeft: 2,
          }}
        >
          万
        </span>
      </span>
    );
  }

  return result;
}

export function isAntdPro() {
  return window.location.hostname === 'preview.pro.ant.design';
}

// 临时生MAP数据
export function tempMap(map: any, key: any, value: any) {
  const temp = map;
  temp[key] = value;

  return map;
}

// 读取map指
export function getValue(map: any, text: any) {
  return map[text];
}

// 设置深层嵌套List的值
/**
 *
 * @param {要修改的数据源} dataSource
 * @param {层级对象的某个键名} key
 * @param {要修改层级的id} id
 * @param {层级对象的某个键名对应的新值} data
 */
export function deepSet(dataSource: any, key: any, id: any, data: any) {
  const dataMap = FlattenJS.convert(dataSource);
  let dataPath = '';
  Object.keys(dataMap).forEach((element) => {
    if (dataMap[element] === id) {
      dataPath = element;
    }
  });
  dataPath = dataPath.slice(0, -2);
  dataPath += key;
  lodash.set(dataSource, dataPath, data);

  return dataSource;
}

export function thousandSeparator(value: any) {
  if (!lodash.isNumber(value)) return value;

  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 获取文档可见区域高度
 * type:0或undefined,不含滚动条尺寸；1,含滚动条尺寸
 * @param {*} type
 */
export function getDocSize(type: any) {
  let cHeight;
  let cWidth;
  const docBHeight = document.body.clientHeight;
  const docDHeight = document.documentElement.clientHeight;
  const docBWidth = document.body.clientWidth;
  const docDWidth = document.documentElement.clientWidth;
  if (window.innerHeight && window.innerWidth && type) {
    cHeight = window.innerHeight;
    cWidth = window.innerWidth;
  } else if (docBHeight && docDHeight && docBWidth && docDWidth) {
    cHeight = docBHeight < docDHeight ? docBHeight : docDHeight;
    cWidth = docBWidth < docDWidth ? docBWidth : docDWidth;
  } else {
    cHeight = document.body.offsetHeight;
    cWidth = document.body.offsetWidth;
  }

  return { height: cHeight, width: cWidth };
}

/**
 * 根据传入的秒数返回对应的 [时, 分, 秒]
 * @param  {Number} seconds1 必选，秒
 * @param  {Number} seconds2 可选，带此参数则返回 min(seconds1, seconds2) 对应的 [时, 分, 秒]
 * @return {Array}           [时, 分, 秒]
 */
export function getRemainingTime(seconds1: number, slaUnit?: string, seconds2?: number) {
  const remain: number = seconds2 ? Math.min(seconds1, seconds2) : seconds1;

  if (slaUnit === 'CD' || slaUnit === 'BD') {
    if ((remain / 3600) % 24 === 0) {
      return {
        remainDays: remain / 3600 / 24,
        remainHours: 0,
        remainMins: 0,
        remainSeconds: 0,
      };
    }
    return {
      remainDays: 0,
      remainHours: parseInt((remain / 3600).toString(), 10),
      remainMins: parseInt(((remain % 3600) / 60).toString(), 10),
      remainSeconds: (remain % 3600) % 60,
    };
  }
  return {
    remainDays: 0,
    remainHours: parseInt((remain / 3600).toString(), 10),
    remainMins: parseInt(((remain % 3600) / 60).toString(), 10),
    remainSeconds: (remain % 3600) % 60,
  };
}

/**
 * 根据传入的秒数返回对应的时间字符串
 * @param  {Number} seconds 必选，秒
 * @return {String}         时间字符串
 */
export function getRemainingTimeStr(seconds: number, slaUnit?: string, showRemainSeconds = false) {
  const { remainDays, remainHours, remainMins, remainSeconds } = getRemainingTime(seconds, slaUnit);
  // 返回具有一定格式的字符串，格式有：5h16min、10min、40s
  if (remainDays > 0) {
    return `${remainDays} day`;
  }

  const minSec = remainMins !== 0 ? `${remainMins}min` : `${remainSeconds}s`;
  if (!showRemainSeconds) {
    return remainHours !== 0 ? `${remainHours}h${Math.abs(remainMins)}min` : minSec;
  }
  return remainHours !== 0
    ? `${remainHours}h${Math.abs(remainMins)}min${Math.abs(remainSeconds)}s`
    : minSec;
}

/**
 * SLA 的remainTime相关格式化
 * @param {*} hours
 */
export function getEffectiveTime(hours: any) {
  let hourPart = 0;
  let remain = Number(hours);
  if (lodash.isNumber(remain)) {
    hourPart = Math.floor(remain);
  } else {
    remain = 0;
  }
  const minPartJust = Math.ceil(remain * 60);
  const minPart = Math.ceil((remain - hourPart) * 60);

  return remain < 1 ? `${minPartJust}min` : `${hourPart}h${minPart > 0 ? `${minPart}min` : ''}`;
}

export function policyItemName(list = [], value = '') {
  const object: any = list.find((item: any) => item.benefitItemCode === value);
  if (!object) {
    return null;
  }
  const result = `${object.benefitItemCode}-${object.benefitItemName}`;

  return result;
}

/**
 * 按指定长度截取字符串，超长加上...
 * @param {string} str
 * @param {number} len
 */
export function cutStr(str: string, len: number) {
  if (!lodash.isString(str)) return str;
  let strCount = 0;
  const strLen = str.length;
  let strCut = '';
  if (!str || !len) {
    return str;
  }
  for (let i = 0; i < strLen; i += 1) {
    const a = str.charAt(i);
    strCount += 1;
    if (encodeURI(a).length > 4) {
      // 中文字符的长度经编码之后大于4
      strCount += 1;
    }
    strCut = strCut.concat(a);
    // 扣除'...'占的长度
    if (strCount >= len - 3) {
      strCut = strCut.concat('...');

      return strCut;
    }
  }

  // 如果给定字符串小于指定长度，则返回源字符串；
  return str;
}

/**
 *计算字符串的实际占用长度
 * @param {string} str
 */
export function countStr(str: string) {
  let strCount = 0;
  const strLen = str.length;
  if (!str) {
    return strCount;
  }
  for (let i = 0; i < strLen; i += 1) {
    const a = str.charAt(i);
    strCount += 1;
    if (encodeURI(a).length > 4) {
      // 中文字符的长度经编码之后大于4
      strCount += 1;
    }
  }

  return strCount;
}

/**
 * 单词首字母大写(单词以空格或'/'隔开的句子)
 * @param {string} str
 * @param {boolean} humpStrict
 */
export function initialCapital(str: string, humpStrict?: boolean) {
  if (!lodash.isString(str)) {
    return str;
  }
  const temp = humpStrict ? str.toLowerCase() : str;
  return temp.replace(/(\s|\/|^)[a-z]/g, (L) => L.toUpperCase());
}

/**
 * 处理钱的格式(处理规则:满三位一个逗号;保留两位小数)
 * @param {number} num
 */
export function formattingMoney(num: number) {
  // 强制保留两位小数
  let f = parseFloat(num?.toString?.());
  if (Number.isNaN(f)) return false;
  f = Math.round(num * 100) / 100;
  let s = f.toString();
  let rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length < rs + 1 + 2) {
    s += '0';
  }
  // 每三位用一个逗号隔开
  let leftNum = s.split('.')[0];
  const rightNum = `.${s.split('.')[1]}`;
  let result;
  // 定义数组记录截取后的价格
  const resultArray = [];
  if (leftNum.length > 3) {
    let i = true;
    while (i) {
      resultArray.push(leftNum.slice(-3));
      leftNum = leftNum.slice(0, leftNum.length - 3);
      if (leftNum.length < 4) {
        i = false;
      }
    }
    // 由于从后向前截取，所以从最后一个开始遍历并存到一个新的数组，顺序调换
    const sortArray = [];
    for (let j = resultArray.length - 1; j >= 0; j -= 1) {
      sortArray.push(resultArray[j]);
    }
    result = `${leftNum},${sortArray.join(',')}${rightNum}`;
  } else {
    result = s;
  }
  return result;
}
/**
 * 验证请求response的错误类型
 * @param {} response
 */
export function validateResErrorTypeWarn(response: any) {
  return (
    response &&
    response.success === false &&
    response.resultData &&
    response.resultData?.['x-warn-nonce']
  );
}

export function validateResErrorTypePrompt(response: any) {
  return (
    response &&
    response.success === false &&
    response.resultData &&
    response.resultData?.['x-warn-prompt']
  );
}

export function validateResErrorTypeConfirm(response: any) {
  return response && response.warnData && response?.warnData['x-confirm-nonce'];
}

export function validateResErrorTypeError(response: any) {
  return (
    response &&
    response.success === false &&
    response.resultData &&
    (response.resultData?.['x-error-nonce'] || response?.warnData?.['x-error-nonce'])
  );
}

/**
 * 验证请求response的错误类型
 * @param {} response
 */
export function validateError(response: any) {
  return response && response.success === false && response.resultData === null;
}

/**
 * 安全解析JSON字符串
 * @method safeParseUtil
 * @param {string} target 需要转换的字符串
 * @param {any} defaultValue 可以是[]或{}
 * @return {object} 转换后的对象
 */
export const safeParseUtil = (target: any, defaultValue?: any) => {
  const tuple = safeParse(target);

  if (tuple[0]) {
    return defaultValue || {};
  }

  if (lodash.isArray(tuple[1]) && lodash.isArray(defaultValue)) {
    return tuple[1];
  }

  if (lodash.isPlainObject(tuple[1]) && (!defaultValue || lodash.isPlainObject(defaultValue))) {
    return tuple[1];
  }

  return tuple[1]; // TODO 待移除
  // return defaultValue || {};
};

/**
 * 判断是否为react element对象
 * @param element
 */
export const isReactElement = (element: any) =>
  lodash.isObject(element) && lodash.get(element, '$$typeof') === Symbol.for('react.element');

/**
 * 计算生日
 * @param birthDate
 * @param currentDate
 */
export const calcAge = (birthDate: any, currentDate: any) => {
  if (
    lodash.isNil(birthDate) ||
    lodash.isNil(currentDate) ||
    !moment(formUtils.queryValue(birthDate)).isValid() ||
    !moment(formUtils.queryValue(currentDate)).isValid()
  )
    return null;

  const current = moment(currentDate).isValid() ? currentDate : moment.now();

  const startDateBirth = moment(formUtils.queryValue(birthDate)).startOf('day');
  const startDateCurrent = moment(formUtils.queryValue(current)).startOf('day');
  // console.log(calcAge('1950/07/13', '2021/03/09'),'=====age');

  if (moment(startDateCurrent).isSameOrAfter(startDateBirth, 'year')) {
    const yearBirth = startDateBirth.year();
    const yearCurrent = startDateCurrent.year();

    const monthBirth = startDateBirth.month();
    const monthCurrent = startDateCurrent.month();

    const dayBirth = startDateBirth.day();
    const dayCurrent = startDateCurrent.day();

    if (monthCurrent >= monthBirth) {
      if (monthCurrent === monthBirth) {
        if (dayCurrent >= dayBirth) {
          return yearCurrent - yearBirth;
        }

        return yearCurrent - yearBirth - 1;
      }

      return yearCurrent - yearBirth;
    }

    return yearCurrent - yearBirth - 1;
  }

  return null;
};

/**
 * 计算输入值10的n次方
 * @param magnification
 * @param inputValue
 * @param reverse
 * @returns
 */

export const scaleByten = (
  magnification: number = 0,
  inputValue: number,
  reverse: boolean = false
): number => {
  const powerOften = reverse ? -magnification : magnification;
  return inputValue * 10 ** powerOften;
};

/**
 * 计算输入值n倍
 * @param magnification
 * @param input
 * @param reverse
 * @returns
 */

export const scaleByNumber = (
  magnification: number | null = 1,
  input: number | null,
  reverse: boolean = false
): number => {
  if (input === null || input === 0) {
    return 0;
  }
  const mag = lodash.isNull(magnification) ? 1 : magnification;
  return reverse ? input / mag : input * mag;
};
