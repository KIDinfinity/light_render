import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default ({ procedureId, serviceItemListMap }: any) => {
  lodash.reduce(
    lodash.cloneDeep(serviceItemListMap),
    (map: Object, item: any, key: string) => {
      return {
        ...map,
        [key]:
          formUtils.queryValue(item?.procedureCode) === procedureId && !lodash.isEmpty(procedureId)
            ? { ...item, procedureCode: '' }
            : item,
      };
    },
    {}
  );
  return;
};
