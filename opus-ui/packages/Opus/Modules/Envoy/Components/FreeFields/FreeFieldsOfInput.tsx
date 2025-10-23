import React from 'react';
import lodash from 'lodash';
import { useDispatch, useSelector } from 'dva';
import { Col, Input, Row } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import findObj from 'bpm/pages/Envoy/_utils/findObj';
import { EGlobalAuthCode, ESelfAuthCode, EDataType } from 'bpm/pages/Envoy/enum';
import LabelTip from 'bpm/pages/Envoy/components/LabelTip/LabelTip';
import { notAuthOrDraftReason, notAuthOrActivate } from 'bpm/pages/Envoy/_utils/getDisabled';
import EnvoyInput from '../EnvoyInput';
import ValueComponent from '../ValueComponent';
import Status from '../Status';

export function FreeFieldsOfInputShow({ custom, data, btns }) {
  return (
    <Row style={{ marginTop: '10px' }}>
      <Col span={19}>
        <ValueComponent
          isDiv
          value={formatMessageApi({ [custom.labelTypeCode]: custom.labelDictCode })}
        />
        <ValueComponent isValue value={data[custom.dataPath] || '-'} />
      </Col>
      {btns ? (
        <Col span={5} style={{ textAlign: 'right', paddingRight: '16px' }}>
          {btns}
        </Col>
      ) : (
        <>
          <Col span={3}>
            <ValueComponent
              value={formatMessageApi({ Label_BIZ_Claim: 'venus_claim.label.status' })}
            />
            <Status status={data.status} />
          </Col>
          {/* <Col span={3}>
            <ValueComponent value={formatMessageApi({ Label_BIZ_Claim: 'Receive Date' })} />
            <ValueComponent
              isValue
              value={!!data.statusChangeTime && moment(data.statusChangeTime)?.format('L')}
            />
          </Col> */}
        </>
      )}
    </Row>
  );
}

export default function FreeFieldsOfInput({
  required = false,
  editable,
  custom,
  data,
  type,
  remindersData,
  enableReminder,
  errorInfo,
  className,
}: any) {
  const { labelTypeCode, labelDictCode, name, dataPath } = custom;
  const { groupId, id, envoyAuth, status } = data;
  const { globalEditAuth } = useSelector((state: any) => ({
    globalEditAuth: lodash.get(state.authController, EGlobalAuthCode.EDIT),
  }));

  const freeFieldErrors = lodash.get(findObj(errorInfo, data?.id), `${name}`);

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
        type: 'envoyController/saveFreeFieldsOfInputReasonData',
        payload: {
          groupId,
          dataId: id,
          dataPath,
          value,
        },
      });
    } else {
      dispatch({
        type: 'envoyController/saveFreeFieldsOfInputReminderData',
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
    <EnvoyInput
      title={
        <>
          {freeFieldErrors?.length && <LabelTip title={freeFieldErrors} />}
          {formatMessageApi({ [labelTypeCode]: labelDictCode })}
        </>
      }
      className={className}
    >
      <Input
        required={required}
        name={name}
        disabled={disabled}
        value={lodash.get(data, dataPath)}
        onChange={(ev: any) => saveData(ev.target?.value)}
        onBlur={(ev: any) => saveData(lodash.trim(ev.target?.value))}
      />
    </EnvoyInput>
  );
}
