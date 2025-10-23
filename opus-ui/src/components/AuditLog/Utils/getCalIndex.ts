import lodash from 'lodash';
/**
 * 这里针对一个list需要展示的index和实际list的index有出入的地方（client information的CRS）
 * TODO：1.rule有值，表示确定要移动多少个index，直接返回 2.rule没有值，就需要根据path和配置的规则去拿应该展示的index
 */
export default (param) => {
  const { path, rule, newClaimData } = param;
  if (lodash.isNumber(rule)) {
    return rule;
  }
  if (rule === true) {
    const targetPath = path.slice(0, path.lastIndexOf('['));
    const targetList = lodash.get(newClaimData, targetPath, []);
    let resultList = lodash.isArray(targetList) ? targetList : [];
    const handleType = targetPath.slice(targetPath.lastIndexOf('.') + 1);
    switch (handleType) {
      case 'crtInfoList':
        resultList = resultList.filter((item) => {
          return !(item?.type === 'S' && item?.ctfType === 'TN' && item?.ctfCountryCode !== 'USA');
        });
        break;
      default:
        break;
    }
    return 0 - resultList?.length;
  }
  return 0;
};
