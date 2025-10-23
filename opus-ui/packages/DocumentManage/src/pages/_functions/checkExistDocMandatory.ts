import lodash from 'lodash';
import type { DocumentModel } from '../_dto/model';

/**
 *根据指定的key获取对应配置项数据
 * @param dropdownConfigures
 * @param locateObject
 */
const checkExistDocMandatory = (
  documentList?: DocumentModel[],
  locateObject?: any
): DocumentModel | any => {
  if (!lodash.isArray(documentList)) return {};
  return lodash.chain(documentList).orderBy('voidFlag').find(locateObject).value();
};

export default checkExistDocMandatory;
