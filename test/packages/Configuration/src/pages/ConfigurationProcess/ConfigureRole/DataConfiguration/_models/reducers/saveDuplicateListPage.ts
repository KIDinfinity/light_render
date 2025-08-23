import lodash from 'lodash';
import OperationType from 'configuration/pages/ConfigurationCenter/Enum/OperationType';
import { ValidateResultType } from 'configuration/constant';

export default (state: any, action: any) => {
  const { duplicateList, dataFieldList } = action.payload;

  const duplicateKeys = lodash
    .chain(dataFieldList)
    .filter((item: any) => item?.whereCriteria)
    .map((item: any) => item.fieldName)
    .value();

  const newRows = lodash
    .chain(state.listPage.rows)
    .map((item) => {
      const duplicateData = lodash.find(duplicateList, (el: any) => {
        function toLowerDuplicateKey(data: any) {
          return lodash.reduce(data, (result, value, key) => {
            if (lodash.includes(duplicateKeys, key)) {
              return {...result, [key]: lodash.toLower(value)};
            }
            return {...result, [key]: value};
          }, {})
        }
        return lodash.isEqual(lodash.pick(toLowerDuplicateKey(item?.data), duplicateKeys), lodash.pick(toLowerDuplicateKey(el?.data), duplicateKeys))
      }

      );
      const isWarning =
        action.payload?.isWarning || duplicateData?.validateResultType === ValidateResultType.warn;
      if (duplicateData) {
        return {
          ...item,
          data: { ...item?.data, '#operation': OperationType.update },
          isDuplicate: !isWarning,
          duplicateData,
          isWarning,
        };
      }
      return {
        ...item,
        isDuplicate: false,
        isWarning: false,
      };
    })
    .sortBy('isDuplicate', 'isWarning')
    .reverse()
    .value();
  // eslint-disable-next-line no-unused-expressions
  state?.TableSearch?.setSortOrders?.([]);

  return {
    ...state,
    listPage: {
      ...state.listPage,
      rows: newRows,
    },
  };
};
