/**
 * 获取树形结构对象名称
 * claimProcessData - 扁平化数据
 * claimEntities - 扁平化数据
 * datas - 没有扁平化的数据
 * id - 唯一标识(必传)
 *
 */
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { denormalizeClaimData } from '@/utils/claimUtils';
import { flatten } from 'flat';

const getTreeObjectName = ({ claimProcessData, claimEntities, datas, id }: any) => {
  let newObjectName = '';
  const getNewObjectName = (intoDatas: any) => {
    const oldObjectName = lodash.find(
      Object.keys(intoDatas),
      (item: any) => intoDatas[item] === id
    );
    return lodash
      .chain(oldObjectName)
      .split('.')
      .filter((item: any) => {
        const numberReg = new RegExp('^[0-9]*$');
        return !numberReg.test(item) && item !== 'id';
      })
      .join('.')
      .value();
  };

  // 扁平化后的数据
  if (
    claimProcessData &&
    lodash.isPlainObject(claimProcessData) &&
    !lodash.isEmpty(claimProcessData) &&
    claimEntities &&
    lodash.isPlainObject(claimEntities) &&
    !lodash.isEmpty(claimEntities)
  ) {
    const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
    const claimData = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
    const newsData = flatten(claimData);
    newObjectName = getNewObjectName(newsData);
  }

  // 非扁平化数据
  if (datas && lodash.isPlainObject(datas) && !lodash.isEmpty(datas)) {
    newObjectName = getNewObjectName(datas);
  }
  return `claim.${newObjectName}`;
};

export default getTreeObjectName;
