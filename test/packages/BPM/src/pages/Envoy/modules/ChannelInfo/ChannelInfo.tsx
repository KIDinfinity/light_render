import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import classNames from 'classnames';
import { Form, Input } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { EGlobalAuthCode, ESelfAuthCode, EDataType } from 'bpm/pages/Envoy/enum';
import { notAuthOrDraftReason, notAuthOrActivate } from 'bpm/pages/Envoy/_utils/getDisabled';
import findObj from 'bpm/pages/Envoy/_utils/findObj';
import LabelTip from 'bpm/pages/Envoy/components/LabelTip/LabelTip';
import styles from './ChannelInfo.less';

export default function ChannelInfo({
  editable,
  data,
  type,
  remindersData,
  enableReminder,
  channel,
  channelIdx,
  isExpand,
}: any) {
  const dispatch = useDispatch();
  const { globalEditAuth, errorInfo } = useSelector((state: any) => ({
    globalEditAuth: lodash.get(state.authController, EGlobalAuthCode.EDIT),
    errorInfo: lodash.get(state.envoyController, 'errorInfo'),
  }));

  const { groupId, id, envoyAuth, status } = lodash.pick(data, [
    'groupId',
    'id',
    'envoyAuth',
    'status',
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
  const disabled = !editable || mapDisabled[type];
  const mapIsRequire = {
    sms: ['phoneNo'],
    email: ['emailAddress', 'subject'],
    letter: ['address'],
  };
  const { channel: channelType, enable, content } = channel;
  const isRequire = (ctnKey: string) =>
    editable && !disabled && enable && lodash.includes(mapIsRequire[channelType], ctnKey);

  const onChange = (ev: any, ctnKey: string, infoValue: string) => {
    ev.persist();
    if (type === EDataType.REASON) {
      dispatch({
        type: 'envoyController/saveReasonChannelInfo',
        payload: {
          groupId,
          dataId: id,
          channelIdx,
          ctnKey,
          infoValue,
        },
      });
    } else {
      dispatch({
        type: 'envoyController/saveReminderChannelInfo',
        payload: {
          groupId,
          dataId: id,
          channelIdx,
          ctnKey,
          infoValue,
        },
      });
    }
    dispatch({
      type: 'envoyController/validateFields',
      payload: {
        dataId: groupId,
      },
    });
  };

  const info = lodash.get(content, 'info');

  return useMemo(
    () => (
      <>
        {lodash.map(lodash.keys(info), (ctnKey: any, ctnIdx: number) => {
          const errors = lodash.get(
            findObj(errorInfo, id),
            `channelDataList{${channelIdx}}_content_info_${ctnKey}`
          );
          const value = info[ctnKey]?.replaceAll('{{', '')?.replaceAll('}}', '');
          return (
            <Form.Item
              className={classNames({
                [ctnKey]: ctnKey,
                channelInfoInput: true,
                [styles.channelInfo]: true,
              })}
              label={isExpand && formatMessageApi({ Label_BIZ_Claim: `Label_Envoy_${ctnKey}` })}
            >
              <Input
                name={`channelDataList{${channelIdx}}_content_info_${ctnKey}`}
                prefix={errors?.length ? <LabelTip title={errors} /> : null}
                suffix={isRequire(ctnKey) ? <span className="requireIcon">*</span> : null}
                placeholder={
                  !isExpand && formatMessageApi({ Label_BIZ_Claim: `Label_Envoy_${ctnKey}` })
                }
                disabled={!editable || disabled}
                key={`${ctnIdx}_${ctnKey}`}
                value={value}
                onChange={(ev: any) => onChange(ev, ctnKey, ev.target?.value)}
                onBlur={(ev: any) => onChange(ev, ctnKey, lodash.trim(ev.target?.value))}
              />
            </Form.Item>
          );
        })}
      </>
    ),
    [info, errorInfo, disabled]
  );
}
