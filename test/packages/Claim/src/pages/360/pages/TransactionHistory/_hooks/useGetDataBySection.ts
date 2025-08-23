import { useMemo, useCallback } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { RuleByData } from 'basic/components/Form/Rule';
import { transFields, transConfigs } from '../PolicyList/Section/index.trans.config';

const getTransConfigsDate = (date: any) => {
  const TransConfigsDateMap = new Map();
  lodash
    .chain(transConfigs)
    .entries()
    .forEach(([key, path]) => {
      TransConfigsDateMap.set(key, lodash.get(date, path));
    })
    .value();
  return {
    ...date,
    ...Object.fromEntries(TransConfigsDateMap),
  };
};
export default ({ data, config }: any) => {
  const dispatch = useDispatch();
  const businessNoOnClick = useCallback(() => {
    const { inquiryBusinessNo, businessNo, caseCategory, businessProcessId } = lodash.pick(data, [
      'inquiryBusinessNo',
      'businessNo',
      'caseCategory',
      'businessProcessId',
    ]);
    return dispatch({
      type: 'insured360/getRelCaseInquiryParamVO',
      payload: {
        inquiryBusinessNo,
        businessNo,
        caseCategory,
        requestType: 'thPosTransactionHistory',
        businessProcessId,
      },
    });
  }, [data]);
  return useMemo(() => {
    return lodash
      .chain(config)
      .filter((item) => {
        const visible = lodash.get(item, 'field-props.visible');
        const fieldProps = lodash.get(item, 'field-props.visible-condition');
        const visibleRule = visible === 'C' && RuleByData(fieldProps, data);
        return item.field && (visible === 'Y' || visibleRule);
      })
      .map((item) => {
        const key: string = lodash.get(item, 'field');
        const r = {
          key,
          label: formatMessageApi({
            [lodash.get(item, 'field-props.label.dictTypeCode')]: lodash.get(
              item,
              'field-props.label.dictCode'
            ),
          }),
          expand: lodash.get(item, 'field-props.expand'),
          fieldType: lodash.get(item, 'fieldType'),
          dropdownTypeCode: lodash.get(item, 'field-props.x-dict.dictTypeCode'),
          dropdownDictName: lodash.get(item, 'field-props.x-dict.dictNameType'),
          order: lodash.get(item, 'field-props.x-layout.lg.order'),
          span: lodash.get(item, 'field-props.x-layout.lg.span'),
        };
        return r;
      })
      .orderBy(['order'])
      .map((item) => {
        const originData = lodash.get(getTransConfigsDate(data), item.key);
        let value = originData;
        if (item.fieldType === 'Dropdown') {
          if (lodash.isString(originData)) {
            if (item.dropdownDictName === 'Both') {
              value = `${originData}-${formatMessageApi({
                [item.dropdownTypeCode]: originData,
              })}`;
            } else {
              value =
                formatMessageApi({
                  [item.dropdownTypeCode]: originData,
                }) || originData;
            }
          }
          if (lodash.isArray(originData)) {
            value = lodash
              .chain(originData)
              .map((valueItem) => {
                return formatMessageApi({
                  [item.dropdownTypeCode]: valueItem,
                });
              })
              .join(',')
              .value();
          }
        }
        if (item.fieldType === 'Label') {
          if (lodash.isString(originData)) {
            value = formatMessageApi({
              [item.dropdownTypeCode]: originData,
            });
          }
        }
        if (item.fieldType === 'Date') {
          value = !lodash.isNil(value) ? moment(originData).format('L') : null;
        }
        if (item.fieldType === 'Time') {
          value = !lodash.isNil(value) ? moment(originData).format('LT') : null;
        }
        return {
          ...lodash.pick(item, ['expand', 'label', 'key', 'span', 'order', 'fieldType']),
          value,
        };
      })
      .map((dataItem: any) => {
        if (!!transFields[dataItem.key]) {
          if (dataItem.key === 'inquiryBusinessNo') {
            return {
              ...dataItem,
              value: transFields[dataItem.key](dataItem.value, businessNoOnClick),
            };
          }
          return { ...dataItem, value: transFields[dataItem.key](dataItem.value) };
        }
        return dataItem;
      })
      .value();
  }, [config, data]);
};
