import { useMemo } from 'react';
import { produce }  from 'immer';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from '../activity.config';
import { transConfig, extraDataSrouce } from './data.trans.config';
import matchValueByTransConfig from 'process/NB/ManualUnderwriting/utils/matchValueByTransConfig';

export default () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData,
    shallowEqual
  );
  return useMemo(() => {
    const originalData = lodash.get(businessData, 'policyList[0].clientInfoList', []);
    const result = produce(originalData, (draftState: any) => {
      lodash.forEach(draftState, (item, index) => {
        lodash
          .chain(transConfig)
          .entries()
          .forEach(([key, path]) => {
            const value = matchValueByTransConfig({ key, path, item });
            if (value) {
              lodash.set(draftState, `[${index}].${key}`, value);
            } else {
              lodash.set(draftState, `[${index}].${key}`, null);
            }
          })
          .value();
        lodash
          .chain(extraDataSrouce)
          .entries()
          .forEach(([key, path]) => {
            if (lodash.isString(path)) {
              lodash.set(draftState, `[${index}].${key}`, lodash.get(businessData, path));
            }
          })
          .value();

        const filteredRoleList = item.roleList?.filter((roleData) => !roleData.deleted);
        if (filteredRoleList?.length !== item.roleList?.length) item.roleList = filteredRoleList;
      });
    });
    return lodash.filter(result, (item: any) => item.deleted !== 1);
  }, [businessData, transConfig, extraDataSrouce]);
};
