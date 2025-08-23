import React, { useEffect, useCallback } from 'react';
import lodash from 'lodash';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { Form, Select } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { tenant, Region } from '@/components/Tenant';
import { EGlobalAuthCode, ESelfAuthCode, EDataType } from 'bpm/pages/Envoy/enum';
import { notAuthOrDraftReason, notAuthOrActivate } from 'bpm/pages/Envoy/_utils/getDisabled';
import useGetPolicyNo from 'bpm/pages/Envoy/hooks/useGetPolicyNo';

export default function PolicyNo({ editable, data, type, remindersData, enableReminder }: any) {
  const { claimNo, groupId, id, envoyAuth, status, policyNo } = data;
  const dispatch = useDispatch();
  const policyNata = useGetPolicyNo({ claimNo, policyNo });
  const globalEditAuth = useSelector(
    (state: any) => lodash.get(state.authController, EGlobalAuthCode.EDIT),
    shallowEqual
  );
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
  const saveData = useCallback(
    (value: string) => {
      if (type === EDataType.REASON) {
        dispatch({
          type: 'envoyController/saveReasonPolicyNo',
          payload: {
            groupId,
            dataId: id,
            value,
          },
        });
      } else {
        dispatch({
          type: 'envoyController/saveReminderPolicyNo',
          payload: {
            groupId,
            dataId: id,
            value,
          },
        });
      }
    },
    [groupId, id, type]
  );

  useEffect(() => {
    if (lodash.isEmpty(policyNo) && tenant.remoteRegion() === Region.HK) {
      saveData(policyNata?.policyNo);
    }
  }, [policyNo, policyNata?.policyNo, saveData]);

  return (
    <Form.Item
      label={formatMessageApi({
        Label_COM_Envoy: 'policyNo',
      })}
    >
      <Select name="policyNo" disabled={disabled} value={policyNo} onChange={saveData}>
        {lodash.map(policyNata?.policyNoInfo || [], (item) => (
          <Select.Option value={item?.dictCode} key={item?.dictCode}>
            {item?.dictName}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
}
