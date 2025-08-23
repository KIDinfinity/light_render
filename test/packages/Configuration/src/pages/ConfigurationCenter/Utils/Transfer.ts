import moment from 'moment';
import lodash from 'lodash';
import { v5 as uuidv5 } from 'uuid';
import { LS, LSKey } from '@/utils/cache';
import { safeParseUtil } from '@/utils/utils';
import { Format, ShowSearchIdx, DataImageField, WhereOperator } from './Constant';
import type { SearchComponentProps, DataFieldProps, DropDownProps, CascaderProps } from './Typings';
import FormItem from './FormItem';

interface TransferSearchProps {
  dropdownList: DropDownProps[];
  description: boolean;
  searchComponentList?: SearchComponentProps[];
}

class Transfer {
  // 处理值转换
  tranferResult = (
    fieldList: DataFieldProps[] = [],
    current: any = {},
    format: boolean = false
  ) => {
    const res = lodash.keys(current).reduce((pre, cur) => {
      const dataField = lodash.find(fieldList, (item) => item.fieldName === cur);
      const { componentType = '' } = dataField || {};
      const formatString = Format[componentType];
      let values: any = lodash.get(current, cur);
      const errors = lodash.get(values, 'errors');

      if (
        Object.prototype.toString.call(values) === '[object Object]' &&
        !errors &&
        !moment.isMoment(values) &&
        !new RegExp(/json/).test(componentType)
      ) {
        values = lodash.get(values, 'value');
      }
      if (!errors) {
        if (new RegExp(/date_range|date_time_range/).test(componentType)) {
          if (lodash.isString(values)) {
            values = values?.split(',');
          }
          values = format
            ? lodash.map(values, (item: any) => moment(item)?.format(formatString))
            : values;
        } else if (new RegExp(/date/).test(componentType)) {
          if (moment.isMoment(values)) {
            values = format ? values.format(formatString) : values;
          } else if (!lodash.isNaN(Date.parse(values))) {
            values = format ? moment(values).format(formatString) : moment(values);
          } else {
            values = null;
          }
        }
        if (new RegExp(/boolean/).test(componentType)) {
          values = values === '1' || values === 1 || values === true;
        }
        if (new RegExp(/number/).test(componentType) && (values || values === 0)) {
          values = !lodash.isNaN(Number(values)) ? Number(values) : values;
        }
        if (new RegExp(/multi_drop_down/).test(componentType)) {
          if (format) {
            values = lodash.isArray(values) ? values.join(',') : values;
          } else if (!format) {
            values = values && lodash.isString(values) ? values.split(',') : values;
          }
          if (!values) {
            values = format ? '' : [];
          }
        }
        // componentType 为 json
        //  - 当 format 为 true  时：将 values.value 转换成非缩进字符串格式
        //  - 当 format 为 false 时：
        //    - 当 values 不为 object 时：将 values 转换成带缩进字符串格式
        //    - 当 values 为 object 时：values.value
        if (new RegExp(/json/).test(componentType)) {
          if (format) {
            values = JSON.stringify(safeParseUtil(values));
          } else if (!lodash.isObject(values)) {
            try {
              const temp = JSON.stringify(safeParseUtil(values), null, 2);
              values = !lodash.isEmpty(temp) && temp !== 'null' ? temp : '';
            } catch (error) {
              // do nothing
            }
          } else {
            values = lodash.get(values, 'value');
          }
        }
      }
      lodash.set(pre, cur, values);
      return pre;
    }, {});
    return res;
  };

