import moment from 'moment';
import type { ReactNode } from 'react';
import React from 'react';
import lodash from 'lodash';
import { Button, Popover } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { DataFieldProps, SortOrderProps } from './Typings';
import { ColumnWidth, RenderText, WhereOperator } from './Constant';
import { sortSeq } from './Common';
import { RuleFun } from 'basic/components/Form';
import FormItem from './FormItem';
import styles from './index.less';

interface ColumnsProps {
  dataFieldList: DataFieldProps[];
  columnsFilter: any;
  camelCase?: boolean;
  defaultSort?: string;
}

class ComponentUtils {
  // 获取表头
  getColumns = (props: ColumnsProps, config: any = {}) => {
    const { dataFieldList = [], columnsFilter = {}, camelCase = false, defaultSort } = props;
    const sortArr = this.getDefaultSort(defaultSort);
    
    const res = lodash
      .chain(lodash.cloneDeep(dataFieldList))
      .sort(sortSeq(config.sort || 'columnSeq'))
      .filter((el) => el.visible && (lodash.isEmpty(columnsFilter) || columnsFilter[el.fieldName]))
      .map((el) => {
        const { common, max, min } = ColumnWidth;
        // @ts-ignore
        let columnSize = el?.columnSize || el?.fieldSize || common;
        if (columnSize < min) {
          columnSize = min;
        } else if (columnSize > max) {
          columnSize = max;
        }

        const columns = {
          title: el.fieldCaption,
          dataIndex: camelCase ? lodash.camelCase(el.fieldName) : el.fieldName,
          key: camelCase ? lodash.camelCase(el.fieldName) : el.fieldName,
          sorter: !!el[config.order || 'orderType'],
          width: columnSize,
          render: (e, { data }) => {
            const value = e || data?.[camelCase ? lodash.camelCase(el.fieldName) : el.fieldName];
            const result = RenderText[el.componentType || 'text']?.(value) || value;

            return (
              <Popover content={result} trigger="click" className={styles.ellipsis}>
                {result}
              </Popover>
            );
          },
          // defaultSortOrder: 'ascend'
          // sortOrder: el.orderType ? true : false,
        };

        const defaultSorter = lodash
          .chain(sortArr)
          .find((el) => el.sortName === columns.dataIndex)
          .get('fieldOrder')
          .value();
        if (defaultSorter) {
          lodash.set(columns, 'defaultSortOrder', defaultSorter);
        }

        return columns;
      }).value();
      
    return res;
  };

  getColumnsTitle = (currentField: DataFieldProps): ReactNode => {
    return (
      <>
        <span>{currentField.fieldCaption}</span>
        <Button type="link" icon="up" />
      </>
    );
  };

  // 获取增改modal field
  getFieldItem = (ele: any[] = []) =>
    lodash
      .chain(lodash.cloneDeep(ele))
      .sort(sortSeq('columnSeq'))
      .filter((el: any) => FormItem[el.componentType])
      .map((el: any) => FormItem[el.componentType](el))
      .value();

  // 搜索field
  getSearchItem = (ele: any[] = [], params: any, extra: any = {}, sortName = 'componentSeq') =>
    lodash
      .chain(ele)
      .sort(sortSeq(sortName))
      .filter((el: any) => FormItem[el.componentType])
      .map((el: any) =>
        FormItem[el.componentType](
          el,
          {
            ...params,
          },
          {
            placeholder:
              el.whereOperator && el.whereOperator !== WhereOperator.equal_to
                ? el.whereOperator
                : '',
            ...extra,
          }
        )
      )
      .value();

  // 组件样式
  getComponentStyle = (el: DataFieldProps) => {
    const styles = {};
    const ele = Number(el.componentSize);
    if (ele && ele >= 40 && ele <= 200) {
      lodash.set(styles, 'width', `${ele}px`);
    }
    return styles;
  };

  // formItem样式
  getItemStyle = (el: DataFieldProps) => {
    let styles = {};
    if (el.visible === false) {
      styles = lodash.assign(styles, {
        width: 0,
        height: 0,
        opacity: 0,
        position: 'absolute',
      });
    }
    return styles;
  };

  // 组件表单规则
  getComponentRules = (el: any, extra: any) => {
    const rules = [];
    if (el.required && (el.visible || el.visible === null || el.visible === undefined)) {
      //选择性必填
      if (el.required === 2 && el.requiredCondition && extra.form) {
        if (RuleFun(JSON.parse(el?.requiredCondition), extra.form, '')) {
          rules.push({
            required: true,
            message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' }),
          });
        } else {
          if (lodash.includes(extra.form.getFieldError(el.fieldName) || [], 'Required!')) {
            extra.form?.setFields({
              [el.fieldName]: {
                value: extra.form.getFieldValue(el.fieldName),
                errors: undefined,
              },
            });
          }
        }
      } else {
        rules.push({
          required: true,
          message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' }),
        });
      }
    }
    if (el.componentType === 'number') {
      rules.push({
        type: 'number',
      });
    }

    if (el.likeLimit && el.whereOperator && el.whereOperator === WhereOperator.like) {
      rules.push({
        min: Number(el.likeLimit),
      });
    }
    if (
      el.componentType === 'text' &&
      el.limit &&
      el.whereOperator &&
      lodash.includes(
        [WhereOperator.leftLike, WhereOperator.rightLike, WhereOperator.middleLike],
        el.whereOperator
      )
    ) {
      rules.push({
        min: Number(el.limit),
        message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000283' }, el.limit),
      });
    }
    if (
      /date/.test(el.componentType) &&
      el.limit &&
      el.unit &&
      el.whereOperator &&
      el.whereOperator === WhereOperator.between
    ) {
      rules.push({
        validator: (rule: any, value: any, callback: any) => {
          const { limit, unit } = el;
          const dateArr = lodash.split(value, ',');
          const from = dateArr[0];
          const to = dateArr[1];
          if (moment(from).add(limit, unit).isBefore(to)) {
            callback(
              formatMessageApi({ Label_COM_WarningMessage: 'ERR_000291' }, `${limit} ${unit}`)
            );
          } else {
            callback();
          }
        },
      });
    }

    return el?.rules?.length ? rules.concat(el?.rules) : rules;
  };

  // 获取默认排序， 重复sortName,按第一个生效
  getDefaultSort = (defaultSorter?: string) => {
    if (!defaultSorter) {
      return [];
    }
    return defaultSorter.split(',').reduce((sortArr: SortOrderProps[], item: string) => {
      const temp = item.split(' ');
      const isExit = lodash.find(sortArr, (el: SortOrderProps) => el.sortName === temp[0]);
      if (!isExit) {
        sortArr.push({
          sortName: temp[0],
          sortOrder: temp[1],
        });
      }
      return sortArr;
    }, []);
  };
}

export const {
  getColumns,
  getFieldItem,
  getSearchItem,
  getComponentStyle,
  getItemStyle,
  getComponentRules,
  getDefaultSort,
} = new ComponentUtils();
