import React from 'react';
import { connect } from 'dva';
import { List } from 'antd';
import moment from 'moment';
import lodash from 'lodash';
import Ellipsis from '@/components/Ellipsis';
import { FormatMessageHTML, formatMessageApi } from '@/utils/dictFormatMessage';
import useExpanderController from 'navigator/hooks/useExpanderController';
import { Action } from '@/components/AuditLog/Enum';
import { checkEnvoy } from '@/components/AuditLog/Utils/checkActionGroup';
import { IsTimeStamp } from '../../_utils';

import styles from './Item.less';

function HistoryListItem(props) {
  const { item } = props;
  const { isExpanderSwitchOn } = useExpanderController();

  const renderContent = () => {
    const { action } = item;

    const isEnvoy = checkEnvoy(action);

    let componentItem;
    // 保存
    if (action === Action.Save) {
      const renderSelectSpan = (contentChild: any) => {
        return contentChild.section && contentChild.section !== '' ? (
          <div
            className={styles.sectionValue}
            title={`${contentChild.label}(${formatMessageApi({
              Label_COM_AuditLog: contentChild.section,
            })})`}
          >
            {contentChild.label}{' '}
            <span>({formatMessageApi({ Label_COM_AuditLog: contentChild.section })})</span>
          </div>
        ) : (
          <div className={styles.sectionValue} title={`${contentChild.label}`}>
            {contentChild.label}
          </div>
        );
      };
      componentItem = (
        <div className={isExpanderSwitchOn ? styles.listWrapAudit : styles.listWrap}>
          {item?.content &&
            lodash.map(item?.content, (contentChild: any, index: number) => (
              <div
                className={isExpanderSwitchOn ? styles.itemWrapAudit : styles.itemWrap}
                key={index}
              >
                {contentChild.type === Action.SaveUpdate && (
                  <>
                    <div className={styles.newValue}>{contentChild.newValue}</div>
                    <div className={styles.oldValue}>
                      {IsTimeStamp(contentChild.oldValue)
                        ? moment(contentChild.oldValue).format('DD/MM/YYYY')
                        : contentChild.oldValue}
                    </div>
                  </>
                )}
                {contentChild.type === Action.SaveAdd && (
                  <>
                    <div className={styles.newValue}>{contentChild.pathName}</div>
                  </>
                )}
                {contentChild.type === Action.SaveRemove && (
                  <>
                    <div className={styles.oldValue}>{contentChild.pathName}</div>
                  </>
                )}
                {renderSelectSpan(contentChild)}
              </div>
            ))}
        </div>
      );
    } else if (isEnvoy || action === Action.AddInformation || action === Action.Acknowledge) {
      const result = isEnvoy
        ? item.pendingReason || item.desc
        : action === Action.Acknowledge
        ? item.desc
        : item.category;
      // penidng
      componentItem = (
        <div className={isExpanderSwitchOn ? styles.listWrapAudit : styles.listWrap}>
          <div className={isExpanderSwitchOn ? styles.itemWrapAudit : styles.itemWrap}>
            <div className={styles.newValue}>{result}</div>
          </div>
        </div>
      );
    } else if (action === Action.Assign || action === Action.BatchAssign) {
      componentItem = (
        <div className={styles.itemWrap}>
          <div className={styles.newValue}>{item?.beAssignedUserName}</div>
          <div className={styles.oldValue}>{item?.formerAssigneeName}</div>
        </div>
      );
    } else if (action === Action.UpdateNtuDate) {
      componentItem = (
        <div className={styles.itemWrap}>
          {item.content &&
            lodash.map(item?.content, (contentChild: any) => (
              <>
                <div className={styles.newValue}>{contentChild.newValue}</div>
                <div className={styles.oldValue}>{contentChild.oldValue}</div>
              </>
            ))}
        </div>
      );
    }
    return componentItem;
  };
  // eslint-disable-next-line no-shadow
  const renderWrap = () => (
    <div className={styles.wrap}>
      <div className={styles.headWrap}>
        <div className={styles.iconWrap}>
          <span className={styles.icon} />
        </div>
        <div className={styles.contextWrap}>
          <Ellipsis lines={1} tooltip forceTooltip>
            {formatMessageApi({
              Label_BIZ_Claim: `app.navigator.drawer.auditLog.trigger.${item.action}`,
            })}
            /
            <FormatMessageHTML templateId={{ activity: item.procActivityKey }} />
            {item.content && item.content[0]?.titleSection
              ? ` ${formatMessageApi({
                  Label_COM_AuditLog: item.content[0]?.titleSection,
                })}`
              : ''}
          </Ellipsis>
        </div>
        <div className={isExpanderSwitchOn ? styles.userWrapAudit : styles.userWrap}>
          <Ellipsis lines={1} tooltip forceTooltip>
            {item.operaor}
          </Ellipsis>
        </div>
      </div>
      <>{renderContent()}</>
    </div>
  );

  return (
    <List.Item>
      <List.Item.Meta description={renderWrap()} />
      <div className={styles.createDate}>{moment(item.date).format('L LT').replace(/-/g, '/')}</div>
    </List.Item>
  );
}

export default connect()(HistoryListItem);
