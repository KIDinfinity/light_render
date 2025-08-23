import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import buildupCompareData from './buildupCompareData';
/**
 * 比较当前的理赔数据和上一次理赔数据是否存在差异
 *
 * 有差异则表示用户修改改了配置指定的fields，给出warning提示
 *
 * 无差异则不做任何事
 *
 * @param source
 * @param target
 */
const compareDataV2 = (source: any, target: any) => {
  if (lodash.isEmpty(source) || lodash.isEmpty(target)) return true;

  const claimSoure = { incidentList: source?.incidentList };
  const claimTarget = { incidentList: target?.incidentList };

  const clearSource = formUtils.formatFlattenValue(formUtils.cleanValidateData(claimSoure));
  const clearTarget = formUtils.formatFlattenValue(formUtils.cleanValidateData(claimTarget));

  const tempSource = buildupCompareData(clearSource);
  const tempTarget = buildupCompareData(clearTarget);

  return lodash.isEqual(tempSource, tempTarget);
};
export default compareDataV2;
