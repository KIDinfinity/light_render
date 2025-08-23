import { useMemo } from 'react';
import {  useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import useJudgeLastClient from 'process/NB/ManualUnderwriting/_hooks/useJudgeLastClient';
import Mode from 'process/NB/ManualUnderwriting/Enum/Mode';
import useJudgeIsMyEntityPolicyOwner from 'process/NB/ManualUnderwriting/_hooks/useJudgeIsMyEntityPolicyOwner';
import useJudgeIsHealthFamilySharingMember from './useJudgeIsHealthFamilySharingMember';

export default ({ mode, clientItem }: any) => {
  const editable = !useSelector(
    ({ claimEditable }: any) => claimEditable.taskNotEditable,
    shallowEqual
  );
  const myEspecialClient = useJudgeIsMyEntityPolicyOwner({ id: clientItem?.id });
  const isHealthFamilySharingMember = useJudgeIsHealthFamilySharingMember({
    roleList: clientItem?.roleList,
  });
  // 如果是最后一个客人，不显示删除按钮
  const isLastClient = useJudgeLastClient();
  return useMemo(() => {
    if (isLastClient) {
      return false;
    }
    if (!editable) {
      return false;
    }
    if (mode === Mode.Show) {
      return false;
    }
    if (myEspecialClient) {
      return false;
    }
    if (isHealthFamilySharingMember) {
      return false;
    }
    return true;
  }, [editable, mode, isLastClient, clientItem]);
};
