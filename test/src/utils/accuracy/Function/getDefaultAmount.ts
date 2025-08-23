/**
 * 普通text精确值的处理
 *
 */
import lodash from 'lodash';
import { Decimal } from 'decimal.js';
import { SS, SSKey } from '@/utils/cache';

/**
 * 处理普通文本的精确值
 * @param objectFieldName - 名称
 * @param objectFieldValueType - 额外匹配
 */
const getDefaultAmount = (
  value: number,
  objectFieldName: string,
  objectFieldValueType?: string
) => {
  const accuracyConfig = SS.getItem(SSKey.ACCURACY_CONFIG);
  if (accuracyConfig || !lodash.isEmpty(accuracyConfig?.list)) {
    const objectItem =
      objectFieldValueType && !lodash.isEmpty(objectFieldValueType)
        ? lodash.chain(accuracyConfig.list).find({ objectFieldName, objectFieldValueType }).value()
        : lodash.chain(accuracyConfig.list).find({ objectFieldName }).value();

    if (objectItem && !lodash.isEmpty(objectItem)) {
      const { roundingMode, accuracyScale }: any = objectItem;
      return new Decimal(value).toFixed(Number(accuracyScale), Decimal[`${roundingMode}`]);
    }
    // eslint-disable-next-line no-console
    console.warn(
      `匹配不到objectFieldName=${objectFieldName};${
        objectFieldValueType ? `objectFieldValueType=${objectFieldValueType}` : ''
      }请检查session缓存(venus-ui_accuracy_config)是否存在匹配值`
    );
  }

  return Number(value).toFixed(2);
};

export default getDefaultAmount;