  formatDateRange = (input) => {
    let result = [];

    if (/^\d{4}$/.test(input)) {
      result = [
        moment(input, 'YYYY').startOf('year').format('YYYY-MM-DD'),
        moment(input, 'YYYY').endOf('year').format('YYYY-MM-DD'),
      ];
    } else if (/^\d{4}[- ]?[A-Za-z0-9]{2,9}$/.test(input)) {
      const formattedInput = moment(input, ['YYYY-MM', 'YYYY-MMM', 'YYYY-MMMM'], true);
      if (formattedInput.isValid()) {
        result = [
          formattedInput.startOf('month').format('YYYY-MM-DD'),
          formattedInput.endOf('month').format('YYYY-MM-DD'),
        ];
      }
    } else if (/^\d{4}[- ]?[A-Za-z0-9]{2,9}[- ]?\d{1,2}$/.test(input)) {
      const formattedInput = moment(input, ['YYYY-MM-DD', 'YYYY-MMM-DD', 'YYYY-MMMM-DD'], true);
      if (formattedInput.isValid()) {
        result = [formattedInput.format('YYYY-MM-DD'), formattedInput.format('YYYY-MM-DD')];
      }
    } else if (/^\d{4}[- ]?[A-Za-z0-9]{2,9}[- ]?\d{1,2}[- ]?\d{1,2}$/.test(input)) {
      const formattedInput = moment(
        input,
        ['YYYY-MM-DD-HH', 'YYYY-MMM-DD-HH', 'YYYY-MMMM-DD-HH'],
        true
      );
      if (formattedInput.isValid()) {
        result = [
          formattedInput.startOf('hour').format('YYYY-MM-DD HH:mm:ss'),
          formattedInput.endOf('hour').format('YYYY-MM-DD HH:mm:ss'),
        ];
      }
    } else if (/^\d{4}[- ]?[A-Za-z0-9]{2,9}[- ]?\d{1,2}[- ]?\d{1,2}[- ]?\d{1,2}$/.test(input)) {
      const formattedInput = moment(
        input,
        ['YYYY-MM-DD-HH-mm', 'YYYY-MMM-DD-HH-mm', 'YYYY-MMMM-DD-HH-mm'],
        true
      );
      if (formattedInput.isValid()) {
        result = [
          formattedInput.startOf('minute').format('YYYY-MM-DD HH:mm:ss'),
          formattedInput.endOf('minute').format('YYYY-MM-DD HH:mm:ss'),
        ];
      }
    } else if (/^[A-Za-z]{3,9}$/.test(input)) {
      const formattedInput = moment(input, ['MMM', 'MMMM'], true);
      if (formattedInput.isValid()) {
        result = [
          formattedInput.startOf('month').format('YYYY-MM-DD'),
          formattedInput.endOf('month').format('YYYY-MM-DD'),
        ];
      }
    } else {
      result = ['无效的日期格式', ''];
    }

    return result;
  };

  tranferValueSingle = (
    fieldConfig: DataFieldProps[] = [],
    value: any = '',
    format: boolean = false
  ) => {
    const { componentType = '' } = fieldConfig || {};
    const formatString = Format[componentType];
    let values: any = value;
    const errors = lodash.get(values, 'errors');

    if (
      Object.prototype.toString.call(values) === '[object Object]' &&
      !errors &&
      !moment.isMoment(values) &&
      !new RegExp(/json/).test(componentType)
    ) {
      values = lodash.get(values, 'value');
    }
    if (!errors) {
      if (new RegExp(/date_range|date_time_range/).test(componentType)) {
        if (lodash.isString(values) && values.includes(',')) {
          values = values?.split(',');
          values = format
            ? lodash.map(values, (item: any) => moment(item)?.format(formatString))
            : values;
        } else {
          values = this.formatDateRange(values);
        }
      } else if (new RegExp(/date/).test(componentType)) {
        if (moment.isMoment(values)) {
          values = format ? values.format(formatString) : values;
        } else if (!lodash.isNaN(Date.parse(values))) {
          values = format ? moment(values).format(formatString) : moment(values);
        } else {
          values = null;
        }
      }
      if (new RegExp(/boolean/).test(componentType)) {
        values = values === '1' || values === 1 || values === true;
      }
      if (new RegExp(/number/).test(componentType) && (values || values === 0)) {
        values = !lodash.isNaN(Number(values)) ? Number(values) : values;
      }
      if (new RegExp(/multi_drop_down/).test(componentType)) {
        if (format) {
          values = lodash.isArray(values) ? values.join(',') : values;
        } else if (!format) {
          values = values && lodash.isString(values) ? values.split(',') : values;
        }
        if (!values) {
          values = format ? '' : [];
        }
      }
      // componentType 为 json
      //  - 当 format 为 true  时：将 values.value 转换成非缩进字符串格式
      //  - 当 format 为 false 时：
      //    - 当 values 不为 object 时：将 values 转换成带缩进字符串格式
      //    - 当 values 为 object 时：values.value
      if (new RegExp(/json/).test(componentType)) {
        if (format) {
          values = JSON.stringify(safeParseUtil(values));
        } else if (!lodash.isObject(values)) {
          try {
            const temp = JSON.stringify(safeParseUtil(values), null, 2);
            values = !lodash.isEmpty(temp) && temp !== 'null' ? temp : '';
          } catch (error) {
            // do nothing
          }
        } else {
          values = lodash.get(values, 'value');
        }
      }
    }

    return values;
  };

