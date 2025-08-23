import React, { useMemo } from 'react';
import lodash from 'lodash';
import EmptyOption from './Option.Empty';
import Selection from './Option.Selection';
import PaginationOption from './Option.Pagination';

export default ({
  optionShowType,
  dataSources,
  saveName,
  disabledDictCodes,
  total,
  current,
  handlePageChange,
  currentCodes,
}: any) => {
  return useMemo(() => {
    const optionList = new Set();
    if (total === 0 && lodash.isEmpty(currentCodes)) {
      optionList.add(EmptyOption);
    }
    if (!!total && total !== 0) {
      Selection({
        optionShowType,
        dataSources,
        saveName,
        disabledDictCodes,
        currentCodes,
      }).forEach((item) => optionList.add(item));
      PaginationOption({
        total,
        current,
        handlePageChange,
      }).forEach((item) => optionList.add(item));
    }
    return React.Children.toArray([...optionList]);
  }, [optionShowType, dataSources, disabledDictCodes, total, current, currentCodes]);
};
