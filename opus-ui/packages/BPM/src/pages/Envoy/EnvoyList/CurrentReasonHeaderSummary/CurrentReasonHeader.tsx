import React from 'react';
import { connect } from 'dva';
import { Switch, Icon } from 'antd';
import lodash from 'lodash';
import classNames from 'classnames';
import * as FlattenJS from 'flattenjs';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { EGlobalAuthCode, ESelfAuthCode, EReasonStatus } from 'bpm/pages/Envoy/enum';
import findObj from 'bpm/pages/Envoy/_utils/findObj';
import LabelTip from 'bpm/pages/Envoy/components/LabelTip/LabelTip';
import { notAuthOrActiveReason } from 'bpm/pages/Envoy/_utils/getDisabled';
import loadingFn from 'bpm/pages/Envoy/_utils/loadingFn';
import styles from './currentReasonHeader.less';

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
  ctnType: string;
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

  setCtnTypeFn = (ev: any, type: 'reason' | 'reminder'): void => {
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
    const { errorInfo, currentReason, reasonIdx, isOnlyReason, collapseIdx, ctnType } = this.props;
    const { id, displayConfig, reasonName, reasonReminders } = currentReason;
    const reminderConfig = lodash.get(displayConfig, 'reminder');
    const isShowReminder = reminderConfig?.visible && reasonReminders && reasonReminders?.length;
    const isActived = (type) => reasonIdx === collapseIdx && ctnType === type;
    const flattenErrorInfo = FlattenJS.convert(findObj(errorInfo, id));
    const errors = lodash.uniq(lodash.values(flattenErrorInfo));
    return (
      <div className={styles.currentReasonHeader}>
        {(isShowReminder || !isOnlyReason) && (
          <div
            className={classNames(styles.reasonName, {
              [styles.active]: isActived('reason'),
            })}
            onClick={(ev) => this.setCtnTypeFn(ev, 'reason')}
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
        {isShowReminder ? (
          <div
            className={classNames(styles.reminderOpt, {
              [styles.active]: isActived('reminder'),
            })}
            onClick={(ev) => this.setCtnTypeFn(ev, 'reminder')}
          >
            <Icon className={styles.anticon} type="bell" theme="filled" />
            {this.getReminderOptUI()}
          </div>
        ) : null}
      </div>
    );
  }
}

export default CurrentReasonHeader;
