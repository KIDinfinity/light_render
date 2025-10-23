import React from 'react';
import lodash from 'lodash';
import styles from './Content.less';
import moment from 'moment';
import { Avatar } from 'antd';
import { Action } from '@/components/AuditLog/Enum';
import { checkEnvoy } from '@/components/AuditLog/Utils/checkActionGroup';
import { getFirstLetters, getRandomColor } from 'opus/Utils';
import { useSelector } from 'dva';
import NAMESPACE from '../../_models/namespace';
import { formatMessageApi } from '@/utils/dictFormatMessage';
//针对clientInfo[0].crtInfoList[3],抽取出crtInfo
//该函数会提取.分割的最后一个元素List前字符串
const extractSectionName = (str) => {
  if (!str) {
    return '';
  }
  const reg = /^(.*?)(List(\[\d+\])?)?$/;
  const strList = str.split('.');
  const lastPart = strList?.[strList.length - 1];
  return lastPart.match(reg)?.[1];
};

//包含额外message展示在第一行的，默认展示category字段
const addInformationList = [Action.AddInformation, Action.ReOpen, Action.Refresh];
export default ({ item }) => {
  const {
    action,
    formerAssigneeName,
    beAssignedUserName,
    date,
    operateDate,
    extraData,
    beAssignedUserId,
    formerAssigneeId,
  } = item;

  const saveDateClass = (
    <div className={styles.saveDateClass}>
      {operateDate ? moment(operateDate).format('L LT').replace(/-/g, '/') : ''}
    </div>
  );

  const colorDict = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.colorDict
  );
  const isEnvoy = checkEnvoy(action);
  const newAsignee = formatMessageApi({
    Label_COM_Opus: 'newAssignee',
  });
  const oldAssignee = formatMessageApi({
    Label_COM_Opus: 'oldAssignee',
  });
  let componentItem;
  //Assign action component
  const AssignItemComponent = ({ assignee, assigneeId, isFirst }) => {
    return (
      <div className={styles.auditLogContent}>
        <div className={styles.changeOperatorClass}>
          <span className={styles.changeOperatorLabel}>{isFirst ? newAsignee : oldAssignee}</span>
          <Avatar
            shape="circle"
            size={20}
            style={{ backgroundColor: colorDict[assigneeId] || getRandomColor() }}
            className={styles.changeOperatorAvatar}
          >
            {getFirstLetters(assignee)}
          </Avatar>
          {isFirst && <span>{assignee}</span>}
          {!isFirst && <span className={styles.strikeThrough}>{assignee}</span>}
        </div>
        {isFirst && saveDateClass}
      </div>
    );
  };
  //fieldName优先取label，这个有国际化，没有就取fieldName
  const Label = ({ fieldName, section }) => {
    return (
      <>
        {fieldName && section ? (
          <span>
            {fieldName} - {section}
          </span>
        ) : (
          <span>{section || fieldName || 'defaultField'}</span>
        )}
      </>
    );
  };
  // 保存
  if (action === Action.Save) {
    componentItem = (
      <div className={styles.auditContentWrap}>
        {item.content &&
          lodash.map(item.content, (contentChild: any, index: number) => {
            const { oldValue, newValue, fieldName, type, label, path, titleSection } = contentChild;
            const section = contentChild.section ? contentChild.section : contentChild.titleSection;
            return (
              <div key={index}>
                {type === Action.SaveUpdate && (
                  <>
                    <div
                      className={
                        index === 0
                          ? `${styles.auditLogContent} ${styles.partialRow}`
                          : `${styles.auditLogContent} ${styles.totalRow}`
                      }
                    >
                      <div className={styles.contentBox}>
                        <div className={styles.colonSplit}>
                          <Label
                            fieldName={label || fieldName}
                            section={section || titleSection || extractSectionName(path)}
                          />
                          <span> : </span>
                        </div>
                        <span className={styles.updateNewValue}>
                          {lodash.isPlainObject(newValue) ? '' : newValue}
                        </span>
                        <span> </span>
                        <span className={styles.strikeThrough}>
                          {lodash.isPlainObject(oldValue) ? '' : oldValue}
                        </span>
                      </div>
                    </div>
                  </>
                )}
                {type === Action.SaveAdd && (
                  <>
                    <div className={styles.auditLogContent}>
                      {newValue && (
                        <div className={styles.colonSplit}>
                          <Label
                            fieldName={label || fieldName}
                            section={titleSection || section || extractSectionName(path)}
                          />
                          <span>{section && ' : '}</span>
                        </div>
                      )}
                      {newValue ? newValue : label || section || extractSectionName(path)}
                    </div>
                  </>
                )}
                {type === Action.SaveRemove && (
                  <>
                    <div className={styles.auditLogContent}>
                      {oldValue && (
                        <div className={styles.colonSplit}>
                          <Label
                            fieldName={label || fieldName}
                            section={titleSection || section || extractSectionName(path)}
                          />
                          <span>{section && ' : '}</span>
                        </div>
                      )}
                      {oldValue ? (
                        <span className={styles.strikeThrough}>{oldValue}</span>
                      ) : (
                        <span>{label || section || extractSectionName(path)}</span>
                      )}
                    </div>
                  </>
                )}
                {index === 0 && saveDateClass}
              </div>
            );
          })}
      </div>
    );
  } else if (isEnvoy || lodash.includes(addInformationList, action)) {
    let result = isEnvoy ? item.desc : item.category;
    let memoCodeStr;
    if (extraData && extraData?.memoCodeList?.length > 0) {
      memoCodeStr = extraData?.memoCodeList?.map((ele) => ele).join(',');
      result = result + ',' + memoCodeStr;
    }
    // penidng
    componentItem = (
      <div className={styles.auditContentWrap}>
        <div className={styles.auditLogContent}>
          <div className={styles.newValue}>{result}</div>
          {item.content && <div className={styles.content}>{item.content}</div>}
          {saveDateClass}
        </div>
      </div>
    );
  } else if (
    action === Action.Assign ||
    action === Action.AutoAssignment ||
    action === Action.Escalate ||
    action === Action.AutoEscalate
  ) {
    componentItem = (
      <div className={styles.auditContentWrap}>
        <AssignItemComponent
          assignee={beAssignedUserName}
          assigneeId={beAssignedUserId}
          isFirst={true}
        />
        <AssignItemComponent
          assignee={formerAssigneeName}
          assigneeId={formerAssigneeId}
          isFirst={false}
        />
      </div>
    );
  } else if (action === Action.UpdateNtuDate) {
    componentItem = (
      <div className={styles.auditContentWrap}>
        {item.content &&
          lodash.map(item?.content, (contentChild: any, index) => {
            if (index === 0) {
              return (
                <>
                  <div className={styles.auditLogContent}>
                    <div className={styles.contentBox}>
                      <div>{contentChild.oldValue}</div>
                      <span className={styles.contentSplit}>{'->'}</span>
                      <div>{contentChild.newValue}</div>
                    </div>
                    {saveDateClass}
                  </div>
                </>
              );
            } else {
              return (
                <>
                  <div className={styles.auditLogContent}>
                    <div className={styles.contentBox}>
                      <div className={styles.oldValue}>{contentChild.oldValue}</div>
                      <span className={styles.contentSplit}>{'->'}</span>
                      <div className={styles.newValue}>{contentChild.newValue}</div>
                    </div>
                  </div>
                </>
              );
            }
          })}
      </div>
    );
  } else if (
    action === Action.DiscardWarningCorp ||
    action === Action.ConfirmWarningCorp ||
    action === Action.ConfrimWarningnNewCorp
  ) {
    componentItem = (
      <div className={styles.auditContentWrap}>
        {item.content &&
          lodash.map(item.content, (contentChild: any, index: number) => {
            const { oldValue, newValue, fieldName, type, label, path, titleSection } = contentChild;
            const section = contentChild.section ? contentChild.section : contentChild.titleSection;
            return (
              <div key={index}>
                {type === Action.SaveUpdate && (
                  <>
                    <div
                      className={
                        index === 0
                          ? `${styles.auditLogContent} ${styles.partialRow}`
                          : `${styles.auditLogContent} ${styles.totalRow}`
                      }
                    >
                      <div className={styles.contentBox}>
                        <div className={styles.colonSplit}>
                          <Label
                            fieldName={label || fieldName}
                            section={section || titleSection || extractSectionName(path)}
                          />
                          <span> : </span>
                        </div>
                        <span className={styles.updateNewValue}>
                          {lodash.isPlainObject(newValue) ? '' : newValue}
                        </span>
                        <span> </span>
                        <span className={styles.strikeThrough}>
                          {lodash.isPlainObject(oldValue) ? '' : oldValue}
                        </span>
                      </div>
                    </div>
                  </>
                )}
                {index === 0 && saveDateClass}
              </div>
            );
          })}
      </div>
    );
  } else {
    //默认其他操作展示时间
    componentItem = (
      <div className={styles.auditContentWrap}>
        <div className={styles.auditLogContent}>
          <div> </div>
          {saveDateClass}
        </div>
      </div>
    );
  }
  return componentItem;
};
