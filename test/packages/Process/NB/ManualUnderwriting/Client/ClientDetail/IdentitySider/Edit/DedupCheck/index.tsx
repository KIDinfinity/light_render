import React, { useMemo } from 'react';
import { Button } from 'antd';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import useClientCheckDuplicate from 'process/NB/ManualUnderwriting/_hooks/useClientCheckDuplicate';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import styles from './index.less';

export default (props: any) => {
  const editable = !useSelector(
    ({ claimEditable }: any) => claimEditable.taskNotEditable,
    shallowEqual
  );

  const handleProposalChange = useClientCheckDuplicate(props.id);

  const listDedupCheckCfg = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.listDedupCheckCfg
  );
  const rolelist = useSelector(({ [NAMESPACE]: modelnamepsace }: any) =>
    lodash.get(modelnamepsace, 'businessData.policyList.0.clientInfoList.0.roleList')?.filter(roleData => !roleData.deleted)
  , shallowEqual);

  const isShow = useMemo(
    () =>
      lodash.some(
        rolelist,
        (role) =>
          lodash.find(listDedupCheckCfg, { customerRole: role.customerRole })?.checkDuplicate
      ),
    [listDedupCheckCfg, rolelist]
  );

  return isShow ? (
    <Button onClick={handleProposalChange} className={styles.dedupCheckButton} disabled={!editable}>
      Check Duplicate
    </Button>
  ) : null;
};
