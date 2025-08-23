import React, { useEffect } from 'react';
import lodash from 'lodash';
import { useDispatch, useSelector } from 'dva';
import { Form, Select } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import findObj from 'bpm/pages/Envoy/_utils/findObj';
import LabelTip from 'bpm/pages/Envoy/components/LabelTip/LabelTip';
import { EGlobalAuthCode, ESelfAuthCode, EDataType } from 'bpm/pages/Envoy/enum';
import { notAuthOrDraftReason, notAuthOrActivate } from 'bpm/pages/Envoy/_utils/getDisabled';
import styles from './freeFields.less';

export default function FreeFieldsOfSelect({
  required = false,
  editable,
  custom,
  data,
  type,
  remindersData,
  enableReminder,
  errorInfo,
}: any) {
  const { labelTypeCode, labelDictCode, name, dataPath, dictTypeCode } = custom;
  const { groupId, id, envoyAuth, status } = data;

  const { globalEditAuth } = useSelector((state: any) => ({
    globalEditAuth: lodash.get(state.authController, EGlobalAuthCode.EDIT),
  }));
  const freeFieldErrors = lodash.get(findObj(errorInfo, data?.id), `${name}`);

  const dicts = useSelector(({ dictionaryController }: any) => dictionaryController[dictTypeCode]);
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
  const saveData = (value: string[]) => {
    if (type === EDataType.REASON) {
      dispatch({
        type: 'envoyController/saveFreeFieldsOfSelectReasonData',
        payload: {
          groupId,
          dataId: id,
          dataPath,
          value,
        },
      });
    } else {
      dispatch({
        type: 'envoyController/saveFreeFieldsOfSelectReminderData',
        payload: {
          groupId,
          dataId: id,
          dataPath,
          value,
        },
      });
    }
  };
  useEffect(() => {
    if (lodash.isEmpty(dicts)) {
      dispatch({
        type: 'dictionaryController/findDictionaryByTypeCodes',
        payload: [dictTypeCode],
      });
    }
  }, [dictTypeCode, dicts, dispatch]);
  return (
    <Form.Item
      className={styles.form}
      required={required}
      label={
        <div className={styles.label}>
          {freeFieldErrors?.length ? <LabelTip title={freeFieldErrors} /> : null}
          {formatMessageApi({ [labelTypeCode]: labelDictCode })}
        </div>
      }
    >
      <Select
        allowClear
        showSearch
        onChange={(value: string[]) => saveData(value)}
        value={data[dataPath]}
        disabled={disabled}
        name={name}
      >
        {lodash.map(dicts || [], (item) => (
          <Select.Option value={item.dictCode} key={item.dictCode}>
            {item.dictName}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
}
