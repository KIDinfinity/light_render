import React, { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { Select, AutoComplete } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { notAuthOrDraftReason, notAuthOrActivate } from 'bpm/pages/Envoy/_utils/getDisabled';
import { EGlobalAuthCode, ESelfAuthCode } from 'bpm/pages/Envoy/enum';
import findObj from 'bpm/pages/Envoy/_utils/findObj';
import LabelTip from 'bpm/pages/Envoy/components/LabelTip/LabelTip';
import useHandleChangeFullNameCallback from 'bpm/pages/Envoy/hooks/useHandleChangeFullNameCallback';
import useHandleChangeRoleCallback from 'bpm/pages/Envoy/hooks/useHandleChangeRoleCallback';
import styles from './envoyTo.less';
import classnames from 'classnames';

const EnvoyTo = ({
  editable,
  data,
  type,
  remindersData,
  enableReminder,
  groupCode,
  isExpand,
}: any) => {
  const { globalEditAuth, destRoleInfo, errorInfo } = useSelector((state: any) => ({
    globalEditAuth: lodash.get(state.authController, EGlobalAuthCode.EDIT),
    ...lodash.pick(state.envoyController, ['destRoleInfo', 'errorInfo']),
  }));

  const { id, claimNo, envoyAuth, status, destRole, destRoleOpt, dest } = lodash.pick(data, [
    'id',
    'claimNo',
    'envoyAuth',
    'status',
    'destRole',
    'destRoleOpt',
    'dest',
  ]);

  const mapDisabled = {
    reason: notAuthOrDraftReason({
      globalAuth: globalEditAuth,
      selfAuth: lodash.get(envoyAuth, ESelfAuthCode.EDIT),
      status,
    }),
    reminder: notAuthOrActivate({
      globalAuth: globalEditAuth,
      selfAuth: lodash.get(envoyAuth, ESelfAuthCode.EDIT),
      remindersData,
      enableReminder,
      reminderData: data,
    }),
  };
  const destRoleInfoList = lodash.map(
    lodash.get(destRoleInfo, `${claimNo}_${destRole}`),
    (item: any) => item.fullName
  );

  const handleChangeRole = useHandleChangeRoleCallback({ data, type });
  const handleChangeFullName = useHandleChangeFullNameCallback({
    type,
    data,
    groupCode,
  });

  const onBulrHandleChangeFullName = useHandleChangeFullNameCallback({
    type,
    data,
    groupCode,
    onBlur: true,
  });

  const errors = lodash.get(findObj(errorInfo, id), 'dest');
  const disabled = !editable || mapDisabled[type];

  return useMemo(
    () => (
      <div className={classnames({ [styles.envoyTo]: true, [styles.expandEnvoyTo]: isExpand })}>
        <div>
          {errors?.length ? <LabelTip title={errors} /> : null}
          {formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.drawer.pending.title.pending-to',
          })}
        </div>
        <div className={classnames({ [styles.form]: true, [styles.expandForm]: isExpand })}>
          <Select
            className={styles.role}
            showSearch
            value={destRole}
            disabled={disabled}
            onChange={handleChangeRole}
          >
            {lodash.map(destRoleOpt, (item) => (
              <Select.Option value={item} key={item}>
                {formatMessageApi({
                  Label_BIZ_Claim: `app.navigator.drawer.pending.form.label.${item}`,
                })}
              </Select.Option>
            ))}
          </Select>
          <AutoComplete
            className="dest"
            disabled={disabled}
            mode="multiple"
            dataSource={destRoleInfoList}
            value={dest}
            onChange={handleChangeFullName}
            onBlur={onBulrHandleChangeFullName}
          />
        </div>
      </div>
    ),
    [errors, destRole, disabled, destRoleOpt, destRoleInfo, dest]
  );
};

export default EnvoyTo;
