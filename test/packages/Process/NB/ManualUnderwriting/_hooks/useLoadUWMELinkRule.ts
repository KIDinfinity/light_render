import { useMemo, useEffect } from 'react';
import { useSelector,  useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { useParams } from 'umi';
import lodash from 'lodash';
import AgentType from 'process/NB/Enum/AgentType';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
interface IParams {
  businessNo: string;
  caseNo: string;
}

export default () => {
  const dispatch = useDispatch();
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData,
    shallowEqual
  );
  const channel = useMemo(() => {
    return formUtils.queryValue(
      lodash
        .chain(businessData)
        .get('agentList', [])
        .find((item) => item.agentType === AgentType.Primary)
        .get('agentChannelCode')
        .value()
    );
  }, [businessData]);

  const taskDetail = useSelector(({ processTask }: any) => processTask.getTask, shallowEqual);
  const params: IParams = useParams();
  const businessNo = useMemo(() => {
    return params?.businessNo || formUtils.queryValue(taskDetail?.businessNo || taskDetail?.inquiryBusinessNo);
  }, [taskDetail, params]);

  return useEffect(() => {
    if (channel && businessNo) {
      dispatch({
        type: `${NAMESPACE}/loadUWLinkDisplayConfig`,
        payload: {
          channel,
          businessNo,
        },
      });
    }
  }, [dispatch, channel, businessNo]);
};
