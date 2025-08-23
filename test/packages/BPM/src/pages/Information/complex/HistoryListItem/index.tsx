import React from 'react';
import { List } from 'antd';

import moment from 'moment';
import lodash from 'lodash';
import { FormatMessageHTML } from '@/utils/dictFormatMessage';
import HistoryListItemContent from 'bpm/pages/Information/complex/HistoryListItemContent';
import styles from './index.less';

function HistoryListItem(props: any) {
  const { item: informationListItem, index, categoryCode, activeKey } = props;

  const renderContent = () => {
    return (
      <div className={styles.desc}>
        <div className="title">
          <div className="titleText">
            <div className="titleLeft">
              {/* <div className={`noticeDot${item.readStatus === 1 ? ' active' : ''}`}></div> */}
              <div className="status">
                <FormatMessageHTML
                  templateId={{ Label_BPM_CaseCategory: informationListItem.caseCategory }}
                />
                /
                <FormatMessageHTML templateId={{ activity: informationListItem.procActivityKey }} />
              </div>
            </div>
            <div>{informationListItem.creator}</div>
          </div>
        </div>
        {lodash.map(informationListItem.informationDOList, (item, key) => (
          <HistoryListItemContent
            item={item}
            key={key}
            informationListIndex={index}
            categoryCode={categoryCode}
            activeKey={activeKey}
            recordFormatting={informationListItem?.recordFormatting}
          />
        ))}
      </div>
    );
  };
  return (
    <List.Item>
      <List.Item.Meta description={renderContent()} />
      <span className={styles.createDate}>
        {moment(informationListItem.creationDate).format('L LT').replace(/-/g, '/')}
      </span>
    </List.Item>
  );
}

export default HistoryListItem;
