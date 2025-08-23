import lodash from 'lodash';
import { SS, SSKey } from '@/utils/cache';
import { FormateEP } from '@/utils/accuracy';

/**
 * 处理普通文本包含千分位的精确值
 * @param objectFieldName - 名称
 */
const getFieldDisplayAmount = (value: number, objectFieldName: string) => {
  const accuracyConfig = SS.getItem(SSKey.ACCURACY_CONFIG);

  const { thousandSeparator = ',', accuracyScale = 2 } = lodash
    .chain(accuracyConfig?.list)
    .find((item: any) => item?.objectFieldName === objectFieldName)
    .pick(['thousandSeparator', 'accuracyScale'])
    .value();

  return FormateEP.getThousandsFormat({
    value: Number(value).toFixed(accuracyScale),
    precision: accuracyScale,
    thousandssSeparator: thousandSeparator,
  });
};

export default getFieldDisplayAmount;
