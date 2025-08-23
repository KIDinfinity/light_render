import React, { useState, useEffect } from 'react';
import { Commonbox } from '../index';
import styles from './index.less';
import { Spin, notification, Icon } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { centerRequest } from '@/services/monitorCenterControllerService';
import { monitorParams } from '../../utils';
import { MonitorItemCode } from '../../enum';
import { handleMessageModal } from '@/utils/commonMessage';
import classnames from 'classnames';
import { handleWarnMessageModal } from '@/utils/commonMessage';
import { safeParseUtil } from '@/utils/utils';

function Switch({ onChange, check, label, loading }) {
  return (
    <div className={styles.switchBox}>
      <div className={styles.switchBtn}>
        <div>{formatMessageApi({ Label_COM_MonitorCenter: label })}</div>
        <div className={styles.mode}>
          <div
            className={classnames({
              [styles.selectMode]: check === 0,
              [styles.notSelectMode]: check !== 0,
            })}
            onClick={() => {
              if (check === 0 || loading) return;
              onChange(0);
            }}
          >
            {check === 0 && loading ? <Icon type="loading" /> : 'On'}
          </div>
          <div
            className={classnames({
              [styles.selectMode]: check !== 0,
              [styles.notSelectOfflineMode]: check === 0,
              [styles.status02]: check === 2,
            })}
            onClick={() => {
              if (check === 1 || loading) return;
              onChange(1);
            }}
          >
            {check !== 0 && loading ? <Icon type="loading" /> : 'Off'}
          </div>
        </div>
      </div>
      {check === 2 && (
        <div className={styles.warnLabel}>
          {formatMessageApi({ Label_COM_MonitorCenter: 'InconsistentStatuses' })}
        </div>
      )}
    </div>
  );
}

function DisableDowntime({ setExpand, isExpand }) {
  const [listData, setListData] = useState([]);
  const [switchLoading, setSwitchLoading] = useState(false);
  const [triggerCode, setTriggerCode] = useState(null);
  const [listDataLoading, setListDataLoading] = useState(false);

  const getListData = async () => {
    setListDataLoading(true);
    const response = await centerRequest(
      ...monitorParams(MonitorItemCode.tools_query_week_integration_downtime_config, {})
    );
    if (response?.success) {
      const parseData = safeParseUtil(response.responseData.resultData)?.resultData || [];
      setListData(parseData);
    }
    setListDataLoading(false);
  };

  useEffect(() => {
    getListData();
  }, []);

  const changeIsDeletedHandle = async (requestCode, status) => {
    setTriggerCode(requestCode);
    setSwitchLoading(true);

    const response = await centerRequest(
      ...monitorParams(MonitorItemCode.tools_switch_week_integration_downtime_config, {
        params: {
          status,
          requestCode,
        },
        currentPage: 1,
        pageSize: 3,
      })
    );

    if (response && response.success) {
      await getListData();
      notification.success({ message: 'Success!' });
    } else {
      handleMessageModal(response.messageList || response.promptMessages);
    }
    setTriggerCode(null);
    setSwitchLoading(false);
  };

  const checkConfirmByType = (requestCode, status) => {
    handleWarnMessageModal(
      [
        {
          content: formatMessageApi({
            Label_COM_MonitorCenter: status === 0 ? 'MSG_001333' : 'MSG_001332',
          }),
        },
      ],
      {
        hiddenExtraText: true,
        okFn: async () => {
          changeIsDeletedHandle(requestCode, status);
        },
      }
    );
  };

  return (
    <div className={styles.integrationErrorBox}>
      <Commonbox
        title={formatMessageApi({ Label_COM_MonitorCenter: 'DisableDowntime' })}
        click={() => setExpand(!isExpand)}
      >
        <div className={styles.switchList}>
          {listDataLoading ? (
            <Spin />
          ) : (
            listData.map((item) => (
              <Switch
                key={item?.requestCode}
                onChange={(e) => {
                  checkConfirmByType(item?.requestCode, e);
                }}
                check={item?.status}
                label={item?.requestCode}
                loading={triggerCode === item?.requestCode && switchLoading}
              />
            ))
          )}
        </div>
      </Commonbox>
    </div>
  );
}

export default DisableDowntime;
