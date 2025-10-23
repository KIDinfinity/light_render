import React from 'react';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';
import lodash from 'lodash';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';

export default () => {
  const coverageList = useGetCoverageList();
  const dispatch = useDispatch();
  return React.useCallback(
    ({ uwDecision, id }) => {
      let coverageRemarkList = lodash
        .chain(coverageList)
        .find((coverage) => coverage.id === id)
        .get('coverageRemarkList', null)
        .value();
      if (coverageRemarkList === null) return;
      coverageRemarkList = lodash
        .chain(coverageRemarkList)
        .map((remark: any) => {
          if (!remark?.reasonCode) return remark;
          const reasonCode = formUtils.queryValue(remark.reasonCode);
          if (reasonCode.includes(uwDecision)) return remark;
          return {
            ...remark,
            reasonCode: null,
            shortDescription: null,
          };
        })
        .value();
      dispatch({
        type: `${NAMESPACE}/changeCurrentProductRemarkList`,
        payload: {
          id,
          coverageRemarkList,
        },
      });
    },
    [coverageList, dispatch]
  );
};
