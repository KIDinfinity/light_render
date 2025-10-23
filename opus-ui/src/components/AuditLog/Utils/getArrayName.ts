import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Config from '../Config';
import { RegPath, RegArrayIndex, RegFormData } from './RegExps';
import getProcedureIndex from './getProcedureIndex';
import getDiffSectionInSameDataSource from './getDiffSectionInSameDataSource';
import getCalIndex from './getCalIndex';
import getExtraSectionName from './getExtraSectionName';

const getPathArray = ({
  type,
  oldClaimData,
  newClaimData,
  fieldName,
  currentController,
  diffMap,
  path,
  dataMap,
  target,
}: any) => {
  const pathArray = path?.split('.');
  return lodash
    .chain(pathArray)
    .map((_, index) => lodash.take(pathArray, index + 1)?.join('.'))
    .map((key: string) => {
      const targetPath = key?.replace(RegPath, '');
      let sectionIndex = Number?.(key.match(RegArrayIndex)?.[0]);
      let sectionName = lodash.get(dataMap, `${targetPath}.${target}`);
      //针对payment information以及后面出现的相同数据源，不同log的sectionname进行处理
      const realSection = getDiffSectionInSameDataSource(
        targetPath,
        fieldName,
        currentController,
        target
      );
      sectionName = realSection ? realSection : sectionName;

      //isNeedIndex参数控制是否显示No
      if (lodash.get(dataMap, `${targetPath}.isNeedIndex`, false)) {
        //TODO：添加配置，根据配置来添加index，需要获取到配置好的list的length，使用复数list的length的和再加上当前item的index加上1的到最终No
        //list(n).length+sectionIndex+1
        if (lodash.isArray(lodash.get(dataMap, `${targetPath}.isSortByOtherList`, null))) {
          const curIndex = getProcedureIndex({
            newClaimData,
            frontList: lodash.get(dataMap, `${targetPath}.isSortByOtherList`, []),
            pathArray,
            sectionIndex,
            targetPath,
          });
          sectionIndex = curIndex > -1 ? curIndex : sectionIndex;
        }
        return sectionName ? `${sectionName} No.${sectionIndex + 1}` : false;
      }
      if (lodash.get(dataMap, `${targetPath}.isNeedCalIndex`, false)) {
        const calIndex = getCalIndex({
          path: key,
          rule: lodash.get(dataMap, `${targetPath}.isNeedCalIndex`, false),
          newClaimData,
        });
        const fianlIndex = sectionIndex + calIndex + 1 > 0 ? sectionIndex + calIndex + 1 : 1;
        return sectionName ? `${sectionName} No.${fianlIndex}` : false;
      }
      const extraName = getExtraSectionName({
        type,
        path: key,
        targetPath,
        fieldName,
        currentController,
        target,
        oldClaimData,
        newClaimData,
        diffMap,
      });
      return sectionName
        ? `${sectionName}${sectionIndex ? ` ${sectionIndex + 1}` : ''}${extraName ? ` ${extraName}` : ''}`
        : false;
    })
    .filter((el) => !!el)
    .value();
};

export default ({
  type,
  path,
  currentController,
  oldClaimData,
  newClaimData,
  fieldName,
  diffMap,
  isArray = false,
}: any) => {
  const getDataMap = lodash.get(Config, `${currentController}.dataMap`);
  if (!lodash.isFunction(getDataMap)) {
    return false;
  }
  const dataMap = getDataMap();
  const sectionArray = getPathArray({
    type,
    path,
    dataMap,
    target: 'title',
    oldClaimData,
    newClaimData,
    fieldName,
    currentController,
    diffMap,
  });
  const titleSectionArray = getPathArray({
    type,
    path,
    dataMap,
    target: 'headerTitle',
    oldClaimData,
    newClaimData,
    fieldName,
    currentController,
  });

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
