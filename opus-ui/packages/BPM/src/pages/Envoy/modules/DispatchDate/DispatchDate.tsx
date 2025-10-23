import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import moment from 'moment';
import { Form, DatePicker } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { EGlobalAuthCode, ESelfAuthCode, EDataType } from 'bpm/pages/Envoy/enum';
import { notAuthOrDraftReason, notAuthOrActivate } from 'bpm/pages/Envoy/_utils/getDisabled';

export default function DispatchDate({ editable, data, type, remindersData, enableReminder }: any) {
  const dispatch = useDispatch();
  const { globalEditAuth } = useSelector((state: any) => ({
    globalEditAuth: lodash.get(state.authController, EGlobalAuthCode.EDIT),
  }));

  const { groupId, id, envoyAuth, dispatchDate } = lodash.pick(data, [
    'groupId',
    'id',
    'envoyAuth',
    'dispatchDate',
  ]);
  const mapDisabled = {
    reason: notAuthOrDraftReason({
      globalAuth: globalEditAuth,
      selfAuth: lodash.get(envoyAuth, ESelfAuthCode.EDIT),
      status: lodash.get(data, 'status'),
    }),
    reminder: notAuthOrActivate({
      globalAuth: globalEditAuth,
      selfAuth: lodash.get(envoyAuth, ESelfAuthCode.EDIT),
      remindersData,
      enableReminder,
      reminderData: data,
    }),
  };

  const onChange = async (date: any) => {
    const dispatchDate = date.format();
    if (type === EDataType.REASON) {
      await dispatch({
        type: 'envoyController/saveReasonDispatchDate',
        payload: {
          groupId,
          dataId: id,
          dispatchDate,
        },
      });
    } else {
      await dispatch({
        type: 'envoyController/saveReminderDispatchDate',
        payload: {
          groupId,
          dataId: id,
          dispatchDate,
        },
      });
    }
  };

  const disabled = !editable || mapDisabled[type];
  return useMemo(
    () => (
      <Form.Item label={formatMessageApi({ Label_BIZ_Claim: 'venus_pending.label.date' })}>
        <DatePicker
          allowClear={false}
          disabled={disabled}
          disabledDate={(date) => moment(date).isBefore(moment(new Date()), 'days')}
          value={moment(dispatchDate)}
          format="L"
          onChange={onChange}
        />
      </Form.Item>
    ),
    [disabled, dispatchDate]
  );
}
