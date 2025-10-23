import lodash, { isNumber, isNaN, isString } from 'lodash';

export default class DigitPrecision {
  precision = 2; // 默认精度，即保留两位小数

  /**
   * 设置初始化精度
   * @param {number|string|null} value
   */
  setPrecision = (value: any) => {
    if (!isNaN(+value)) this.precision = +value;
  };

  /**
   * 判断num是否为一个整数
   * @param {number|string|null} value
   */
  isInteger = (value: any) => {
    if (isNaN(value)) return false;
    const num = +value;

    return Math.floor(num) === num;
  };

  /**
   * 将一个浮点数转成整数，返回整数和倍数
   * @param {number|string|null} floatNum 如： 3.14
   * @returns {object} 如：{times:100, num: 314}
   */
  toInteger = (floatNum: any) => {
    const ret = { times: 1, num: 0 };
    if (this.isInteger(floatNum)) {
      ret.num = floatNum;

      return ret;
    }
    const strfi = `${floatNum}`;
    const dotPos = strfi.indexOf('.');
    const len = strfi.substr(dotPos + 1).length;
    const times = 10 ** len;
    ret.times = times;
    ret.num = +strfi.replace('.', '');

    return ret;
  };

  /**
   * 初始化算术计算数值
   * @param {number|string|null} prevValue
   * @param {number|string|null} nextValue
   */
  initCalcuNumber = (prevValue: any, nextValue: any) => {
    const numA = Number(prevValue);
    const numB = Number(nextValue);
    if (isNaN(numA) || isNaN(numB)) {
      return null;
      // throw Error(`method of initCalcuNumber's param is illigal`);
    }
    const objectNumberA = this.toInteger(numA);
    const objectNumberB = this.toInteger(numB);
    const numberA = objectNumberA.num;
    const numberB = objectNumberB.num;
    const timesA = objectNumberA.times;
    const timesB = objectNumberB.times;
    const timesMax = timesA > timesB ? timesA : timesB;

    return { numberA, numberB, timesA, timesB, timesMax };
  };

  /**
   * 加
   * @param {number|string|null} prevValue
   * @param {number|string|null} nextValue
   */
  add = (prevValue: number, nextValue: number): number => {
    let result = null;
    const calcuNumber = this.initCalcuNumber(prevValue, nextValue);
    if (calcuNumber === null) {
      return 0;
    }
    const { numberA, numberB, timesA, timesB, timesMax } = calcuNumber;
    if (timesA === timesB) {
      // 两个小数位长度相同
      result = numberA + numberB;
    } else if (timesA > timesB) {
      // numberA 小数位长度 大于 numberB
      result = numberA + numberB * (timesA / timesB);
    } else {
      // numberA 小数位长度 小于 numberB
      result = numberA * (timesB / timesA) + numberB;
    }

    return result / timesMax;
  };

  /**
   * 减
   * @param {number|string|null} prevValue
   * @param {number|string|null} nextValue
   */
  subtract = (prevValue: number, nextValue: number): number => {
    let result = null;
    const calcuNumber = this.initCalcuNumber(prevValue, nextValue);
    if (calcuNumber === null) {
      return 0;
    }
    const { numberA, numberB, timesA, timesB, timesMax } = calcuNumber;
    if (timesA === timesB) {
      result = numberA - numberB;
    } else if (timesA > timesB) {
      result = numberA - numberB * (timesA / timesB);
    } else {
      result = numberA * (timesB / timesA) - numberB;
    }

    return result / timesMax;
  };

  /**
   * 乘
   * @param {number|string|null} prevValue
   * @param {number|string|null} nextValue
   */
  multiply = (prevValue: number, nextValue: number): number => {
    const calcuNumber = this.initCalcuNumber(prevValue, nextValue);
    if (calcuNumber === null) {
      return 0;
    }
    const { numberA, numberB, timesA, timesB } = calcuNumber;

    return (numberA * numberB) / (timesA * timesB);
  };

  /**
   * 除
   * @param {number|string|null} prevValue
   * @param {number|string|null} nextValue
   */
  divide = (prevValue: number, nextValue: number): number => {
    const calcuNumber = this.initCalcuNumber(prevValue, nextValue);
    if (calcuNumber === null) {
      return 0;
    }
    const { numberA, numberB, timesA, timesB } = calcuNumber;

    return (numberA / numberB) * (timesB / timesA);
  };

  /**
   * 不舍入取精度
   * @param {number|string|null} value 需要取精度的数字或字符串类型的数字
   * @param {number} precisionCustomer 自定义精度，若不传则使用默认的precision
   */
  precisionEnsure = (value: number, precisionCustomer: number) => {
    if (isNaN(+value)) return null;
    const num = +value;
    const precision = isNumber(precisionCustomer) ? precisionCustomer : this.precision;
    const times = 10 ** precision;

    return this.divide(Math.floor(this.multiply(num, times)), times);
  };

  /**
   * 银行家舍入取精度
   * @param {number|string|null} value 需要取精度的数字或字符串类型的数字
   * @param {number} precisionCustomer 自定义精度，若不传则使用默认的precision
   */
  precisionBankerEnsure = (value: number, precisionCustomer: number) => {
    if (isNaN(+value)) return null;
    const num = +value;
    const precision = isNumber(precisionCustomer) ? precisionCustomer : this.precision;
    const times = 10 ** precision;
    return this.divide(+this.multiply(num, times).toFixed(0), times);
  };

