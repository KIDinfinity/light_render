import React from 'react';
import lodash from 'lodash';
import { Row, Col, Input, Button, Icon, DatePicker } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import classNames from 'classnames';
import moment from 'moment';
import { useSelector, useDispatch } from 'dva';
import { OptionNode } from '../Enum';
import { NAMESPACE } from '../activity.config';
import styles from './index.less';

interface Iprops {
  stepActive: string;
  setStepActive: any;
  confirmArray: string[];
  setConfirmArray: Function;
  saveSnapshot: any;
}

export default ({
  stepActive,
  setStepActive,
  confirmArray,
  setConfirmArray,
  saveSnapshot,
}: Iprops) => {
  const dispatch = useDispatch();

  const { downTime, advancedWarningSeconds } =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.downInfo) || {};
  const handleConfirm = async (title: string, index: number) => {
    if (title !== OptionNode.ScanOnlineUser) {
      await dispatch({
        type: `${NAMESPACE}/setNotice`,
        payload: {
          title,
        },
      });
    }
    let nextTitle = getConfigList()[index + 1].title;
    // eslint-disable-next-line
    let saveConfirmArray = !lodash.includes(confirmArray, title)
      ? title === OptionNode.ForceKickOut
        ? [...confirmArray, title, OptionNode.ScanOnlineCase]
        : [...confirmArray, title]
      : confirmArray;

    if (title === OptionNode.SendNoticeToOnlineUse) {
      const format = 'HH:mm:ss MM/D/YYYY';
      const startTime = moment(downTime, format);
      const endTime = moment(new Date(), format);
      if (moment(endTime).diff(moment(startTime), 'seconds') > 0) {
        nextTitle = OptionNode.StopCreateCaseService;
        saveConfirmArray = [
          OptionNode.ScanOnlineUser,
          OptionNode.SendNoticeToOnlineUse,
          OptionNode.ForceKickOut,
          OptionNode.ScanOnlineCase,
        ];
      } else {
        saveConfirmArray = [OptionNode.ScanOnlineUser, OptionNode.SendNoticeToOnlineUse];
      }
    }

    setStepActive(nextTitle);
    setConfirmArray(saveConfirmArray);
    saveSnapshot({ stepActive: nextTitle, confirmArray: saveConfirmArray });
  };

  const getConfigList = () => {
    return [
      {
        title: OptionNode.ScanOnlineUser,
        showRefresh: stepActive === OptionNode.ScanOnlineUser,
        showConfirn:
          lodash.isEmpty(stepActive) && !lodash.includes(confirmArray, OptionNode.ScanOnlineUser),
        refreshList: () => {
          dispatch({
            type: `${NAMESPACE}/getLoginUsers`,
          });
        },
      },
      {
        title: OptionNode.SendNoticeToOnlineUse,
        showConfirn:
          lodash.includes(confirmArray, OptionNode.ScanOnlineUser) &&
          stepActive === OptionNode.SendNoticeToOnlineUse,
        disabled:
          (stepActive === OptionNode.SendNoticeToOnlineUse && downTime === 0) ||
          advancedWarningSeconds === 0,
      },
      {
        title: OptionNode.ForceKickOut,
        showConfirn:
          lodash.includes(confirmArray, OptionNode.SendNoticeToOnlineUse) &&
          stepActive === OptionNode.ForceKickOut,
      },
      {
        title: OptionNode.ScanOnlineCase,
        showRefresh: stepActive === OptionNode.ScanOnlineCase,
        showConfirn: false,
        refreshList: () => {
          dispatch({
            type: `${NAMESPACE}/getActiveCaseList`,
          });
        },
      },
      {
        title: OptionNode.StopCreateCaseService,
        showConfirn:
          lodash.includes(confirmArray, OptionNode.ForceKickOut) &&
          stepActive === OptionNode.StopCreateCaseService,
      },
    ];
  };

  return (
    <div className={styles.steps}>
      {getConfigList().map((item: any, index: number) => {
        return (
          <div className={styles.item} key={item.title}>
            <p
              className={styles.top}
              onClick={() => {
                setStepActive(item.title);
              }}
            >
              {stepActive === item.title && <span className={styles.arrow} />}
              {item.title !== OptionNode.StopCreateCaseService && (
                <div
                  className={classNames(
                    styles.dash,
                    lodash.includes(confirmArray, item.title) && styles.isCompleted
                  )}
                />
              )}

              <span
                className={classNames(
                  styles.iconWrap,
                  // stepActive === item.title && styles.stepActive,
                  lodash.includes(confirmArray, item.title) && styles.isCompleted
                )}
              >
                {item.isCompleted ? (
                  <span className={styles.icon}>
                    <Icon type="check" />
                  </span>
                ) : (
                  <span className={styles.index}> {Number(index) + 1}</span>
                )}
              </span>
            </p>
            <p key={item.title} className={styles.stepsTitle}>
              {item.title}
            </p>

            {item.title === OptionNode.SendNoticeToOnlineUse &&
              stepActive === OptionNode.SendNoticeToOnlineUse && (
                <>
                  <Row className={styles.timePicker}>
                    <Col span={8}> Kick Out Time:</Col>
                    <Col span={16}>
                      <DatePicker
                        defaultValue={downTime === 0 ? moment(new Date()) : moment(downTime)}
                        showTime={{ format: 'HH:mm:ss' }}
                        format="YYYY-MM-DD HH:mm:ss"
                        onChange={(e: any) => {
                          dispatch({
                            type: `${NAMESPACE}/saveDownInfo`,
                            payload: {
                              downTime: e,
                              submitDownTime: e ? moment(e).unix() * 1000 : 0,
                            },
                          });
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className={styles.timePicker}>
                    <Col span={8}> Count Down Time:</Col>
                    <Col span={16}>
                      <Input
                        value={advancedWarningSeconds !== 0 ? advancedWarningSeconds : ''}
                        onChange={(e: any) => {
                          dispatch({
                            type: `${NAMESPACE}/saveDownInfo`,
                            payload: {
                              advancedWarningSeconds: e.target.value || 0,
                            },
                          });
                        }}
                        suffix="Minute"
                      />
                    </Col>
                  </Row>
                </>
              )}

            {item.showConfirn && (
              <Button
                type="primary"
                disabled={item.disabled || false}
                onClick={() => {
                  handleConfirm(item.title, index);
                }}
              >
                {formatMessageApi({
                  Label_BIZ_Claim: 'Confirm',
                })}
              </Button>
            )}
            {item.showRefresh && (
              <Button
                type="primary"
                onClick={() => {
                  lodash.isFunction(item.refreshList) && item.refreshList();
                }}
              >
                {formatMessageApi({
                  Label_BIZ_Claim: 'Refresh',
                })}
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
};
