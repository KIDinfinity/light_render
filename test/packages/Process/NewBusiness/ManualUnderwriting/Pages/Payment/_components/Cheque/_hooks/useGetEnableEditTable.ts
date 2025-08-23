import { useMemo } from 'react';
import { useSelector } from 'dva';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import PayType from 'process/NewBusiness/Enum/PayType';
import ChequeEditStatus from 'process/NewBusiness/Enum/ChequeEditStatus';

interface IParams {
  showOnly: boolean;
  payType: string;
}
export default ({ showOnly, payType }: IParams) => {
  const editingAssignee: any =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.editingAssignee) || '';

  const chequeEditStatus: any =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.chequeEditStatus) || '';
  const taskNotEditable = useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return useMemo(() => {
    return (
      !taskNotEditable &&
      !showOnly &&
      !editingAssignee &&
      payType !== PayType.DirectTransfer &&
      chequeEditStatus !== ChequeEditStatus.Verified
    );
  }, [taskNotEditable, editingAssignee]);
};