  // 处理默认值
  getDefaultObject = (arr: DataFieldProps[]) =>
    arr.reduce((pre, cur) => {
      const { defaultValue, componentType, fieldName, minSearchValue } = cur;
      lodash.set(pre, fieldName, this.transferDefault(defaultValue, componentType));
      lodash.set(pre, minSearchValue, this.transferDefault(minSearchValue, componentType));
      return pre;
    }, {});

  // 处理默认值 defaultValue/minSearchValue
  transferDefault = (defaultValue: string = '', componentType: string = '') => {
    const now = moment(new Date());
    const { userId } = LS.getItem(LSKey.CURRENTUSER) || {};
    const regExp = new RegExp(
      /\$\{(minus_days_[1-9][0-9]*|minus_months_[1-9][0-9]*|plus_days_[1-9][0-9]*|plus_months_[1-9][0-9]*)\}/,
      'g'
    );

    if (!lodash.isString(defaultValue)) {
      return defaultValue;
    }

    let newDefaultValue = defaultValue;
    const matches = defaultValue ? defaultValue.match(regExp) : [];

    lodash.forEach(matches, (value: string) => {
      const matchNumber = value.match(/\d+/g)?.[0];
      newDefaultValue = newDefaultValue
        .replace(
          new RegExp(/\$\{minus_days_[1-9][0-9]*\}/, 'g'),
          moment().subtract(matchNumber, 'days').format(Format[componentType])
        )
        .replace(
          new RegExp(/\$\{minus_months_[1-9][0-9]*\}/, 'g'),
          moment().subtract(matchNumber, 'months').format(Format[componentType])
        )
        .replace(
          new RegExp(/\$\{plus_days_[1-9][0-9]*\}/, 'g'),
          moment().add(matchNumber, 'days').format(Format[componentType])
        )
        .replace(
          new RegExp(/\$\{plus_months_[1-9][0-9]*\}/, 'g'),
          moment().add(matchNumber, 'months').format(Format[componentType])
        );
    });

    newDefaultValue = newDefaultValue
      .replace(new RegExp(/\$\{(uuid|trans_id)}/, 'g'), uuidv5(JSON.stringify(now), uuidv5.URL))
      .replace(
        new RegExp(/\$\{(current_date|current_day|current_time|current_timestamp)\}/, 'g'),
        now.format(Format[componentType])
      )
      .replace(new RegExp(/\$\{(user_id|current_user)\}/, 'g'), userId)
      .replace(
        new RegExp(/\$\{current_month\}/, 'g'),
        now.startOf('month').format(Format[componentType])
      )
      .replace(
        new RegExp(/\$\{first_date_of_year\}/, 'g'),
        moment().startOf('year').format(Format[componentType])
      )
      .replace(
        new RegExp(/\$\{first_date_of_month\}/, 'g'),
        moment().startOf('month').format(Format[componentType])
      );
    return newDefaultValue;
  };

