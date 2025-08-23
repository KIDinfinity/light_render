import React, { useState } from 'react';
import moment from 'moment';
import lodash from 'lodash';
import { connect } from 'dva';
import { Icon, Tooltip } from 'antd';
import { map, get, isNil, keys, includes, filter, isEmpty } from 'lodash';
import classNames from 'classnames';
import { formUtils } from 'basic/components/Form';
import { ActivityStatus } from 'bpm/pages/Information/enum/index';
import { history } from 'umi';
import styles from './index.less';
import replyMapObj from './replyMapObj';
import Date from './Date';
import RejectReason from './RejectReason';
import Policy from './Policy';
import useGetIsOverLength from 'bpm/pages/Information/_hooks/useGetIsOverLength';
import Read from '@/components/SolutionRead';
import { EType, ESubjectType } from '@/components/SolutionRead/Enums';
import { ReactComponent as SendIcon } from 'bpm/assets/send.svg';
import { safeParseUtil } from '@/utils/utils';
import { replaceRecord } from '../../_utils';
import safelySetInnerHTML from 'basic/utils/safelySetInnerHTML';

function replaceString(str) {
  const matchArr: any[] = [];
  const newStr = str.replace(/{{{{([0-9]*)}}}}/gi, (m, p1) => {
    matchArr.push(p1);
    return '__--__';
  });

  const replaceArr = newStr.split('__--__');
  const result = [];
  const handleClick = (value: string) => {
    history.push(`/navigator/case/detail/${value}`);
  };
  for (let i = 0; i < replaceArr.length; i++) {
    result.push(replaceArr[i]);
    if (matchArr.length > 0) {
      const caseNo = matchArr.shift();
      result.push(
        <span
          className={styles.link}
          onClick={() => {
            handleClick(caseNo);
          }}
        >
          {caseNo}
        </span>
      );
    }
  }
  return result;
}

function checkReadedEditable(
  authInfoEditable: boolean,
  informationData: any,
  currentActivity = {},
  defaultCategory: string,
  category: string
) {
  const activityCode = formUtils.queryValue(informationData.activityCode);
  const activityCategoryList = get(currentActivity, 'activityCategoryList', []);
  const activityCategory =
    activityCategoryList.find(
      (activityCategoryItem: any) => activityCategoryItem.categoryCode === category
    ) || {};
  const activityStatus = activityCategory.activityStatus || '';
  const showReadButton = isNil(activityCategory.showReadButton)
    ? false
    : !!activityCategory.showReadButton;

  // ("没有 infoEdit 权限" 或 "配置的已读按钮为不显示" 或 “不是当前节点” 或 "完结状态" 或 ”取消状态“) -> 不可编辑
  return !(
    !authInfoEditable ||
    !showReadButton ||
    defaultCategory !== activityCode ||
    activityStatus.toLowerCase() === ActivityStatus.Completed ||
    activityStatus.toLowerCase() === ActivityStatus.Cancelled
  );
}

