/**
 * 工具 - 格式化
 */
import lodash from 'lodash';

interface IParams {
  formatter?: any;
  parser?: any;
  precision?: number;
  accuracyItem?: any;
  freePrecision?: boolean;
  defaultParser?: boolean;
}

class FormateTools {
  params = {
    precision: 2,
    freePrecision: false,
  };

  /**
   * 参数说明
   * @param formatter - 格式化处理
   * @param parser - 格式化返回数字处理
   * @param precision - 保留小数位数
   * @param accuracyItem - 匹配的格式化对象
   */
  constructor(params: IParams) {
    this.params = lodash.merge({}, this.params, params);
  }

  /**
   * 获取小数点
   * return 小数点位数
   */
  getDecimalDigits() {
    const { accuracyItem, precision }: IParams = this.params;

    return lodash.isEmpty(accuracyItem) ? precision : accuracyItem?.accuracyScale;
  }

  /**
   * 获取格式化内容
   * @param value - item值
   * retrun 格式化后的值
   */
  getFormatter(value: any) {
    const { accuracyItem, formatter, precision }: IParams = this.params;
    if (!value) return '';
    if (lodash.isFunction(formatter)) return formatter(value, precision);
    if (formatter && !lodash.isEmpty(formatter)) return value.replace(formatter, '');

    let formaterMode = {
      value,
      precision,
      thousandssSeparator: ',',
    };

    if (!lodash.isEmpty(accuracyItem) && accuracyItem.enablethousandssSeparator === 'Y') {
      formaterMode = {
        value,
        precision: accuracyItem?.accuracyScale,
        thousandssSeparator: accuracyItem?.thousandssSeparator,
      };
    }
    return this.getThousandsFormat(formaterMode);
  }

  /**
   * formatter转化为数字
   * @param value - item值
   * retrun 处理后存储到redux的值
   */
  getParser = (value: any) => {
    const { accuracyItem, parser, precision, defaultParser = false }: IParams = this.params;

    if (defaultParser) {
      return parser(value);
    }

    if (!lodash.isNumber(value) && !lodash.isString(value)) return null;

    const result = `${value}`.replace(new RegExp(/\$\s?|(,*)/g), '');

    if (!lodash.isEmpty(accuracyItem) && accuracyItem.enablethousandssSeparator === 'Y') {
      return this.fnKeepPrecision(result, accuracyItem?.accuracyScale);
    }

    if (parser && !lodash.isEmpty(parser)) {
      return result.replace(parser, '');
    }
    return this.fnKeepPrecision(result, precision);
  };

  /**
   * 格式化 - 千分位
   * @param {number|string|null} value 需格式化的值
   * @param {number} precision 值的精度
   * @param {string} thousandssSeparator 千分位符号
   */
  getThousandsFormat({ value, precision, thousandssSeparator }: any): string {
    if (lodash.isNaN(+value)) return '';
    // eslint-disable-next-line class-methods-use-this
    const result = `${this.fnKeepPrecision(value, precision)}`;

    return result
      .replace(new RegExp(',*', 'g'), '')
      .replace(/\B(?<!(\.\d+))(?=(\d{3})+\b)/g, `${thousandssSeparator || ','}`);
  }

  /**
   * 保留小数精确方式
   * @param {number|string|null} value 需要取精度的数字或字符串类型的数字
   * @param {number} precision 自定义精度，若不传则使用默认的precision
   */
  fnKeepPrecision(value: any, precision: number) {
    if (!lodash.isNumber(value) && !lodash.isString(value)) return null;
    if (this.params?.freePrecision) return value;
    const result = `${value}`;
    const { accuracyItem }: IParams = this.params;
    let newPrecision = precision;
    if (!lodash.isEmpty(accuracyItem)) {
      newPrecision = accuracyItem.accuracyScale;
    }
    let len = Number(newPrecision);
    const period = result.indexOf('.');
    len += len === 0 ? period : period + 1;

    return period > 0 ? result.substring(0, len) : result;
  }

  /**
   * 失焦补位小数点
   * @param value - 需要处理的数字
   */
  getComplementValue(value: number) {
    const { accuracyItem, precision }: IParams = this.params;
    const result = `${value}`;

    let formaterMode = {
      value: Number(value).toFixed(precision),
      precision,
      thousandssSeparator: ',',
    };

    if (!lodash.isEmpty(accuracyItem) && result.split('.')[1] && result.split('.')[1].length > 0) {
      const { accuracyScale }: any = accuracyItem;
      formaterMode = {
        value: Number(value).toFixed(accuracyScale),
        precision: accuracyItem?.accuracyScale,
        thousandssSeparator: accuracyItem?.thousandssSeparator,
      };
    }

    return this.getThousandsFormat(formaterMode);
  }
}
export default FormateTools;
const FormateEP = new FormateTools({
  precision: 2,
});
export { FormateEP };
