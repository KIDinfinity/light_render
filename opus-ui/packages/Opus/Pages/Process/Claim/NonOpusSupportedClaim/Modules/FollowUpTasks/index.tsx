import React, { useState } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { useDispatch } from 'dva';
import { Icon } from 'antd';
import { ReactComponent as AddIcon } from 'opus/Modules/Envoy/Assets/add.svg';
import { ReactComponent as TaskIcon } from 'opus/Assets/icon-task.svg';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './FollowUpTask.less';
import FollowUpTask from './FollowUpTask';
import { NAMESPACE } from '../../activity.config';
import useGetFollowUpTaskEditable from '../../_models/functions/useGetFollowUpTaskEditable';

const Add = () => {
  const dispatch = useDispatch();

  const onAdd = () => {
    dispatch({
      type: `${NAMESPACE}/followUpTaskAdd`,
    });
  };

  return <Icon component={AddIcon} onClick={onAdd} />;
};

const FollowUpTaskList = () => {
  const followUpInfoList = useSelector(
    (state: any) => state.opusNonOpusClaimManagement?.businessData?.followUpInfoList
  );
  const editable = useGetFollowUpTaskEditable();

  const [expand, setExpand] = useState(true);

  const showExpandButton =
    (Array.isArray(followUpInfoList) && followUpInfoList?.length > 0) || !editable;

  return (
    <>
      <div className={styles.followUpTaskHeader}>
        <div className={styles.titleRow}>
          <Icon component={TaskIcon} className={styles.titleIcon} />
          {formatMessageApi({ Label_COM_OPUS: 'followUpTasks' })}
          <div className={styles.gap} />
          {editable && (!followUpInfoList || followUpInfoList?.length === 0) && <Add />}
          {showExpandButton && (
            <Icon
              className={styles.expandIcon}
              type={expand ? 'down' : 'up'}
              onClick={() => setExpand((v: boolean) => !v)}
            />
          )}
        </div>

        {!lodash.isEmpty(followUpInfoList) &&
          expand &&
          followUpInfoList?.map((item: any, index: any) => (
            <FollowUpTask key={String(index)} item={item} index={index} />
          ))}
      </div>
    </>
  );
};

export default FollowUpTaskList;