function HistoryListItemContent(props) {
  const {
    item,
    authInfoEditable,
    informationData,
    currentActivity,
    defaultCategory,
    allCategoryTypeCode,
    sendEmailLoading,
    informationListIndex,
    categoryCode,
    activeKey,
    readData,
    isAssinee,
    recordFormatting,
  } = props;
  const showSendButton =
    ['01', '02', '03'].includes(safeParseUtil(item?.integrationProcessKey)?.returnTypeCode) &&
    categoryCode === 'ExceptionalMessage';
  const isReadedEditable = checkReadedEditable(
    authInfoEditable,
    informationData,
    currentActivity,
    defaultCategory,
    item.category
  );
  const [more, setMore] = useState(true);
  const [showTootip, setShowTootip] = useState(false);
  const maxLen = 90;
  const { dispatch } = props;
  const handleMore = () => {
    setMore(true);
  };
  const handleLess = () => {
    setMore(false);
  };
  const handleReply = () => {
    const { content, category } = item;
    dispatch({
      type: 'navigatorInformationController/handleReply',
      payload: {
        content,
        categoryCode: replyMapObj[category],
      },
    });
    setTimeout(() => {
      const textAreaDom = document.querySelector('.informationManageMentFormTextarea');
      if (textAreaDom) {
        const { value } = textAreaDom;
        textAreaDom.focus();
        textAreaDom.setSelectionRange(value.length, value.length);
      }
    }, 50);
  };
  const handleReaded = () => {
    const { id, readStatus } = item;
    const newReadStatus = readStatus === 1 ? 0 : 1;
    dispatch({
      type: 'navigatorInformationController/setInformationReaded',
      payload: {
        id,
        newReadStatus,
      },
    });
  };

  const handleContent = () => {
    if (!more) {
      handleMore();
    } else if (more) {
      handleLess();
    }
  };

  const handleSendEmail = (id) => {
    if (sendEmailLoading || item.sendEmail === 1) {
      return;
    }
    dispatch({
      type: 'navigatorInformationController/sendEmail',
      payload: {
        informationListIndex,
        informationId: id,
        categoryCode: item.category,
      },
    });
  };

  const useHandlePack = (
    content: any,
    category: any,
    effectiveDate: any,
    expiryDate: any,
    informationLinkToList: any,
    defaultDate: any,
    reason: any,
    id: string,
    record?: string
  ) => {
    const replaceContent = replaceRecord(content, record);
    const overLength = useGetIsOverLength({
      content,
      maxLength: maxLen,
    });
    const policyValueList = [];
    const policyList = filter(informationLinkToList, (el) => el?.linkToKey === 'policy');

    map(policyList, (policy) => policyValueList.push(policy?.linkToValue));
    return (
      <div>
        <div className={styles.contentText}>
          {!defaultDate && <Date effectiveDate={effectiveDate} expiryDate={expiryDate} />}
          {reason && (
            <RejectReason reason={reason} item={item} allCategoryTypeCode={allCategoryTypeCode} />
          )}
          {!isEmpty(policyValueList) && (
            <Policy policyValueList={policyValueList} styles={styles} />
          )}
          <div style={{ display: 'flex' }}>
            {content.indexOf('{{{{') < 0 ? (
              <div
                className={classNames(styles.content, {
                  [styles.less]: !more && overLength,
                })}
              >
                <div
                  className={styles.renderContent}
                  dangerouslySetInnerHTML={{
                    __html: safelySetInnerHTML(replaceContent),
                  }}
                />
              </div>
            ) : (
              <div
                className={classNames(styles.content, {
                  [styles.less]: !more && overLength,
                })}
              >
                <div>{replaceString(content)}</div>
              </div>
            )}
            {showSendButton && (
              <Tooltip
                title={'email to support team for further investigation'}
                visible={item.sendEmail !== 1 && showTootip}
                onVisibleChange={(visible) => {
                  if (item.sendEmail !== 1) {
                    setShowTootip(visible);
                  }
                }}
              >
                <div
                  className={classNames(styles.sendButton, {
                    [styles.sendButtonDisabled]: item.sendEmail === 1,
                    [styles.sendButtonLoading]: sendEmailLoading,
                  })}
                  onClick={() => {
                    handleSendEmail(id);
                  }}
                >
                  {sendEmailLoading ? <Icon type="loading" /> : <Icon component={SendIcon} />}
                </div>
              </Tooltip>
            )}
          </div>
        </div>
        {overLength && (
          <>
            {more && (
              <div className={classNames(styles.contentIcon, { [styles.hasSend]: showSendButton })}>
                <Icon type="up" onClick={() => handleContent(content, category)} />
              </div>
            )}
            {!more && (
              <div className={classNames(styles.contentIcon, { [styles.hasSend]: showSendButton })}>
                <Icon type="right" onClick={() => handleContent(content, category)} />
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  const showUnRead = (item: any) => {
    return (
      !!isAssinee &&
      !!lodash.includes(activeKey, categoryCode) &&
      !lodash.includes(readData[ESubjectType.INFORMATION], item.id)
    );
  };

  const useRenderContent = (item) => {
    const { contentType = 'normal', category } = item;
    const requireReply = includes(keys(replyMapObj), category);
    const content = useHandlePack(
      item?.content || '',
      item?.category,
      item?.effectiveDate,
      item?.expiryDate,
      item?.informationLinkToList,
      item?.defaultDate,
      item?.reason,
      item?.id,
      recordFormatting
    );
    const contentMap = {
      chat: (
        <div className={styles.chatContent}>
          {map(item.chatContent, (content, index) => {
            const time = content[0];
            return (
              <div key={`time-${index}`} className={styles.contentList}>
                <div className={styles.time}>{time}</div>
                {map(content[1], (ctx, idx) => (
                  <div className={styles.item} key={`conten-${idx}`}>
                    <div className={styles.title}>
                      <span>{ctx.srcId}</span>
                      <span className={styles.time}>{moment(ctx.time).format('LT')}</span>
                    </div>
                    {ctx.content}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      ),
      normal: (
        <div className={styles.desc}>
          {item.content ? (
            <Read
              type={EType.ITEM}
              subjectType={ESubjectType.INFORMATION}
              id={item.id}
              show={showUnRead(item)}
            >
              <div
                data-id={item.id}
                className={classNames(
                  styles.main,
                  styles.normal,
                  !!showUnRead(item) && styles.hiddenBorder
                )}
              >
                <div className={styles.ctn}>{content}</div>
                <ul className="descOpt">
                  {(isReadedEditable || requireReply) && (
                    <ul className="descOpt">
                      {requireReply ? (
                        <li onClick={() => handleReply(item)}>
                          <Icon type="form" />
                        </li>
                      ) : null}
                      <li
                        onClick={() => handleReaded(item)}
                        className={classNames(styles.readed, {
                          [styles.readedEditable]: isReadedEditable,
                        })}
                      >
                        {item.readStatus === 1 ? (
                          <Icon type="minus-square" />
                        ) : (
                          <Icon type="check-square" />
                        )}
                      </li>
                    </ul>
                  )}
                </ul>
              </div>
            </Read>
          ) : null}
        </div>
      ),
    };
    const result = contentMap[contentType] || <></>;
    return result;
  };
  return useRenderContent(item);
}

export default connect(
  (
    { authController, navigatorInformationController, solutionRead, loading }: any,
    { item }: any
  ) => ({
    item,
    authInfoEditable: authController.authInfoEditable,
    informationData: get(navigatorInformationController, 'informationData', {}),
    currentActivity: get(navigatorInformationController, 'currentActivity', {}),
    defaultCategory: get(navigatorInformationController, 'defaultCategory', ''),
    allCategoryList: get(navigatorInformationController, 'allCategoryList', []),
    categoryList: get(navigatorInformationController, 'categoryList', []),
    allCategoryTypeCode: get(navigatorInformationController, 'allCategoryTypeCode', {}),
    sendEmailLoading: loading.effects['navigatorInformationController/sendEmail'],
    readData: solutionRead?.readData || {},
    isAssinee: solutionRead?.isAssinee || false,
  })
)(HistoryListItemContent);
