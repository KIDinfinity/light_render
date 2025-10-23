import { useCallback } from 'react';
import lodash from 'lodash';

export default ({
  onSelectCallback,
  selectCallbackExProp,
  dataSources,
  selectCallbackItem,
}: any) => {
  return useCallback(
    (value) => {
      if (onSelectCallback) {
        // 直接返回整个item
        if (!!selectCallbackItem) {
          onSelectCallback({ item: lodash.find(dataSources, { dictCode: value }) || {} });
        } else {
          const typeCode = lodash.find(dataSources, { dictCode: value })?.typeCode;
          let exProps = null;
          if (lodash.isString(selectCallbackExProp) && selectCallbackExProp) {
            exProps = lodash.find(dataSources, { dictCode: value })?.[selectCallbackExProp];
          }
          if (lodash.isArray(selectCallbackExProp) && !lodash.isEmpty(selectCallbackExProp)) {
            exProps = lodash.map(selectCallbackExProp, (prop) => {
              return { key: prop, value: lodash.find(dataSources, { dictCode: value })?.[prop] };
            });
          }
          onSelectCallback(value, typeCode, exProps);
        }
      }
    },
    [onSelectCallback, selectCallbackExProp, dataSources, selectCallbackItem]
  );
};
