import { some, isEmpty } from 'lodash';

export default (searchFieldList: any, searchDefault: any) => {
  return !some(searchFieldList, (item) => item?.visible && Number(item?.visible) === 1 && !isEmpty(searchDefault?.params?.[item?.fieldName]))
}
