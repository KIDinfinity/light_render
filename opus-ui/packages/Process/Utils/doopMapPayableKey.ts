import { mapForHandle } from 'process/Utils/benefitCategoryUtils';

/**
 * payable各层级数据的修改
 */
export default ({ benefitCategory = '' }: any) => {
  return mapForHandle[benefitCategory]
    ? mapForHandle[benefitCategory]
    : [
        {
          mapKey: '',
          listKey: '',
          parentKey: '',
        },
      ];
};
