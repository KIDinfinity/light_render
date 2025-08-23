/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import moment from 'moment';
import classnames from 'classnames';
import Ellipsis from '@/components/Ellipsis';
import HotHighLight from '@/components/Hotkey/home/view/HotHighLight';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { HotkeyHomeIds } from '@/components/Hotkey/common/enum/hotkeyIds';
import { useSelector, useDispatch } from 'umi';
import lodash from 'lodash';
import CaseTaskDetail from 'navigator/components/CaseTaskDetail';
import { ReactComponent as InsuredIcon } from 'navigator/assets/insured.svg';
import { ReactComponent as ClaimTypeIcon } from 'navigator/assets/claim-type.svg';
import { ReactComponent as PolicyIcon } from 'navigator/assets/policy.svg';
import RemainingTime from './RemainingTime';
import { ItemBackground } from './ItemBackground';
import Flag from './Flag';
import styles from './Item.less';

const Item = ({
  swiperRef,
  item,
  list,
  onClickMounce,
  index,
  size,
  getTaskDetail,
  setTaskId,
}: any) => {
  const caskIndex = useSelector((state: any) => state.task.caskIndex);
  const taskId = useSelector((state: any) => state.advancedQueryController.taskId);
  const { HomeWatchingCardModule, HomeWatchingCard } = HotkeyHomeIds;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!lodash.isEmpty(taskId)) {
      setTaskId(taskId);
    }
  }, [taskId]);

  const onClick = () => {
    const swiper = swiperRef?.current?.swiper;

    setTimeout(() => {
      if (swiper && !swiper?.destroyed) {
        swiper?.slideTo(index);
        if (lodash.isArray(list) && list.length === index + 2) {
          onClickMounce();
        }
      }
    }, 0);

    dispatch({
      type: 'task/saveCaskIndex',
      payload: {
        caskIndex: index,
      },
    });
    if (caskIndex !== index) {
      getTaskDetail({
        taskId: item.taskId,
        processInstanceId: item.caseNo || item.procInstId || item.processInstanceId,
      });
      return false;
    }
    dispatch({
      type: 'global/visitTaskDetail',
      payload: item,
    });

    return false;
  };
  const claimTypes = lodash
    .chain(item.businessType)
    .split(',')
    .filter((item) => !!item)
    .map((type) => lodash.trim(type))
    .value();
  const policys = lodash
    .chain(item.policyNo)
    .split(',')
    .map((policy) => lodash.trim(policy))
    .filter((item) => !!item)
    .value();
  return (
    <div key={item.procInstId} onClick={onClick} className={styles['item-wrap']}>
      <div
        className={classnames(
          `${size === 'small' ? styles['item-small'] : styles.item}
          ${styles[ItemBackground[item.caseCategory]] || ''}`,
          {
            notActive: caskIndex !== index,
          }
        )}
      >
        <div
          className={classnames(styles.content, {
            [styles.isUrgent]: item.isUrgent,
          })}
          id="taskCardContent"
        >
          <HotHighLight
            childrenClass={styles.activeFocus}
            condition={[HomeWatchingCardModule, HomeWatchingCard, caskIndex === index]}
          >
            <div className={styles.left}>
              <div className={styles.leftTop}>
                <div className={styles.claimNo}>
                  <div className={styles.claimNoText}>
                    <Ellipsis length={14} tooltip>
                      {item.inquiryBusinessNo || '-'}
                    </Ellipsis>
                  </div>
                </div>
                {item.submissionChannel ? (
                  <div className={styles.submissionChannel}>
                    <div className={styles.submissionChannelText}>
                      <span>
                        {formatMessageApi({
                          Dropdown_COM_SubmissionChannel: item.submissionChannel,
                        }) || '-'}
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>
              <div
                className={classnames(styles.leftBottom, {
                  [styles.hidden]: !(claimTypes.length || item.insured || policys.length),
                })}
              >
                {!lodash.isEmpty(claimTypes.filter((type) => type)) && (
                  <div className={classnames(styles.messageBox, styles.businessType)}>
                    <ClaimTypeIcon className={styles.icon} />
                    <span
                      className={classnames(styles.message, {
                        [styles.overlength]: claimTypes.length > 3,
                      })}
                    >
                      {lodash
                        .chain(claimTypes)
                        .filter((item, index) => index < 3)
                        .map((type, index) => {
                          return (
                            // eslint-disable-next-line react/no-array-index-key
                            <span className={styles.type} key={`${type}${index}`}>
                              {formatMessageApi({
                                Dropdown_COM_BusinessType: type,
                              })}
                            </span>
                          );
                        })
                        .value()}
                    </span>
                  </div>
                )}
                {item.insured && (
                  <div className={classnames(styles.messageBox, styles.insured)}>
                    <InsuredIcon className={styles.icon} />
                    <span className={styles.message}>
                      <Ellipsis length={12} tooltip>
                        {item.insured}
                      </Ellipsis>
                    </span>
                  </div>
                )}
                {!lodash.isEmpty(policys.filter((policy) => policy)) && (
                  <div className={classnames(styles.messageBox, styles.policy)}>
                    <PolicyIcon className={styles.icon} />
                    <span
                      className={classnames(styles.message, {
                        [styles.overlength]: policys.length > 3,
                      })}
                    >
                      {lodash
                        .chain(policys)
                        .filter((item, index) => index < 3)
                        .map((policy) => {
                          return (
                            <span className={styles.policyItem} key={policy}>
                              {policy}
                            </span>
                          );
                        })
                        .value()}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.rightTop}>
                <div className={styles.batchNo}>
                  {item.batchNo && (
                    <>
                      <div className={styles.batchName}>
                        {formatMessageApi({
                          Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.batch-no',
                        })}
                      </div>
                      <div className={styles.batchNumber}>
                        <Ellipsis length={10}>{item.batchNo || '-'}</Ellipsis>
                      </div>
                    </>
                  )}
                </div>
                <div className={styles.activityName}>
                  <Ellipsis length={20} className={styles.activityNameWrap}>
                    {formatMessageApi({
                      activity: item.activityKey,
                      caseCategory: item.caseCategory,
                    })}
                  </Ellipsis>
                </div>
                <div className={styles.caseCategory}>
                  {formatMessageApi({ Label_BPM_CaseCategory: item.caseCategory })}
                </div>
                <RemainingTime
                  casePercentage={item.caseSla}
                  taskPercentage={item.taskSla}
                  caseRemainingTime={item.caseRemainingTime}
                  taskRemainingTime={item.taskRemainingTime}
                  isUrgent={item.isUrgent}
                  // isSmallScreen={isSmallScreen}
                />
              </div>
              <div className={styles.dateMessage}>
                <div className={styles.taskDueDate}>
                  {formatMessageApi({
                    Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.case-due-date',
                  })}

                  <div className={styles.taskDueDateContent}>
                    {item.caseDueDate ? moment(item.caseDueDate).format('L LT') : '-'}
                  </div>
                </div>
                <div className={styles.taskDueDate}>
                  {formatMessageApi({
                    Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.task-due-date',
                  })}
                  <div className={styles.taskDueDateContent}>
                    {item.taskDueDate ? moment(item.taskDueDate).format('L LT') : '-'}
                  </div>
                </div>
              </div>
            </div>
          </HotHighLight>
        </div>
        <div
          className={classnames(styles.caseNo, {
            [styles.isUrgent]: item.isUrgent,
          })}
        >
          <div className={styles.caseNoContent} id="taskCardCaseNoContent">
            {formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-no',
            })}
            <div className={styles.caseNumber}>{item.procInstId}</div>
          </div>
          <Flag item={item} />
        </div>
      </div>
    </div>
  );
};

const ItemWrap = (props: any) => (
  <CaseTaskDetail.Consumer {...props}>
    <Item />
  </CaseTaskDetail.Consumer>
);

export default React.memo(ItemWrap, (preProps, nextProps) => {
  const keys = ['swiper', 'item', 'index', 'size'];
  return lodash.isEqual(lodash.pick(preProps, keys), lodash.pick(nextProps, keys));
});
