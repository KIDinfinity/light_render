import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { useParams } from 'umi';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import AgentType from 'process/NewBusiness/Enum/AgentType';

export default () => {
  const dispatch = useDispatch();
  const agentList =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.agentList,
      shallowEqual
    ) || [];
  const params: any = useParams();
  const channel = useMemo(() => {
    return formUtils.queryValue(
      lodash
        .chain(agentList)
        .find((item) => item.agentType === AgentType.Primary)
        .get('agentChannelCode')
        .value()
    );
  }, [agentList]);
  return useEffect(() => {
    if (channel) {
      dispatch({
        type: `${NAMESPACE}/loadUWLinkDisplayConfig`,
        payload: {
          channel,
          params,
        },
      });
    }
  }, [channel]);
};
