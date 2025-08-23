import React from 'react';
import { connect } from 'dva';
import { Row, Col, Switch, Icon } from 'antd';
import moment from 'moment';
import lodash from 'lodash';
import classNames from 'classnames';
import * as FlattenJS from 'flattenjs';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { EGlobalAuthCode, ESelfAuthCode, EReasonStatus } from 'bpm/pages/Envoy/enum';
import findObj from 'bpm/pages/Envoy/_utils/findObj';
import LabelTip from 'bpm/pages/Envoy/components/LabelTip/LabelTip';
import { notAuthOrActiveReason } from 'bpm/pages/Envoy/_utils/getDisabled';
import loadingFn from 'bpm/pages/Envoy/_utils/loadingFn';
import { ReactComponent as RetryIcon } from '@/assets/Retry.svg';
import styles from './currentReasonHeader.less';
import { EDataType } from 'bpm/pages/Envoy/enum';
interface IConnectProps {
  authEnvoy: {
    authEnvoyEditable: boolean;
    authEnvoySendable: boolean;
    authEnvoyVisible: boolean;
    [propName: any]: any;
  };
  errorInfo: any;
}

interface IProps extends IConnectProps {
  currentReason: any;
  reasonIdx: number;
  isOnlyReason: boolean;
  isCurrentList: boolean;
  setActivedKey: Function;
  collapseIdx: number;
  ctnType: EDataType;
  status: string;
  hasExtraFuncFailState: boolean;
  isActivedGroup: boolean;
}

interface IState {
  switchLoading: boolean;
}

@connect(({ authController, envoyController }: any) => ({
  authEnvoy: authController,
  errorInfo: envoyController.errorInfo,
}))
class CurrentReasonHeader extends React.Component<IProps, IState> {
  state = {
    // eslint-disable-next-line react/no-unused-state
    switchLoading: false,
  };

  stopPropagationFn = (ev: any): void => {
    ev.stopPropagation();
  };

  setCtnTypeFn = (ev: any, type: EDataType.REASON | EDataType.REMINDER | EDataType.RETRY): void => {
    const { reasonIdx, setActivedKey } = this.props;
    setActivedKey(reasonIdx, type);
  };

  switchReminder = (_: any, ev: any) => {
    ev.stopPropagation();
    const { dispatch, currentReason } = this.props;
    loadingFn({
      self: this,
      stateKey: 'switchLoading',
      dispatch,
      dispatchObj: {
        type: 'envoyController/switchReminder',
        payload: {
          reason: currentReason,
        },
      },
    });
  };

  getReminderOptUI = () => {
    const { authEnvoy, isCurrentList, currentReason } = this.props;
    const { displayConfig, enableReminder, envoyAuth, status } = currentReason;
    const { switchLoading } = this.state;
    const switchConfig = lodash.get(displayConfig, 'switch');
    if (isCurrentList) {
      if (status === EReasonStatus.DRAFT) {
        return formatMessageApi({ Label_BIZ_Claim: 'app.navigator.drawer.pending.title.reminder' });
      }
      return (
        <Switch
          size="small"
          checkedChildren={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.drawer.pending.form.label.switch-on',
          })}
          unCheckedChildren={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.drawer.pending.form.label.switch-off',
          })}
          checked={enableReminder}
          onChange={this.switchReminder}
          disabled={
            !switchConfig?.editable ||
            notAuthOrActiveReason({
              globalAuth: lodash.get(authEnvoy, EGlobalAuthCode.EDIT),
              selfAuth: lodash.get(envoyAuth, ESelfAuthCode.EDIT),
              status,
            })
          }
          loading={switchLoading}
        />
      );
    }
    return (
      <span>
        {enableReminder
          ? formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.drawer.pending.form.label.switch-on',
            })
          : formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.drawer.pending.form.label.switch-off',
            })}
      </span>
    );
  };

  render() {
    const {
      errorInfo,
      currentReason,
      reasonIdx,
      isOnlyReason,
      collapseIdx,
      ctnType,
      status,
      hasExtraFuncFailState,
      isActivedGroup,
    } = this.props;
    const { id, displayConfig, reasonName, reasonReminders, startTime, endTime } = currentReason;
    const reminderConfig = lodash.get(displayConfig, EDataType.REMINDER);
    const retryConfig = lodash.get(displayConfig, 'retry');
    const isShowRetry = retryConfig?.visible;
    const isShowReminder = reminderConfig?.visible && reasonReminders && reasonReminders?.length;
    const isActived = (type) => reasonIdx === collapseIdx && ctnType === type;
    const flattenErrorInfo = FlattenJS.convert(findObj(errorInfo, id));
    const errors = lodash.uniq(lodash.values(flattenErrorInfo));
    const hasDate = (date: any) => !!date && !lodash.isEmpty(date);


    return (
      <div className={styles.defaultHeader}>
        <div className={styles.currentReasonHeader}>
          {(isShowReminder || !isOnlyReason) && (
            <div
              className={classNames(styles.reasonName, {
                [styles.active]: isActived(EDataType.REASON),
              })}
              onClick={(ev) => this.setCtnTypeFn(ev, EDataType.REASON)}
            >
              {isOnlyReason ? (
                ''
              ) : (
                <>
                  {errors?.length ? <LabelTip title={errors} /> : null}
                  {reasonName}
                </>
              )}
            </div>
          )}
          {status !== 'Draft' && isShowRetry && (
            <div
              className={classNames(styles.retry, {
                [styles.active]: isActived(EDataType.RETRY),
              })}
              onClick={(ev) => this.setCtnTypeFn(ev, EDataType.RETRY)}
            >
              <Icon
                className={classNames({
                  [styles.anticon]: true,
                  [styles.active]: hasExtraFuncFailState,
                })}
                component={RetryIcon}
              />
              {ctnType === EDataType.RETRY && isActivedGroup && (
                <span
                  className={classNames({
                    [styles.retryText]: true,
                  })}
                >
                  RETRY
                </span>
              )}
            </div>
          )}
          {isShowReminder ? (
            <div
              className={classNames(styles.reminderOpt, {
                [styles.active]: isActived(EDataType.REMINDER),
              })}
              onClick={(ev) => this.setCtnTypeFn(ev, EDataType.REMINDER)}
            >
              <Icon className={styles.anticon} type="bell" theme="filled" />
              {this.getReminderOptUI()}
            </div>
          ) : null}
        </div>

        {!isActivedGroup &&(hasDate(startTime) || hasDate(endTime)) ? (
          <div>
            <Row className={styles.dateWrap}>
              <Col className="gutter-row" span={12}>
                {hasDate(startTime) ? (
                  <div className={styles.wrap}>
                    <span className={styles.title}>Sent at</span>
                    <span className={styles.value}>{moment(startTime).format('L')}</span>
                  </div>
                ) : null}
              </Col>
              <Col className="gutter-row" span={12}>
                {hasDate(endTime) ? (
                  <div className={classNames(styles.wrap, styles.twoWrap)}>
                    <span className={styles.title}>Complete at</span>
                    <span className={styles.value}>{moment(endTime).format('L')}</span>
                  </div>
                ) : null}
              </Col>
            </Row>
          </div>
        ) : null}
      </div>
    );
  }
}

export default CurrentReasonHeader;
