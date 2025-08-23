import lodash from 'lodash';
import transFieldsConfig from 'basic/utils/transFieldsConfig';
import transFieldValue from 'basic/utils/transFieldValue';
import { formUtils } from 'basic/components/Form';
import { useMemo } from 'react';
interface IParams {
  section?: any;
  data: any;
  config: any;
  currencyConfig?: any;
  extraConfig?: any;
  multipleDropdown?: [string];
  NAMESPACE?: string;
}

export default ({ data, config, currencyConfig, extraConfig, multipleDropdown }: IParams) => {
  return useMemo(() => {
    if (!lodash.isPlainObject(data)) {
      return data;
    }

    const result = lodash
      .chain(transFieldsConfig({ config }))
      .filter((item) => {
        const visible = item.visible === 'Y' || item.visible === 'C';
        return item.field && visible;
      })
      .orderBy(['order'])
      .map((item) => {
        const originData = lodash.get(data, item.field);
        const value = transFieldValue({
          value: formUtils.queryValue(originData),
          configItem: item,
          currency: lodash.get(currencyConfig, item?.field),
          extraConfig,
          multipleDropdown,
        });

        const r = {
          ...lodash.pick(item, ['label', 'span', 'field', 'showWarning', 'warningMessage']),
          value,
        };
        return r;
      })
      .value();
    return result;
  }, [extraConfig, config, multipleDropdown, currencyConfig, data]);
};
