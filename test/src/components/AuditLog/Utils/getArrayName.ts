import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Config from '../Config';
import { RegPath, RegArrayIndex, RegFormData } from './RegExps';

const getPathArray = (path: string, dataMap: any, target: string) => {
  const pathArray = path?.split('.');
  return lodash
    .chain(pathArray)
    .map((item, index) => lodash.take(pathArray, index + 1)?.join('.'))
    .map((key: string) => {
      const targetPath = key?.replace(RegPath, '');
      const sectionIndex = Number?.(key.match(RegArrayIndex)?.[0]);
      const sectionName = lodash.get(dataMap, `${targetPath}.${target}`);
      return sectionName ? `${sectionName}${sectionIndex ? ` ${sectionIndex + 1}` : ''}` : false;
    })
    .filter((el) => !!el)
    .value();
};

export default ({ path, currentController, newClaimData, isArray = false }: any) => {
  const getDataMap = lodash.get(Config, `${currentController}.dataMap`);
  let dataMap;
  if (lodash.isFunction(getDataMap)) {
    dataMap = getDataMap();
  } else if (lodash.isPlainObject(getDataMap)) {
    dataMap = getDataMap;
  } else {
    return false;
  }
  const sectionArray = getPathArray(path, dataMap, 'title');
  const titleSectionArray = getPathArray(path, dataMap, 'headerTitle');

  if (currentController === 'JPCLMOfQualityController') {
    const formDataPath = path?.match(RegFormData)?.[0];
    const documentTypeCode = lodash.get(newClaimData, `${formDataPath}.documentTypeCode`);
    if (documentTypeCode) {
      sectionArray.unshift(
        formatMessageApi({
          documentType_i18n: documentTypeCode,
        })
      );
    }
  }

  const section = isArray ? lodash.take(sectionArray, sectionArray?.length - 1) : sectionArray;
  const titleSection = isArray
    ? lodash.take(titleSectionArray, titleSectionArray?.length - 1)
    : titleSectionArray;

  return sectionArray?.length
    ? {
        section: section.join(' / '),
        titleSection: titleSection.join(' / '),
        arrayName: sectionArray?.[sectionArray?.length - 1],
      }
    : false;
};