  /**
   * 初始化SearchComponent
   * 区间改key
   */
  transferSearchComponent = (props: TransferSearchProps) => {
    const { searchComponentList = [], dropdownList = [], description = true } = props;
    if (lodash.isArray(searchComponentList)) {
      return lodash.map(searchComponentList, (el: SearchComponentProps, idx: number) => {
        // 找不到组件时默认文本
        if (!FormItem[el.componentType]) {
          lodash.set(el, 'componentType', 'text');
        }
        const {
          whereOperator,
          defaultValue,
          componentType,
          fieldName,
          fieldNameArray,
          minSearchValue,
        } = el;
        const newDefaultValue = this.transferDefault(defaultValue, componentType);
        const newMinSearchValue = this.transferDefault(minSearchValue, componentType);
        lodash.set(el, 'defaultValue', newDefaultValue);
        lodash.set(el, 'minSearchValue', newMinSearchValue);
        if (whereOperator === WhereOperator.between) {
          const formatDefalutValue = newDefaultValue
            ? lodash
                .chain(newDefaultValue)
                .split(',')
                .map((item) => (item ? moment(item) : item))
                .value()
            : newDefaultValue;
          lodash.set(
            el,
            'defaultValue',
            // (defaultValue && defaultValue.split(',')) || new Array(2).fill('')
            formatDefalutValue
          );
          lodash.set(el, 'componentType', `${componentType}_range`);
          if (new RegExp(/text|number/).test(componentType) && !lodash.isArray(fieldNameArray)) {
            lodash.set(el, 'fieldNameArray', [`${fieldName}_first`, `${fieldName}_second`]);
          }
        }
        if (idx > ShowSearchIdx) {
          lodash.set(el, 'simple', true);
        }

        const currentDropDown = this.getFieldDropDown(dropdownList, fieldName);
        if (currentDropDown) {
          lodash.set(el, 'dropdownDatas', currentDropDown);
        }

        if (!description) {
          lodash.set(el, 'description', null);
        }

        return el;
      });
    }
    return [];
  };

  transferCurrent = (record: any, status: string = '') => {
    return lodash.keys(record).reduce((newRecord: any, cur: string) => {
      if (!lodash.includes(DataImageField, cur) || lodash.toLower(status) === 'draft') {
        lodash.set(newRecord, cur, lodash.get(record, cur));
      }
      return newRecord;
    }, {});
  };

  transferDataField = (props: any) => {
    const {
      dataFieldList = [],
      dropdownList = [],
      cascaderList = [],
      isDataImageVisible = false,
      taskNotEditable = true,
      description = true,
      DataImageFieldFilter = true,
    } = props;
    return lodash.map(lodash.cloneDeep(dataFieldList), (item: DataFieldProps) => {
      const { fieldName } = item;
      const currentDropDown = this.getFieldDropDown(dropdownList, fieldName);
      const currentCascader = this.getFieldCascader(cascaderList, fieldName);
      // modal dataImage field show or hide
      if (lodash.includes(DataImageField, fieldName) && DataImageFieldFilter) {
        lodash.set(item, 'visible', isDataImageVisible);
      }
      if (currentDropDown) {
        lodash.set(item, 'dropdownDatas', currentDropDown);
      }
      if (currentCascader) {
        lodash.set(item, 'cascaderDatas', currentCascader);
      }
      if (lodash.has(props, 'taskNotEditable')) {
        lodash.set(item, 'editable', !taskNotEditable && item.editable);
      }
      if (!description) {
        lodash.set(item, 'description', null);
      }
      return item;
    });
  };

  getFieldDropDown = (dropdownList: DropDownProps[], fieldName: string) =>
    lodash
      .chain(dropdownList)
      .find((el: DropDownProps) => el.fieldName === fieldName)
      .get('dropdownDatas')
      .value();

  getFieldCascader = (cascaderList: CascaderProps[], fieldName: string) =>
    lodash
      .chain(cascaderList)
      .find((el: CascaderProps) => el.fieldName === fieldName)
      .get('cascaderDatas')
      .value();

  childFind = (values: any, list: any, level: number, nameList: any): any => {
    const { length } = values;
    if (level > length) return nameList;
    const current = lodash.find(list, (item: any) => item?.organizationCode === values[level - 1]);
    if (current) {
      if (current?.children && lodash.size(current?.children)) {
        nameList.push(current?.organizationName);
        return this.childFind(values, current?.children, level + 1, nameList);
      }
      nameList.push(current?.organizationName);
      return nameList;
    }
    return nameList;
  };

  transferCascaderResult = (values: any, cascaderDatas: any) => {
    return this.childFind(values, cascaderDatas, 1, []);
  };
}

export const {
  tranferResult,
  transferDefault,
  transferCascaderResult,
  transferSearchComponent,
  getDefaultObject,
  transferCurrent,
  transferDataField,
  tranferValueSingle,
} = new Transfer();
