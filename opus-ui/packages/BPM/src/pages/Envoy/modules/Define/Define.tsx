import React from 'react';
import lodash from 'lodash';
import { useDispatch, useSelector } from 'dva';
import { Form, Input } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { EGlobalAuthCode, ESelfAuthCode } from 'bpm/pages/Envoy/enum';
import { notAuthOrDraftReason } from 'bpm/pages/Envoy/_utils/getDisabled';

export default function Define({ editable, data }: any) {
  const { groupId, id, envoyAuth, status, define } = data;

  const { globalEditAuth } = useSelector((state: any) => ({
    globalEditAuth: lodash.get(state.authController, EGlobalAuthCode.EDIT),
  }));

  const dispatch = useDispatch();
  const saveReasonDefine = (value: string) => {
    dispatch({
      type: 'envoyController/saveReasonDefine',
      payload: {
        groupId,
        dataId: id,
        value,
      },
    });
  };

  return (
    <Form.Item
      label={formatMessageApi({
        Label_BIZ_Claim: 'venus_claim.label.defineReason',
      })}
    >
      <Input
        name="define"
        disabled={
          !editable ||
          notAuthOrDraftReason({
            globalAuth: globalEditAuth,
            selfAuth: lodash.get(envoyAuth, ESelfAuthCode.EDIT),
            status,
          })
        }
        value={define}
        maxLength={1024}
        onChange={(ev: any) => saveReasonDefine(ev.target.value)}
        onBlur={(ev: any) => saveReasonDefine(lodash.trim(ev.target.value))}
      />
    </Form.Item>
  );
}
