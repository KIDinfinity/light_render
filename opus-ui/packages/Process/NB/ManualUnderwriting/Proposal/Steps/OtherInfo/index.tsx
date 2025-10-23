import React, { useState, useEffect } from 'react';
import { useDispatch } from 'dva';
import { Icon, Button } from 'antd';
import lodash from 'lodash';
import classnames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { FormAntCard } from 'basic/components/Form';
import DistributionChannelField from 'process/NB/ManualUnderwriting/DistributionChannel/DistributionChannel-Field';
import DistributionChannelHeader from 'process/NB/ManualUnderwriting/DistributionChannel/DistributionChannel-Header';
import useGetDistributionChannel from 'process/NB/ManualUnderwriting/_hooks/useGetDistributionChannel';
import useGetBankstaffnoDict from 'process/NB/ManualUnderwriting/_hooks/useGetBankstaffnoDict';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useHandleAddAgentCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleAddAgentCallback';
import useHandleDeleteAgentCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleDeleteAgentCallback';
import useGetAddAgentButtonDisabled from 'process/NB/ManualUnderwriting/_hooks/useGetAddAgentButtonDisabled';
import styles from './index.less';

const OtherInfo: React.FC = () => {
  const data = useGetDistributionChannel();
  const dispatch = useDispatch();
  const [expendStatus, setExpendStatus] = useState(true);
  const addAgenyItem = useHandleAddAgentCallback();
  const deleteAgentItem = useHandleDeleteAgentCallback();
  const disabled = useGetAddAgentButtonDisabled();
  useGetBankstaffnoDict();

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/searchAllCfgBranchCode`,
    });
    dispatch({
      type: `${NAMESPACE}/searchAllCfgBankCode`,
    });
  }, []);

  return (
    <>
      <div className={styles.wrap}>
        <div className={classnames(styles.head, { [styles.hidden]: expendStatus })}>
          <span className={styles.title}>
            {formatMessageApi({ Label_BIZ_Policy: 'DistributionChannel' })}
          </span>
          <div className={styles.info}>
            <DistributionChannelHeader />
          </div>
          <div className={styles.actions}>
            <Icon
              type={!expendStatus ? 'down' : 'up'}
              onClick={() => setExpendStatus(!expendStatus)}
            />
          </div>
          <div className={styles.addAgentButton}>
            <Button onClick={addAgenyItem} size="small" disabled={disabled}>
              Add Agent
            </Button>
          </div>
        </div>
        <div className={styles.card}>
          {lodash.map(data, (itemData: any, index: any) => {
            if (expendStatus) {
              return (
                <div className={styles.cardItem}>
                  <FormAntCard>
                    {index !== 0 && (
                      <div className={styles.close} onClick={() => deleteAgentItem(itemData?.id)}>
                        <Icon type="close" />
                      </div>
                    )}
                    <DistributionChannelField itemData={itemData} />
                  </FormAntCard>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

OtherInfo.displayName = 'OtherInfo';

export default OtherInfo;
