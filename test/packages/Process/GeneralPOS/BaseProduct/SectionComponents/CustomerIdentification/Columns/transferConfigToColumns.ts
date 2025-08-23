import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';

const transferConfigToColumns = (configs: any[]) => {
  const totalSpan = lodash.reduce(
    configs,
    (sum, n) => {
      return sum + (lodash.toNumber(lodash.get(n, 'field-props.x-layout.lg.span')) || 0);
    },
    0
  );
  const columnList = lodash
    .chain(configs)
    .filter((configItem) => !!configItem['field-props'])
    .orderBy(['field-props.x-layout.lg.order'])
    .map((configItem) => {
      const label = configItem['field-props'].label;
      return {
        field: configItem.field,
        fieldType: configItem.fieldType,
        dictTypeCode: configItem['field-props']?.['x-dict']
          ? configItem['field-props']?.['x-dict']?.dictTypeCode
          : null,
        name: formatMessageApi({
          [label.dictTypeCode]: label.dictCode,
        }),
        width: `${
          (lodash.toNumber(lodash.get(configItem, 'field-props.x-layout.lg.span')) || 0) / totalSpan
        }`,
        span: configItem['field-props']?.['x-layout']?.lg?.span,
        visible: configItem['field-props']?.visible ? configItem['field-props']?.visible : null,
      };
    })
    .value();

  return columnList;
};

export { transferConfigToColumns };
