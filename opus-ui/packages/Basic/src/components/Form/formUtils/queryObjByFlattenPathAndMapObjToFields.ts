import flattenJson from '@/utils/flattenJson';
import mapObjectToFields from './mapObjectToFields';

const queryObjByFlattenPathAndMapObjToFields = (
  dataSource: any,
  parentKey: any,
  pathKey: any,
  pathValue: any,
  transfers: any
) => {
  const obj = flattenJson.queryObjectByFlattenPath(dataSource, parentKey, pathKey, pathValue);

  return mapObjectToFields(obj, transfers);
};

export default queryObjByFlattenPathAndMapObjToFields;
