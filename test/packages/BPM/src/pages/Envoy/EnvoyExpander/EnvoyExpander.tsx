import { connect } from 'dva';
import React from 'react';
import lodash from 'lodash';
import Empty from '@/components/Empty';
import styles from './EnvoyExpander.less';
import EnvoyNotEmpty from './EnvoyNotEmpty';
import CurrentReasonGroupExpand from '../EnvoyList/CurrentReasonGroup/CurrentReasonGroupExpand';
import hasExpandModule from '../_utils/hasExpandModule';
import classnames from 'classnames';

const EnvoyContent = ({
  type,
  currentReasonGroups,
  groupIdx,
  idx,
  reminderIndex,
  isCurrentList,
}: any) => {
  const currentReasonGroup = lodash.get(currentReasonGroups, `[${groupIdx}]`);
  const showExpandReason = hasExpandModule(currentReasonGroup);
  if (type === 'reason') {
    return (
      <div
        className={classnames({
          [styles.content]: true,
        })}
      >
        {showExpandReason ? (
          <CurrentReasonGroupExpand
            reasonGroup={currentReasonGroup}
            groupIdx={groupIdx}
            isCurrentList={isCurrentList}
            key={`reasonGroup_${groupIdx}`}
          />
        ) : (
          <EnvoyNotEmpty
            reasonData={lodash.get(currentReasonGroups, `[${groupIdx}].reasonDetails[${idx}]`)}
            curReasonDetail={lodash.get(currentReasonGroups, `[${groupIdx}].reasonDetails[${idx}]`)}
          />
        )}
      </div>
    );
  }
  if (type === 'reminder') {
    return (
      <div className={styles.content}>
        <EnvoyNotEmpty
          reasonData={lodash.get(currentReasonGroups, `[${groupIdx}].reasonDetails[${idx}]`)}
          curReasonDetail={lodash.get(
            currentReasonGroups,
            `[${groupIdx}].reasonDetails[${idx}].reasonReminders[${reminderIndex}]`
          )}
        />
      </div>
    );
  }
  return <></>;
};
const EnvoyExpander = (props: any) => {
  const {
    activedGroupKey,
    historyGroupKey,
    viewReasonInfo,
    currentReasonGroups,
    historyReasonGroups,
    reminderIndex,
  } = props;
  const { groupIdx, type, isCurrentList, idx } = lodash.pick(viewReasonInfo, [
    'groupIdx',
    'idx',
    'type',
    'isCurrentList',
  ]);
  const curIsEmpty = lodash.get(currentReasonGroups, `[${groupIdx}].[id]`);
  return (
    <>
      {/* 没有选择 */}
      {activedGroupKey === null && historyGroupKey === null ? (
        <div className={styles.hintContent}>Please select a pending record.</div>
      ) : null}
      {/* 展示pennding */}
      {activedGroupKey !== null && isCurrentList && (
        <>
          {!curIsEmpty && (
            <div className={styles.noData}>
              <Empty />
            </div>
          )}
          {curIsEmpty && (
            <EnvoyContent
              type={type}
              currentReasonGroups={currentReasonGroups}
              groupIdx={groupIdx}
              idx={idx}
              isCurrentList={isCurrentList}
              reminderIndex={reminderIndex}
            />
          )}
        </>
      )}
      {/* 展示history */}
      {historyGroupKey !== null && !isCurrentList && (
        <EnvoyContent
          type={type}
          currentReasonGroups={historyReasonGroups}
          groupIdx={groupIdx}
          idx={idx}
          isCurrentList={isCurrentList}
          reminderIndex={reminderIndex}
        />
      )}
    </>
  );
};

export default connect(({ envoyController }: any) => ({
  activedGroupKey: envoyController?.activedGroupKey,
  historyGroupKey: envoyController?.historyGroupKey,
  viewReasonInfo: envoyController?.viewReasonInfo,
  currentReasonGroups: envoyController?.currentReasonGroups,
  historyReasonGroups: envoyController?.historyReasonGroups,
  viewChannel: envoyController?.viewChannel,
  reminderIndex: envoyController?.reminderIndex,
}))(EnvoyExpander);
