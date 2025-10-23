import React, { useMemo } from 'react';
import { size, isArray, map, includes, isString, find, every, compact } from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Checkbox, Select, Tag } from 'antd';
import styles from './index.less';
import SelectMode from './SelectMode';
import type { SelectProps } from 'plugins/ant-design/lib/select';

interface OptionsProps {
  dicts: any[];
  form: any;
  dictTypeCode: string;
  optionShowType: string;
  dictCode: string;
  dictName: string;
  filterList: any[];
  existCodes: any[];
  formName: string;
  multipleString?: any;
  dropdownMatchSelectWidth: boolean;
  specifyTitleField?: string;
  value?: string[] | string;
  mode?: SelectProps['mode'];
  onClose?: (e: any, code: string) => void;
  optionLabelProp: 'value' | undefined;
}

const getDisplayName = ({ dictCode, item, optionShowType, dictName }) => {
  const name = item?.[dictName] || (isString(item) ? item : '');
  if (optionShowType === 'both') return `${item[dictCode]} - ${name}`;
  if (optionShowType === 'value') return item[dictCode];
  if (optionShowType === 'name') return name;
  if (optionShowType === 'all') {
    if (item[dictCode] === 'All') {
      return item[dictCode];
    }
    return `${item[dictCode]} - ${name}`;
  }
  if (optionShowType === 'name_value') return ` ${name} - ${item[dictCode]} `;
  return name;
};

const getDisplaySelectedOption = ({
  dictCode,
  item,
  optionShowType,
  dictName,
  optionLabelProp,
}) => {
  if (optionLabelProp === 'value') {
    return item[dictCode];
  }
  const name = item?.[dictName] || (isString(item) ? item : '');
  if (optionShowType === 'both') return `${item[dictCode]} - ${name}`;
  if (optionShowType === 'value') return item[dictCode];
  if (optionShowType === 'name') return name;
  if (optionShowType === 'all') {
    if (item[dictCode] === 'All') {
      return item[dictCode];
    }
    return `${item[dictCode]} - ${name}`;
  }
  if (optionShowType === 'name_value') return ` ${name} - ${item[dictCode]} `;
  return name;
};

const Options = ({
  dicts,
  form,
  dictTypeCode,
  optionShowType,
  dictCode,
  dictName,
  filterList,
  existCodes,
  formName,
  dropdownMatchSelectWidth,
  specifyTitleField,
  value: propsVal,
  mode,
  disabled,
  multipleString,
  onClose,
  optionLabelProp,
}: SelectProps & OptionsProps) => {
  const finalValue = useMemo(() => {
    const fieldValue = form?.getFieldValue(formName) || propsVal;

    if (multipleString) {
      if (isString(fieldValue)) {
        return compact(fieldValue?.split(','));
      }
      if (Array.isArray(fieldValue)) {
        return compact(fieldValue);
      }
    }
    return fieldValue;
  }, [form, formName, multipleString, propsVal]);

  const isMultiple = mode === SelectMode.multiple;
  let optionList = [];

  if ((size(dicts) === 0 || !isArray(dicts)) && isString(finalValue) && dictTypeCode) {
    optionList = [
      { [dictCode]: finalValue, [dictName]: formatMessageApi({ [dictTypeCode]: finalValue }) },
    ];
  } else {
    optionList = dictTypeCode
      ? map(dicts, (item) => ({
          [dictCode]: item[dictCode],
          [dictName]: formatMessageApi({ [dictTypeCode]: item[dictCode] }),
        }))
      : every(dicts, (item) => item[dictName])
        ? dicts || []
        : map(dicts, (item) => ({
            [dictCode]: item[dictCode],
            [dictName]: item?.[dictName] || item[dictCode],
          }));
  }

  return {
    options: map(optionList, (item: any, index: number) => {
      const optionTxt = getDisplayName({
        optionShowType,
        dictCode,
        item,
        dictName,
      });

      return (
        <Select.Option
          key={`${item[dictCode]}`}
          value={item[dictCode]}
          data-item={item[dictCode]}
          label={dictCode}
          className={[
            includes(filterList, item[dictCode]) ? styles.hideOption : '',
            dropdownMatchSelectWidth ? styles.selectNoMaxWith : '',
          ]}
          disabled={includes(existCodes, item[dictCode])}
          title={(() => {
            if (specifyTitleField) return item[specifyTitleField];
            return optionTxt;
          })()}
        >
          {isMultiple ? (
            <span className={styles.optionCheck}>
              <Checkbox checked={finalValue?.includes(item[dictCode])} />
            </span>
          ) : null}
          {/* element包着的话,搜索会失效 */}
          {optionTxt}
        </Select.Option>
      );
    }),

    tagsContent: isMultiple && (
      <div className={styles.selectTags}>
        {map(finalValue || [], (code: any) => (
          <Tag closable={!disabled} key={code} onClose={(e) => onClose && onClose(e, code)}>
            {getDisplaySelectedOption({
              optionShowType,
              dictCode,
              dictName,
              optionLabelProp,
              item: {
                [dictCode]: code,
                [dictName]: find(optionList, (i) => i[dictCode] === code)?.[dictName] || code,
              },
            })}
          </Tag>
        ))}
      </div>
    ),
  };
};

export default Options;
