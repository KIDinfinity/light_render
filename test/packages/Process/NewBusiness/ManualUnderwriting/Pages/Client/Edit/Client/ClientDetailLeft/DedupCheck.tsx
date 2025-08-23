import React, { useMemo } from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';
import styles from './index.less';

export default ({ clientId }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(
    ({ claimEditable }: any) => claimEditable.taskNotEditable,
    shallowEqual
  );

  // const handleProposalChange = useClientCheckDuplicate(clientId);
  const onCheckDuplicate = () => {
    dispatch({
      type: `${NAMESPACE}/checkDuplicate`,
      payload: {
        clientId,
      },
    });
  };

  const listDedupCheckCfg = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.listDedupCheckCfg
  );
  const roleList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.modalData.entities?.clientMap?.[clientId]?.personalInfo?.customerRole,
    shallowEqual
  );

  const isShow = useMemo(
    () =>
      lodash.some(
        formUtils.queryValue(roleList),
        (role) =>
          lodash.find(listDedupCheckCfg, { customerRole: role })?.checkDuplicate
      ),
    [listDedupCheckCfg, roleList]
  );

  return isShow ? (
    <Button onClick={onCheckDuplicate} className={styles.dedupCheckButton} disabled={!editable}>
      Check Duplicate
    </Button>
  ) : null;
};
