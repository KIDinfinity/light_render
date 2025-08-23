import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { size, isArray, map, includes, isString } from 'lodash';
import { Select } from 'antd';
import styles from './index.less';

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
  dropdownMatchSelectWidth: boolean;
  specifyTitleField?: string;
}

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
}: OptionsProps) => {
  const value = form.getFieldValue(formName);
  let optionList = [];

  if ((size(dicts) === 0 || !isArray(dicts)) && value && dictTypeCode) {
    optionList = [{ [dictCode]: value, [dictName]: formatMessageApi({ [dictTypeCode]: value }) }];
  } else {
    optionList = dictTypeCode
      ? map(dicts, (item) => ({
          [dictCode]: item[dictCode],
          [dictName]: formatMessageApi({ [dictTypeCode]: item[dictCode] }),
        }))
      : dicts || [];
  }

  return map(optionList, (item: any, index: number) => {
    const name = item?.[dictName] || (isString(item) ? item : '');
    return (
      <Select.Option
        key={`${item[dictCode]}-${index}`}
        value={item[dictCode]}
        data-item={item}
        className={[
          includes(filterList, item[dictCode]) ? styles.hideOption : '',
          dropdownMatchSelectWidth ? styles.selectNoMaxWith : '',
        ]}
        disabled={includes(existCodes, item[dictCode])}
        title={(() => {
          if (specifyTitleField) return item[specifyTitleField];
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
        })()}
      >
        {(() => {
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
        })()}
      </Select.Option>
    );
  });
};

export default Options;
