import React from 'react';
import lodash from 'lodash';
import { Collapse, Typography } from 'antd';
import styles from './index.less';
import CallStatusIcon from 'integration/CallStatusIcon';
import classNames from 'classnames';
import { useSelector } from 'dva';
import useSelectItemCallback from 'integration/_hooks/useSelectItemCallback';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const { Panel } = Collapse;
export default (props) => {
  const { panelItem } = props;
  const hightlightId = useSelector((state) => state?.integration?.currentIntegrationId);
  const handleClick = useSelectItemCallback();

  return (
    <Panel key={panelItem.activityKey} {...props}>
      <div className={styles.checklist}>
        {lodash.map(panelItem.integrationCallRecordList, (integrationItem) => {
          return (
            <div
              className={classNames(styles.listItem, {
                [styles.error]: integrationItem.integrationSessionId === hightlightId,
              })}
              key={integrationItem.integrationSessionId}
              onClick={(e) => {
                handleClick({ panelItem, integrationItem });
              }}
            >
              <div className={styles.listItemLeft}>
                <span className={styles.itemIcon}>
                  <CallStatusIcon callStatus={integrationItem.callStatus} />
                </span>
                <span>
                  <Typography.Text
                    ellipsis={true}
                    style={{ verticalAlign: 'bottom', width: '80%' }}
                    title={integrationItem.integrationCode}
                  >
                    {formatMessageApi({
                      Dropdown_COM_IntegrationCode: integrationItem.integrationCode,
                    })}
                  </Typography.Text>
                </span>
              </div>
              <div className={styles.listItemRight} title={integrationItem.systemCode}>
                <span>{integrationItem.systemCode}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
};
