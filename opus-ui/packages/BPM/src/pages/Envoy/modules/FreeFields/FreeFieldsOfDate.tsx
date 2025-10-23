import React, { useEffect } from 'react';
import lodash from 'lodash';
import { useDispatch, useSelector } from 'dva';
import { Form, DatePicker } from 'antd';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { EGlobalAuthCode, ESelfAuthCode, EDataType } from 'bpm/pages/Envoy/enum';
import { notAuthOrDraftReason, notAuthOrActivate } from 'bpm/pages/Envoy/_utils/getDisabled';
import styles from './freeFields.less';

export default function FreeFieldsOfDate({
  required = false,
  editable,
  custom,
  data,
  type,
  remindersData,
  enableReminder,
}: any) {
  const { labelTypeCode, labelDictCode, name, dataPath, dateFormat, disabledDate } = custom;
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

  // none | gt | ge | lt | le, 根据需要扩展
  const mapDisabledDate = {
    none: null,
    ge: (date: any) => moment(date).isBefore(moment(new Date()), 'days'),
    le: (date: any) => moment(date).isAfter(moment(new Date()), 'days'),
  };

  const dispatch = useDispatch();
  const saveDate = (formatDate: any) => {
    if (type === EDataType.REASON) {
      dispatch({
        type: 'envoyController/saveFreeFieldsOfDateReasonData',
        payload: {
          groupId,
          dataId: id,
          dataPath,
          value: formatDate,
        },
      });
    } else {
      dispatch({
        type: 'envoyController/saveFreeFieldsOfDateReminderData',
        payload: {
          groupId,
          dataId: id,
          dataPath,
          value: formatDate,
        },
      });
    }
  };

  useEffect(() => {
    if (!data[dataPath]) {
      saveDate(moment(new Date()));
    }
  }, []);

  const saveData = (date: any) => {
    const formatDate = date.format();
    saveDate(formatDate);
  };

  return (
    <Form.Item
      required={required}
      label={formatMessageApi({
        [labelTypeCode]: labelDictCode,
      })}
    >
      <DatePicker
        allowClear={false}
        className={styles.textarea}
        name={name}
        disabled={disabled}
        disabledDate={mapDisabledDate[disabledDate]}
        format={dateFormat}
        value={data[dataPath] ? moment(data[dataPath]) : moment(new Date())}
        onChange={saveData}
      />
    </Form.Item>
  );
}
