import { useEffect } from 'react';
import { useSelector,  useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useGetCaseDetail from 'basic/components/CaseContainer/hooks/useGetCaseDetail';

enum ActivityKeyEnum {
  NB_PROPOSAL_CREATION = 'BP_NB_ACT009',
}

export default () => {
  const dispatch = useDispatch();
  const activityKey = useSelector(
    ({ processTask }: any) => processTask?.getTask?.activityKey,
    shallowEqual
  );

  const caseDetail = useGetCaseDetail();
  const businessNo = caseDetail?.businessNo || caseDetail?.inquiryBusinessNo;

  const originCaseType = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessData?.caseType,
    shallowEqual
  );
  const contractType = (() => {
    if (activityKey !== ActivityKeyEnum.NB_PROPOSAL_CREATION) {
      return originCaseType;
    } else {
      return 'UP2';
    }
  })();

  useEffect(() => {
    if (contractType) {
      dispatch({
        type: `${NAMESPACE}/loadPlanProduct`,
        payload: {
          contractType: formUtils.queryValue(contractType),
          businessNo,
        },
      });
    }
  }, [contractType, businessNo]);
};
