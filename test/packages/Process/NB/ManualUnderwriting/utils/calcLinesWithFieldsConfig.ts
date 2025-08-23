import lodash from 'lodash';

export default ({ fieldsConfig, expand }: any) => {
  let totalLines = 0;
  lodash
    .chain(fieldsConfig)
    .filter((item: any) => {
      return ['Y', 'C'].includes(lodash.get(item, 'field-props.visible'));
    })
    .groupBy('section')
    .values()
    .forEach((groupConfigs: any) => {
      const totalSpan = lodash.reduce(
        groupConfigs,
        (sum, fieldConfig) => {
          const span = (() => {
            const s = lodash.get(fieldConfig, 'field-props.x-layout.lg.span');
            if (!expand) {
              return 2 * s > 24 ? 24 : 2 * s;
            }
            return s || 0;
          })();
          return sum + span;
        },
        0
      );
      const currentLines = Math.ceil(totalSpan / 24);
      totalLines = totalLines + currentLines;
    })
    .value();
  return totalLines;
};
