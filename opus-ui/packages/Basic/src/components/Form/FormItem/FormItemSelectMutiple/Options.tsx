import React from 'react';
import { size, isArray, map, includes, isString } from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Checkbox, Select } from 'antd';
import styles from './index.less';
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
  dropdownMatchSelectWidth: boolean;
  specifyTitleField?: string;
  value?: string[] | string;
  mode?: SelectProps['mode'];
}

export const getDisplayName = ({ dictCode, item, optionShowType }) => {
  const name = item?.dictName || (isString(item) ? item : '');
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
}: OptionsProps) => {
  const value = form?.getFieldValue(formName) || propsVal;
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
    const optionTxt = getDisplayName({ optionShowType, dictCode, item });

    return (
      <Select.Option
        key={`${item[dictCode]}`}
        data-item={item[dictCode]}
        className={[
          includes(filterList, item[dictCode]) ? styles.hideOption : '',
          dropdownMatchSelectWidth ? styles.selectNoMaxWith : '',
        ]}
        disabled={includes(existCodes, item[dictCode])}
        title={(() => {
          if (specifyTitleField) return item[specifyTitleField];
          return getDisplayName({ optionShowType, dictCode, item });
        })()}
      >
        <span className={styles.optionCheck}>
          <Checkbox checked={value?.includes(item[dictCode])} />
        </span>
        {/* element包着的话,搜索会失效 */}
        {optionTxt}
      </Select.Option>
    );
  });
};

export default Options;
