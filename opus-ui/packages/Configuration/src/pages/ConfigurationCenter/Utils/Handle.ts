import lodash from 'lodash';
import type { DataFieldProps, FunctionDataProps } from './Typings';
import { FuncHistoryCode, FilterSortField, FunFunctionMenuCode } from './Constant';
import { HistoryColumn } from '../History/Column';

class Handle {
  // 获取DataImage ids
  getDataImageIdList = (row: any[] = []) => {
    return row.reduce((arr, cur) => {
      cur.id && arr.push(cur.id);
      return arr;
    }, []);
  };

  // 获取dataFiled驼峰名称
  getNamesBase = (name: string): string =>
    lodash
      .map(name.split('_'), (value, index) =>
        index > 0 ? value.charAt(0).toUpperCase() + value.slice(1) : value
      )
      .join('');

  // 更新field
  // dropdown联动更改其他field数据
  updateCurrentField = (changeValue: any, dataFieldList: DataFieldProps[] = []) => {
    let res;
    const keyFir = lodash.keys(changeValue)[0];
    const currentFiled = dataFieldList.find((item: DataFieldProps) => item?.fieldName === keyFir);
    if (currentFiled && currentFiled.componentType === 'dropdown' && currentFiled.dropdownDatas) {
      const temp = currentFiled.dropdownDatas.find(
        (key) => key[lodash.keys(key)[0]] === changeValue[keyFir].value
      );
      res = lodash.keys(temp).reduce((pre, cur) => {
        if (dataFieldList.find((item: DataFieldProps) => item?.fieldName === cur)) {
          lodash.set(pre, cur, temp[cur]);
        }
        return pre;
      }, {});
    }
    const changeField = lodash.keys(changeValue).reduce((pre, cur) => {
      lodash.set(pre, cur, changeValue[cur].value);
      return pre;
    }, {});
    return {
      ...changeField,
      ...res,
    };
  };

  filterDropDown = (
    dropDownData: any[] = [],
    functionCode: string = '',
    fieldName: string = '',
    currentCode: string = ''
  ) => {
    if (
      functionCode === FunFunctionMenuCode &&
      fieldName === FilterSortField &&
      currentCode === FuncHistoryCode
    ) {
      return dropDownData.filter((item: any) => {
        const value = lodash.chain(lodash.values(item)).head().value();
        const fieldKey = value ? value.split(' ')[0] : '';
        return lodash.includes(HistoryColumn, fieldKey);
      });
    }
    return dropDownData;
  };

  // 级联菜单更新
  handlerQueryDropDown = (
    functionData: FunctionDataProps,
    changeDropList: DataFieldProps[] = [],
    current: any,
    record: any
  ) => {
    const newCurrent = { ...current };
    const { function_code: currentCode } = record;
    const { dataFieldList = [], functionCode } = functionData;
    const newDataField = lodash.map(dataFieldList, (item) => {
      const targetField = changeDropList.find((resItem) => resItem?.fieldName === item?.fieldName);
      let newItem = { ...item };
      if (targetField && targetField.dropdownDatas) {
        newItem = lodash.assign(item, {
          // componentType: 'dropdown',
          dropdownDatas: this.filterDropDown(
            targetField.dropdownDatas,
            functionCode,
            item?.fieldName,
            currentCode
          ),
        });
        let targetValue = lodash.get(newCurrent, newItem?.fieldName);
        if (targetValue) {
          targetValue = targetValue && targetValue.value ? targetValue.value : targetValue;
          const isExitValue =
            targetField.dropdownDatas &&
            targetField.dropdownDatas.find(
              (itemEl: any) => lodash.get(itemEl, lodash.keys(itemEl)[0]) === targetValue
            );
          if (!isExitValue && targetField.dropdownDatas) {
            lodash.set(newCurrent, newItem?.fieldName, '');
          }
        }
      }
      return newItem;
    });
    return {
      newDataField,
      newCurrent,
    };
  };
}

export const {
  getDataImageIdList,
  getNamesBase,
  updateCurrentField,
  handlerQueryDropDown,
} = new Handle();
