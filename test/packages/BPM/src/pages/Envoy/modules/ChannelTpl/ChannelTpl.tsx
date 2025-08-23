import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import { Form } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { EGlobalAuthCode, ESelfAuthCode, EDataType } from 'bpm/pages/Envoy/enum';
import { notAuthOrDraftReason, notAuthOrActivate } from 'bpm/pages/Envoy/_utils/getDisabled';
import findObj from 'bpm/pages/Envoy/_utils/findObj';
import useExpanderController from 'navigator/hooks/useExpanderController';
import LabelTip from 'bpm/pages/Envoy/components/LabelTip/LabelTip';
import TplContent from 'bpm/pages/Envoy/modules/TplContent/TplContent';

export default function channelTpl({
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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isExpanderSwitchOn } = useExpanderController();

  const onChange = lodash.debounce(({ value }: any) => {
    if (type === EDataType.REASON) {
      dispatch({
        type: 'envoyController/saveReasonChannelTpl',
        payload: {
          groupId,
          dataId: id,
          channelIdx,
          value,
        },
      });
    } else {
      dispatch({
        type: 'envoyController/saveReminderChannelTpl',
        payload: {
          groupId,
          dataId: id,
          channelIdx,
          value,
        },
      });
    }
  }, 300);

  const errors = lodash.get(
    findObj(errorInfo, id),
    `channelDataList{${channelIdx}}_content_content`
  );

  const { channel: channelType, content } = channel;
  return useMemo(() => {
    if (!!isExpanderSwitchOn !== !!isExpand) {
      return <></>;
    }
    return (
      <Form.Item
        label={
          <div>
            {errors?.length ? <LabelTip title={errors} /> : null}
            {!isExpand &&
              formatMessageApi({ Label_BIZ_Claim: 'app.navigator.drawer.pending.title.content' })}
          </div>
        }
      >
        <TplContent
          name={`channelDataList{${channelIdx}}_content_content_value`}
          disabled={disabled}
          channelType={channelType}
          content={lodash.get(content, 'content') || {}}
          isAllEditable={lodash.get(content, `isAllEditable`, 1)}
          onChange={onChange}
        />
      </Form.Item>
    );
  }, [errors, disabled, content, isExpanderSwitchOn, isExpand]);
}