  /**
   * 不舍入取精度
   * @param {number|string|null} value 需要取精度的数字或字符串类型的数字
   * @param {number} precisionCustomer 自定义精度，若不传则使用默认的precision
   */
  fnKeepPrecision = (value: any, precisionCustomer?: number) => {
    if (!isNumber(value) && !isString(value)) return null;
    const result = `${value}`;
    let len = isNumber(precisionCustomer) ? precisionCustomer : this.precision;
    const period = result.indexOf('.');
    len += len === 0 ? period : period + 1;

    return period > 0 ? result.substring(0, len) : result;
  };

  /**
   * 格式化InputNumber表单控件显示的值（带千分位）
   * @param {number|string|null} value 需格式化的值
   * @param {number} precisionCustomer 值的精度
   */
  fnPrecisionFormat = (value: number | string, precisionCustomer?: number) => {
    if (isNaN(+value)) return null;
    let result = `${this.fnKeepPrecision(value, precisionCustomer)}`;
    result = result
      .replace(new RegExp(',*', 'g'), '')
      .replace(/\B(?<!(\.\d+))(?=(\d{3})+\b)/g, ',');

    return result;
  };
  /**
   * 格式化InputNumber表单控件显示的值（无千分位，带百分号）
   * @param {number|string|null} value 需格式化的值
   * @param {number} precisionCustomer 值的精度
   */
  fnPrecisionPerFormat = (value: number, precisionCustomer: number) => {
    if (isNaN(+value)) return null;
    return `${this.fnKeepPrecision(value, precisionCustomer)}%`;
  };

  formatWithPeriod = (value: any, precisionCustomer?: number) => {
    if (!isNumber(value) && !isString(value)) return null;
    let result: any = `${value}`;
    const len = isNumber(precisionCustomer) ? precisionCustomer : this.precision;
    const period = result.indexOf('.');
    result = fnPrecisionFormat(value, precisionCustomer);
    if (result && len && period === -1) {
      const zero = [];
      for (let i = 0; i < len; i++) {
        zero.push('0');
      }
      zero.unshift('.');
      return [result].concat(zero).join('');
    }
    // 添加小数点后补0的场景
    if (period !== -1 && lodash.split(String(result), '.')?.[1].length < len) {
      return `${lodash.split(String(result), '.')?.[0]}.${
        lodash.split(String(result), '.')?.[1]
      }${new Array(len - lodash.split(String(result), '.')?.[1].length).fill(0).join('')}`;
    }

    return result;
  };

  /**
   * 解析InputNumber表单控件格式化（千分位）后的值
   * @param {number|string|null} value 需解析的值
   * @param {number} precisionCustomer 值的精度
   */
  fnPrecisionParser = (value: number, precisionCustomer: number) => {
    if (!isNumber(value) && !isString(value)) return null;
    const result = `${value}`.replace(new RegExp(/\$\s?|(,*)/g), '');
    return this.fnKeepPrecision(result, precisionCustomer);
  };

  /**
   * 不舍入取精度
   * @param {number|string|null} value 需要取精度的数字或字符串类型的数字
   * @param {number} precisionCustomer 自定义精度，若不传则使用默认的precision
   */
  fnKeepPrecisionNegative = (value: any, precisionCustomer: number) => {
    if (!isNumber(value) && !isString(value)) return null;
    let result = `${value}`;
    let len = isNumber(precisionCustomer) ? precisionCustomer : this.precision;
    const period = result.indexOf('.');
    const negativePosition = result.indexOf('-');
    const isNegative = negativePosition !== -1 && negativePosition === 0;
    len += len === 0 ? period : period + 1;

    if (isNegative) {
      result = result.substr(1);
      return period > 0 ? `-${result.substring(0, len)}` : `-${result}`;
    }

    return period > 0 ? result.substring(0, len) : result;
  };

  /**
   * 格式化InputNumber表单控件显示的值（带千分位）
   * @param {number|string|null} value 需格式化的值
   * @param {number} precisionCustomer 值的精度
   */
  fnPrecisionFormatNegative = (value: number, precisionCustomer: number) => {
    if (isNaN(+value)) return null;
    let result = `${this.fnKeepPrecisionNegative(value, precisionCustomer)}`;

    const negativePosition = result.indexOf('-');
    const isNegative = negativePosition !== -1 && negativePosition === 0;

    if (isNegative) {
      result = result.substr(1);
      return `-${result
        .replace(new RegExp(',*', 'g'), '')
        .replace(/\B(?<!(\.\d+))(?=(\d{3})+\b)/g, ',')}`;
    }
    // return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return result.replace(new RegExp(',*', 'g'), '').replace(/\B(?<!(\.\d+))(?=(\d{3})+\b)/g, ',');
  };

  /**
   * 解析InputNumber表单控件格式化（千分位）后的值
   * @param {number|string|null} value 需解析的值
   * @param {number} precisionCustomer 值的精度
   */
  fnPrecisionParserNegative = (value: number, precisionCustomer: number) => {
    if (!isNumber(value) && !isString(value)) return null;
    const result = `${value}`.replace(new RegExp(/\$\s?|(,*)/g), '');
    return this.fnKeepPrecisionNegative(result, precisionCustomer);
  };
}

export const PRECISION = new DigitPrecision();

export const {
  add,
  subtract,
  multiply,
  divide,
  precision,
  precisionEnsure,
  precisionBankerEnsure,
  fnPrecisionFormat,
  fnPrecisionPerFormat,
  fnPrecisionParser,
  fnKeepPrecision,
  fnKeepPrecisionNegative,
  fnPrecisionFormatNegative,
  fnPrecisionParserNegative,
  formatWithPeriod,
} = PRECISION;
