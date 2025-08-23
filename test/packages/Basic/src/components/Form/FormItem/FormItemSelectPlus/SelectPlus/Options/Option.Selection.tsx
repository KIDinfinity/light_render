import React from 'react';
import { ShowOptionType } from '../enum';
import lodash from 'lodash';
import { Select } from 'antd';

export default ({
  optionShowType,
  dataSources,
  saveName,
  disabledDictCodes,
  currentCodes,
}: any) => {
  let showKeys: string[] = [];
  switch (optionShowType) {
    case ShowOptionType.name:
      showKeys = ['dictName'];
      break;
    case ShowOptionType.value:
      showKeys = ['dictCode'];
      break;
    case ShowOptionType.both:
      showKeys = ['dictCode', 'dictName'];
      break;
    default:
      showKeys = ['dictName'];
      break;
  }
  const OptionList = new Set();
  lodash.uniqBy(dataSources, 'dictCode').forEach((item) => {
    const optionLabel = showKeys
      .map((key) => item && item[key])
      .filter((value) => value)
      .join('-');

    OptionList.add(
      <Select.Option
        key={item?.dictCode}
        value={!saveName ? item?.dictCode : item.dictName}
        disabled={lodash.compact(disabledDictCodes).includes(item?.dictCode)}
        title={optionLabel}
      >
        {optionLabel}
      </Select.Option>
    );
  });
  const dataSourcesCodes = lodash.map(dataSources, (item) => item.dictCode);

  currentCodes
    .filter((item) => !dataSourcesCodes.includes(item?.dictCode))
    .forEach((item: any) => {
      const optionLabel = lodash
        .chain(showKeys)
        .map((key) => item && item[key])
        .filter((value) => value)
        .join('-')
        .value();
      OptionList.add(
        <Select.Option
          key={item?.dictCode}
          value={!saveName ? item?.dictCode : item.dictName}
          style={{ display: 'none' }}
        >
          {optionLabel}
        </Select.Option>
      );
    });
  return [...OptionList];
};
