import React, { useCallback } from 'react';
import lodash from 'lodash';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { Form, Input } from 'antd';
import { EGlobalAuthCode, ESelfAuthCode } from 'bpm/pages/Envoy/enum';
import { notAuthOrDraftReason } from 'bpm/pages/Envoy/_utils/getDisabled';

export default function Remark({ editable, data }: any) {
  const { groupId, id, envoyAuth, status, remark } = data;

  const globalEditAuth = useSelector(
    (state: any) => lodash.get(state.authController, EGlobalAuthCode.EDIT),
    shallowEqual
  );
  const dispatch = useDispatch();
  const saveReasonRemark = useCallback((value: string) => {
    dispatch({
      type: 'envoyController/saveReasonRemark',
      payload: {
        groupId,
        dataId: id,
        value,
      },
    });
  }, []);
  return (
    <Form.Item label="Remark">
      <Input
        name="remark"
        disabled={
          !editable ||
          notAuthOrDraftReason({
            globalAuth: globalEditAuth,
            selfAuth: lodash.get(envoyAuth, ESelfAuthCode.EDIT),
            status,
          })
        }
        value={remark}
        onChange={(ev: any) => saveReasonRemark(ev.target?.value)}
        onBlur={(ev: any) => saveReasonRemark(lodash.trim(ev.target?.value))}
      />
    </Form.Item>
  );
}
