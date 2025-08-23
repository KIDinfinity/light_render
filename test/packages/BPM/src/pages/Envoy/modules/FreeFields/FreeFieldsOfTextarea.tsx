import React from 'react';
import lodash from 'lodash';
import { useDispatch, useSelector } from 'dva';
import { Form, Input } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { EGlobalAuthCode, ESelfAuthCode, EDataType } from 'bpm/pages/Envoy/enum';
import { notAuthOrDraftReason, notAuthOrActivate } from 'bpm/pages/Envoy/_utils/getDisabled';
import styles from './freeFields.less';

export default function FreeFieldsOfTextarea({
  required = false,
  editable,
  custom,
  data,
  type,
  remindersData,
  enableReminder,
}: any) {
  const { labelTypeCode, labelDictCode, name, dataPath } = custom;
  const { groupId, id, envoyAuth, status } = data;

  const { globalEditAuth } = useSelector((state: any) => ({
    globalEditAuth: lodash.get(state.authController, EGlobalAuthCode.EDIT),
  }));

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

  const dispatch = useDispatch();
  const saveData = (value: string) => {
    if (type === EDataType.REASON) {
      dispatch({
        type: 'envoyController/saveFreeFieldsOfTextareaReasonData',
        payload: {
          groupId,
          dataId: id,
          dataPath,
          value,
        },
      });
    } else {
      dispatch({
        type: 'envoyController/saveFreeFieldsOfTextareaReminderData',
        payload: {
          groupId,
          dataId: id,
          dataPath,
          value,
        },
      });
    }
  };

  return (
    <Form.Item
      required={required}
      label={formatMessageApi({
        [labelTypeCode]: labelDictCode,
      })}
    >
      <Input.TextArea
        className={styles.textarea}
        name={name}
        disabled={disabled}
        value={data[dataPath]}
        onChange={(ev: any) => saveData(ev.target?.value)}
        onBlur={(ev: any) => saveData(lodash.trim(ev.target?.value))}
      />
    </Form.Item>
  );
}
