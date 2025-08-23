import lodash from 'lodash';
import {getBasicData} from 'configuration/config'

export default ({ functionData, changeData, compareData }: any) => {
  const { dataFieldList,functionCode } = functionData;

  const duplicateKeys = lodash
    .chain(dataFieldList)
    .filter((item: any) => item?.whereCriteria)
    .map((item: any) => item.fieldName)
    .value();
  return {
    isDuplicate:
      duplicateKeys?.length === 0
        ? false
        : lodash.some(compareData, (item: any) =>
            lodash.some(changeData, (el: any) =>
              lodash.isEqual(lodash.pick(item, getBasicData(functionCode,duplicateKeys)), lodash.pick(el, getBasicData(functionCode,duplicateKeys)))
            )
          ),
    duplicateKeys,
  };
};
