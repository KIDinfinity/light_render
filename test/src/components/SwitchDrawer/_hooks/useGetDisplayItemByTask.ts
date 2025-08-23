import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

export default ({ response, taskDetail }: any) => {
  const listDisplayConfig = useSelector(
    (state: any) => state.workspaceSwitchOn.listDisplayConfig,
    shallowEqual
  );

  return useMemo(() => {
    return lodash.find(
      listDisplayConfig,
      (item: any) =>
        [taskDetail?.taskDefKey, response?.resultData?.currentActivityKey].includes(
          item.activityKey
        ) &&
        [taskDetail?.caseCategory, response?.resultData?.caseCategory].includes(item.caseCategory)
    );
  }, [response, taskDetail, listDisplayConfig]);
};
