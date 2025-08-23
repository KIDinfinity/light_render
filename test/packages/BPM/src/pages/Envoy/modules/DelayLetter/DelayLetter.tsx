import React from 'react';
import lodash from 'lodash';
import { useDispatch, useSelector } from 'dva';
import { Form, Checkbox } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { EGlobalAuthCode, ESelfAuthCode } from 'bpm/pages/Envoy/enum';
import { notAuthOrDraftReason } from 'bpm/pages/Envoy/_utils/getDisabled';

export default function DelayLetter({ editable, data }: any) {
  const { groupId, id, envoyAuth, status, delayLetter } = data;

  const { globalEditAuth } = useSelector((state: any) => ({
    globalEditAuth: lodash.get(state.authController, EGlobalAuthCode.EDIT),
  }));

  const dispatch = useDispatch();
  const saveReasonDelayLetter = (ev: any) => {
    dispatch({
      type: 'envoyController/saveReasonDelayLetter',
      payload: {
        groupId,
        dataId: id,
        value: ev.target.checked,
      },
    });
  };

  return (
    <Form.Item
      label={formatMessageApi({
        Label_BIZ_Claim: 'venus_claim.label.generateDelayLetter',
      })}
    >
      <Checkbox
        name="delayLetter"
        disabled={
          !editable ||
          notAuthOrDraftReason({
            globalAuth: globalEditAuth,
            selfAuth: lodash.get(envoyAuth, ESelfAuthCode.EDIT),
            status,
          })
        }
        checked={delayLetter}
        onChange={saveReasonDelayLetter}
      />
    </Form.Item>
  );
}
