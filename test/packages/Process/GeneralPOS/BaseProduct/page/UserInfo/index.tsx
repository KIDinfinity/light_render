import React, { useEffect } from 'react';
import CustomerInfo from '../../SectionComponents/CustomerInfo';
import AgentInfo from '../../SectionComponents/AgentInfo';
import InsuredInfo from '../../SectionComponents/InsuredInfo';
import PayorInfo from '../../SectionComponents/PayorInfo';
import LoopBox from './LoopBox';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';
import CommonLoopBox from '@/components/CommonLoopBox';

export default function Index() {
  const dispatch = useDispatch();
  const policyInfo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.policyInfo
  );

  const sortRoleClientIdList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.sortRoleClientIdList
  );
  const sortRoleByClientId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.sortRoleByClientId
  );

  const taskStatus = useSelector(({ processTask }: any) => processTask?.getTask?.taskStatus);

  useEffect(() => {
    if (!lodash.isEmpty(policyInfo)) {
      dispatch({
        type: `${NAMESPACE}/clientRoleInit`,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [policyInfo]);

  useEffect(() => {
    if (['todo', 'pending'].includes(taskStatus)) {
      dispatch({
        type: `${NAMESPACE}/getAge`,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskStatus]);

  return (
    <CommonLoopBox
      detailChildren={(props) => {
        const role = sortRoleByClientId?.[props?.id]?.roles?.[0];
        const roleMap = {
          SA: <AgentInfo {...props} />,
          CUS005: <PayorInfo {...props} />,
          CUS001: <InsuredInfo {...props} />,
          CUS002: <CustomerInfo {...props} />,
        };
        return roleMap[role] || null;
      }}
      selectChildren={(props) => <LoopBox {...props} />}
      disPlayList={sortRoleClientIdList}
    />
  );
}
