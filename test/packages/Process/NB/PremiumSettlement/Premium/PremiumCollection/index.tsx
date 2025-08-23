import React, { useEffect, useState } from 'react';
import { Icon } from 'antd';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import classnames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import BasicPremiumCollection from './BasicPremiumCollection';
import VarietyPremiumCollection from './VarietyPremiumCollection';
import ProcessStatusType from 'process/NB/PremiumSettlement/Enum/processStatusType';
import useHandleRefreshCallback from 'process/NB/PremiumSettlement/_hooks/useHandleRefreshCallback';
import useGetRejected from 'process/NB/PremiumSettlement/_hooks/useGetRejected';
import useSetProcessStatus from 'process/NB/PremiumSettlement/_hooks/useSetProcessStatus';
import TaskStatus from 'process/NB/PremiumSettlement/Enum/taskStatus';
import { NAMESPACE } from '../../activity.config';
import styles from './index.less';

const CollectionProcess = () => {
  const dispatch = useDispatch();

  const taskDetail = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.taskDetail
  );
  const needRefreshPremium = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.needRefreshPremium
  );
  const taskNotEditable = useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const [loading, setLoading] = useState(false);
  const taskStatus = lodash.get(taskDetail, 'taskStatus', '');
  const processStatus = useSetProcessStatus();
  const rejected = useGetRejected();
  const refresh = useHandleRefreshCallback({
    setLoading,
    loading,
  });

  useEffect(() => {
    if (needRefreshPremium && processStatus !== ProcessStatusType.Error) {
      refresh();
      dispatch({
        type: `${NAMESPACE}/saveNeedRefreshPremium`,
        payload: {
          needRefreshPremium: false,
        },
      });
    }
  }, [needRefreshPremium, processStatus]);

  return (
    <div className={styles.wrap}>
      <div className={styles.varietyPremium}>
        <VarietyPremiumCollection />
      </div>
      <BasicPremiumCollection />
      <div className={styles.col}>
        {taskStatus !== TaskStatus.Completed && !rejected ? (
          <div
            className={classnames(styles.refresh, {
              [styles.disabled]: taskNotEditable,
            })}
            onClick={refresh}
          >
            {loading ? (
              <Icon type="sync" spin className={styles.reload} />
            ) : (
              <Icon type="reload" className={styles.reload} />
            )}
            <span className={styles.status}>
              {processStatus === ProcessStatusType.Error
                ? formatMessageApi({
                    Label_BPM_Button: 'Retry',
                  })
                : formatMessageApi({
                    Label_BPM_Button: 'Refresh',
                  })}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CollectionProcess;
