import { toUpper } from 'lodash';
import { LS, LSKey } from '@/utils/cache';
import lodash from 'lodash';

export const filterConfig = (config, params) => {
  const userBusinessCode = LS.getItem(LSKey.CURRENTUSER).businessCode;
  return (
    (config &&
      config?.filter(
        (item) =>
          (!item.businessCode ||
            (!!userBusinessCode &&
              !!item.businessCode &&
              !lodash.isEmpty(
                lodash.intersection(
                  lodash.split(userBusinessCode, ','),
                  lodash.split(item.businessCode, ',')
                )
              ))) &&
          params?.find((el) => toUpper(el.fieldName) === toUpper(item.fieldName))
      )) ||
    []
  );
};

